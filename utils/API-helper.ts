import { APIRequestContext } from "@playwright/test";
import fs from "fs";
import path from "path";

let accessToken: any = null;
let feedbackList: any;
let userMe: any;
let unitList: any;
let manufacturerList: any;
let categoryList: any;
let serviceList: any;

const data: any = {
  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD,

  userEmail: process.env.MY_EMAIL,
  userPassword: process.env.MY_PASSWORD,
  userPhone: process.env.MY_PHONE,
};

class APIhelper {
  constructor(private request: APIRequestContext) {
    this.request = request;
  }
  async createAccessToken(): Promise<string> {
    if (!accessToken) {
      const response = await this.request.post(
        `https://stage.rentzila.com.ua/api/auth/jwt/create/`,
        {
          data: {
            email: data.adminEmail,
            password: data.adminPassword,
          },
        }
      );
      const responseBody = await response.json();
      accessToken = responseBody.access;
    }
    return accessToken;
  }

  async getFeedbackList(): Promise<any> {
    const userAccessToken = await this.createAccessToken();
    const response = await this.request.get(
      `https://stage.rentzila.com.ua/api/backcall/`,
      {
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
        },
      }
    );
    feedbackList = await response.json();
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

  async deleteFeedback(name: string, phone: string): Promise<void> {
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

  async createUserAccessToken(): Promise<string> {
    if (!accessToken) {
      const response = await this.request.post(
        `https://stage.rentzila.com.ua/api/auth/jwt/create/`,
        {
          data: {
            email: data.userEmail,
            password: data.userPassword,
          },
        }
      );
      const responseBody = await response.json();
      accessToken = responseBody.access;
    }
    return accessToken;
  }

  async createUnit(name: string): Promise<number> {
    const owner = await this.getMyUserId();
    const manufacturer = await this.getManufacturerId("ABAC");
    const category = await this.getCategoryId("всюдиходи");
    const services = await this.getServiceId("Риття ям");
    const token = await this.createUserAccessToken();

    // Create the unit
    const responseUnit = await this.request.post(
      "https://stage.rentzila.com.ua/api/units/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          name: name,
          model_name: "Sample model",
          description: "This is a sample unit created via API.",
          features: "Sample features of the unit.",
          type_of_work: "HOUR",
          time_of_work: "",
          phone: data.userPhone,
          minimal_price: 1500,
          money_value: "USD",
          payment_method: "CASH_OR_CARD",
          lat: 50.453,
          lng: 30.516,
          count: 1,
          is_approved: false,
          is_archived: false,
          manufacturer: manufacturer,
          owner: owner,
          category: category,
          services: [services],
        },
      }
    );

    const responseBodyUnit = await responseUnit.json();
    console.log(responseBodyUnit);

    // Check if the unit was created successfully
    if (responseUnit.status() !== 201) {
      throw new Error("Unit creation failed");
    }

    const unitId = responseBodyUnit.id;

    // Upload the unit image
    const imagePath = path.resolve("data/", "test.png");
    const imageStream = fs.createReadStream(imagePath);

    const responseImage = await this.request.post(
      "https://stage.rentzila.com.ua/api/unit-images/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        multipart: {
          unit: unitId,
          is_main: true,
          image: imageStream,
        },
      }
    );

    const statusCode = responseImage.status();
    return statusCode;
  }

  async getUserMe(): Promise<any> {
    const userAccessToken = await this.createUserAccessToken();
    const response = await this.request.get(
      `https://stage.rentzila.com.ua/api/auth/users/me/`,
      {
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
        },
      }
    );
    userMe = await response.json();
    return userMe;
  }

  async getMyUserId(): Promise<number | null> {
    const response = await this.getUserMe();
    console.log(response.id);
    return response ? response.id : null;
  }

  async getManufacturerList(): Promise<any> {
    const userAccessToken = await this.createAccessToken();
    const response = await this.request.get(
      `https://stage.rentzila.com.ua/api/manufacturers/`,
      {
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
        },
      }
    );
    manufacturerList = await response.json();
    //console.log(manufacturerList);
    return manufacturerList;
  }

  async getManufacturerId(name: string): Promise<number | null> {
    const response = await this.getManufacturerList();
    let id: number | null = null;
    for (const manufacturer of response) {
      if (manufacturer.name === name) {
        id = manufacturer.id;
        console.log(manufacturer.name);
        return id;
      }
    }
    return id;
  }

  async getCategoryList(): Promise<any> {
    const userAccessToken = await this.createAccessToken();
    const response = await this.request.get(
      `https://stage.rentzila.com.ua/api/category/`,
      {
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
        },
      }
    );
    categoryList = await response.json();
    //console.log(categoryList);
    return categoryList;
  }

  async getCategoryId(name: string): Promise<number | null> {
    const response = await this.getCategoryList();
    let id: number | null = null;
    for (const category of response) {
      if (category.name === name) {
        id = category.id;
        console.log(category.name);
        return id;
      }
    }
    return id;
  }

  async getServiceList(): Promise<any> {
    const userAccessToken = await this.createAccessToken();
    const response = await this.request.get(
      `https://stage.rentzila.com.ua/api/services/`,
      {
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
        },
      }
    );
    serviceList = await response.json();
    //console.log(serviceList);
    return serviceList;
  }

  async getServiceId(name: string): Promise<number | null> {
    const response = await this.getServiceList();
    let id: number | null = null;
    for (const service of response) {
      if (service.name === name) {
        id = service.id;
        console.log(service.name);
        return id;
      }
    }
    return id;
  }

  async getUnitList(): Promise<any> {
    const userAccessToken = await this.createAccessToken();
    const response = await this.request.get(
      `https://stage.rentzila.com.ua/api/units/`,
      {
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
        },
      }
    );
    unitList = await response.json();
    //console.log(unitList);
    return unitList;
  }

  async checkUnitResponseResults(name: string): Promise<boolean> {
    const response = await this.getUnitList();
    for (const unit of response.results) {
      if (unit.name === name) {
        return true;
      }
    }
    return false;
  }

  async getUnitId(name: string): Promise<number | null> {
    const response = await this.getUnitList();
    let id: number | null = null;
    for (const unit of response.results) {
      if (unit.name === name) {
        id = unit.id;
        console.log(unit.name);
        return id;
      }
    }
    return id;
  }

  async deleteUnit(name: string): Promise<void> {
    const id = await this.getUnitId(name);
    const userAccessToken = await this.createAccessToken();
    await this.request.delete(
      `https://stage.rentzila.com.ua/api/units/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
        },
      }
    );
  }
}

export default APIhelper;
