import { APIRequestContext } from "@playwright/test";

let accessToken: any = null;
let feedbackList: any;

const data: any = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
};

class APIhelper {
  constructor(private request: APIRequestContext) {
    this.request = request;
  }
  async createAccessToken() {
    if (accessToken === null) {
      await this.request
        .post(`https://stage.rentzila.com.ua/api/auth/jwt/create/`, {
          data: {
            email: data.email,
            password: data.password,
          },
        })
        .then(async (response) => {
          const responseBody = await response.json();
          accessToken = responseBody.access;
        });
    }
    return accessToken;
  }

  async getFeedbackList() {
    const userAccessToken = await this.createAccessToken();
    await this.request
      .get(`https://stage.rentzila.com.ua/api/backcall/`, {
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
        },
      })
      .then(async (response) => {
        feedbackList = await response.json();
      });
    return feedbackList;
  }

  async checkResponseResults(name: string, phone: string): Promise<boolean> {
    const response = await this.getFeedbackList();
    for (const feedback of response) {
      if (feedback.name === name && feedback.phone === phone) {
        return true;
      }
    }
    return false;
  }

  async getFeedbackId(name: string, phone: string): Promise<number | null> {
    const response = await this.getFeedbackList();
    let id: number | null = null;
    for (const feedback of response) {
      if (feedback.name === name && feedback.phone === phone) {
        id = feedback.id;
        // console.log(feedback.name + ", " + feedback.created_date)
        return id;
      }
    }
    return id;
  }

  async deleteFeedback(name: string, phone: string) {
    const id = await this.getFeedbackId(name, phone);
    const userAccessToken = await this.createAccessToken();
    await this.request.delete(
      `https://stage.rentzila.com.ua/api/backcall/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
        },
      }
    );
  }
}

export default APIhelper;
