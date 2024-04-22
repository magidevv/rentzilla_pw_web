import { APIRequestContext } from "@playwright/test";

class FeedbackAPIhelper {
  constructor(private request: APIRequestContext) {
    this.request = request;
  }

  async checkFeedback(
    token: string,
    name: string,
    phone: string
  ): Promise<{ found: boolean; id: number | null }> {
    const response = await this.request.get(
      `https://stage.rentzila.com.ua/api/backcall/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const feedbackList = await response.json();

    for (const feedback of feedbackList) {
      if (feedback.name === name && feedback.phone === phone) {
        return { found: true, id: feedback.id };
      }
    }
    return { found: false, id: null };
  }

  async deleteFeedback(token: string, id: number): Promise<void> {
    await this.request.delete(
      `https://stage.rentzila.com.ua/api/backcall/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}

export default FeedbackAPIhelper;
