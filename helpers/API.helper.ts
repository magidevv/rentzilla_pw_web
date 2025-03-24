import { APIRequestContext } from "@playwright/test";
import fs from "fs";
import path from "path";
import { generateRandomCombination } from "../utils/random.util";
import { date } from "../utils/tender-data";

let adminAccessToken: any = null;
let userAccessToken: any = null;
let feedbackList: any;
let userMe: any;
let unitList: any;
let tenderList: any;
let manufacturerList: any;
let categoryList: any;
let serviceList: any;
let priceList: any;
let imageList: any;

const data: any = {
  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD,

  userEmail: process.env.USER_EMAIL,
  userPassword: process.env.USER_PASSWORD,
  userPhone: process.env.USER_PHONE,
};

class APIhelper {
  constructor(private request: APIRequestContext) {
    this.request = request;
  }

  async createAccessToken(): Promise<string> {
    if (adminAccessToken === null) {
      const response = await this.request.post(
        "https://stage.rentzila.com.ua/api/auth/jwt/create/",
        {
          data: {
            email: data.adminEmail,
            password: data.adminPassword,
          },
        }
      );
      const responseData = await response.json();
      adminAccessToken = responseData.access;
    }
    return adminAccessToken;
  }

  async getFeedbackList(): Promise<any> {
    const token = await this.createAccessToken();
    const response = await this.request.get(
      `https://stage.rentzila.com.ua/api/backcall/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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
    const token = await this.createAccessToken();
    await this.request.delete(
      `https://stage.rentzila.com.ua/api/backcall/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  async createUserAccessToken(): Promise<string> {
    if (userAccessToken === null) {
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
      userAccessToken = responseBody.access;
    }
    return userAccessToken;
  }

  async createUnit(): Promise<{ name: string; responseBodyUnit: any }> {
    const name = "Test " + generateRandomCombination();
    const unitDataString = await fs.promises.readFile(
      "utils/unit-data.json",
      "utf8"
    );
    const unitData = JSON.parse(unitDataString);
    const owner = await this.getMyUserId();
    const manufacturer = await this.getManufacturerId(
      unitData.manufacturer.name
    );
    const category = await this.getCategoryId(unitData.category.name);
    const services = await this.getServiceId(unitData.services[0].name);
    const token = await this.createUserAccessToken();

    const responseUnit = await this.request.post(
      "https://stage.rentzila.com.ua/api/units/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          ...unitData,
          name,
          owner,
          manufacturer,
          category,
          services: [services],
        },
      }
    );

    const responseBodyUnit = await responseUnit.json();
    // console.log(responseBodyUnit);

    if (responseUnit.status() !== 201) {
      throw new Error("Unit creation failed");
    }

    const unitId = responseBodyUnit.id;

    // Upload the main unit image
    const imagePath1 = path.resolve("data/", "test.png");
    const imageStream1 = fs.createReadStream(imagePath1);

    const responseImage1 = await this.request.post(
      "https://stage.rentzila.com.ua/api/unit-images/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        multipart: {
          unit: unitId,
          is_main: true,
          image: imageStream1,
        },
      }
    );

    if (responseImage1.status() !== 201) {
      throw new Error("Unit Image uploading failed");
    }

    // Upload the second unit image
    const imagePath2 = path.resolve("data/", "test copy.png");
    const imageStream2 = fs.createReadStream(imagePath2);

    const responseImage2 = await this.request.post(
      "https://stage.rentzila.com.ua/api/unit-images/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        multipart: {
          unit: unitId,
          is_main: false,
          image: imageStream2,
        },
      }
    );

    if (responseImage2.status() !== 201) {
      throw new Error("Unit Image uploading failed");
    }

    return { name, responseBodyUnit };
  }

  async createUnitByCategory(
    categoryName: string
  ): Promise<{ name: string; responseBodyUnit: any }> {
    const name = "Test " + generateRandomCombination();
    const unitDataString = await fs.promises.readFile(
      "utils/unit-data.json",
      "utf8"
    );
    const unitData = JSON.parse(unitDataString);
    const owner = await this.getMyUserId();
    const manufacturer = await this.getManufacturerId(
      unitData.manufacturer.name
    );
    const category = await this.getCategoryId(categoryName);
    const services = await this.getServiceId(unitData.services[0].name);
    const token = await this.createUserAccessToken();

    const responseUnit = await this.request.post(
      "https://stage.rentzila.com.ua/api/units/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          ...unitData,
          name,
          owner,
          manufacturer,
          category,
          services: [services],
        },
      }
    );

    const responseBodyUnit = await responseUnit.json();
    // console.log(responseBodyUnit);

    if (responseUnit.status() !== 201) {
      throw new Error("Unit creation failed");
    }

    const unitId = responseBodyUnit.id;

    // Upload the main unit image
    const imagePath1 = path.resolve("data/", "test.png");
    const imageStream1 = fs.createReadStream(imagePath1);

    const responseImage1 = await this.request.post(
      "https://stage.rentzila.com.ua/api/unit-images/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        multipart: {
          unit: unitId,
          is_main: true,
          image: imageStream1,
        },
      }
    );

    if (responseImage1.status() !== 201) {
      throw new Error("Unit Image uploading failed");
    }

    // Upload the second unit image
    const imagePath2 = path.resolve("data/", "test copy.png");
    const imageStream2 = fs.createReadStream(imagePath2);

    const responseImage2 = await this.request.post(
      "https://stage.rentzila.com.ua/api/unit-images/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        multipart: {
          unit: unitId,
          is_main: false,
          image: imageStream2,
        },
      }
    );

    if (responseImage2.status() !== 201) {
      throw new Error("Unit Image uploading failed");
    }

    return { name, responseBodyUnit };
  }

  async approveUnit(id: number): Promise<void> {
    const token = await this.createAccessToken();
    await this.request.patch(
      `https://stage.rentzila.com.ua/api/crm/units/${id}/moderate/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          declined_censored: false,
          declined_incomplete: false,
          declined_incorrect_data: false,
          declined_incorrect_price: false,
          declined_invalid_img: false,
          is_approved: true,
        },
      }
    );

    // if (response.status() !== 200) {
    //   throw new Error(response.statusText());
    // }
  }

  async getUserMe(): Promise<any> {
    const token = await this.createUserAccessToken();
    const response = await this.request.get(
      `https://stage.rentzila.com.ua/api/auth/users/me/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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
    const token = await this.createAccessToken();
    const response = await this.request.get(
      `https://stage.rentzila.com.ua/api/manufacturers/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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
    const token = await this.createAccessToken();
    const response = await this.request.get(
      `https://stage.rentzila.com.ua/api/category/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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

  async getServiceCategoryId(name: string): Promise<number | null> {
    const response = await this.getServiceList();
    let id: number | null = null;
    for (const service of response) {
      if (service.name === name) {
        id = service.category[0].id;
        console.log(service.category[0].name);
        return id;
      }
    }
    return id;
  }

  async getServiceList(): Promise<any> {
    const token = await this.createAccessToken();
    const response = await this.request.get(
      `https://stage.rentzila.com.ua/api/services/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    serviceList = await response.json();
    // console.log(serviceList);
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

  async getPriceList(): Promise<any> {
    const token = await this.createAccessToken();
    const response = await this.request.get(
      `https://stage.rentzila.com.ua/api/units/price/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    priceList = await response.json();
    // console.log(priceList);
    return priceList;
  }

  async getPriceId(unitId: number): Promise<number | null> {
    const response = await this.getPriceList();
    let id: number | null = null;
    for (const price of response) {
      if (price.unit === unitId) {
        id = price.id;
        console.log(price.id);
        return id;
      }
    }
    return id;
  }

  async getUnitImageList(): Promise<any> {
    const token = await this.createAccessToken();
    const response = await this.request.get(
      `https://stage.rentzila.com.ua/api/unit-images/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 10000,
      }
    );
    imageList = await response.json();
    // console.log(imageList);
    return imageList;
  }

  async getImageId(unitId: number): Promise<number | null> {
    const response = await this.getUnitImageList();
    let id: number | null = null;
    for (const image of response)
      if (image.unit === unitId) {
        id = image.id;
        console.log(image.unit);
        return id;
      }
    return id;
  }

  async getUnitList(): Promise<any> {
    const token = await this.createAccessToken();
    const response = await this.request.get(
      `https://stage.rentzila.com.ua/api/units/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 10000,
      }
    );
    unitList = await response.json();
    //console.log(unitList);
    return unitList;
  }

  async getUserUnit(name: string): Promise<any> {
    const token = await this.createUserAccessToken();
    const response = await this.request.get(
      `https://stage.rentzila.com.ua/api/auth/users/me/units/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    unitList = await response.json();
    // console.log(unitList.units);
    for (const unit of unitList.units) {
      if (unit.name === name) {
        return unit;
      }
    }
  }

  async checkUnitResponseResults(id: number): Promise<boolean> {
    const response = await this.getUnitList();
    for (const unit of response.results) {
      if (unit.id === id) {
        return true;
      }
    }
    return false;
  }

  async editUnit(id: number, name: string): Promise<void> {
    const unitDataString = await fs.promises.readFile(
      "utils/edit-unit-data.json",
      "utf8"
    );
    const unitData = JSON.parse(unitDataString);
    const manufacturer = await this.getManufacturerId(
      unitData.manufacturer.name
    );
    const services = await this.getServiceId(unitData.services[0].name);
    const token = await this.createUserAccessToken();
    const responseUnitEdit = await this.request.patch(
      `https://stage.rentzila.com.ua/api/units/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          ...unitData,
          name: name + " Edited",
          manufacturer,
          services: [services],
        },
      }
    );

    if (responseUnitEdit.status() !== 202) {
      throw new Error(responseUnitEdit.statusText());
    }

    // Add Unit Service Price
    const responsePriceAdd = await this.request.post(
      `https://stage.rentzila.com.ua/api/units/price/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          price: 1500,
          money_value: "UAH",
          type_of_work: "HOUR",
          time_of_work: "",
          service: services,
          unit: id,
        },
      }
    );

    if (responsePriceAdd.status() !== 201) {
      throw new Error(responsePriceAdd.statusText());
    }

    // Edit Unit Service price
    const priceId = await this.getPriceId(id!);
    const responsePriceEdit = await this.request.patch(
      `https://stage.rentzila.com.ua/api/units/price/${priceId}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          price: 3000,
          money_value: "UAH",
          type_of_work: "CHANGE",
          time_of_work: "EIGHT",
        },
      }
    );

    if (responsePriceEdit.status() !== 200) {
      throw new Error(responsePriceEdit.statusText());
    }

    // Edit Unit Image
    const imagePath = path.resolve("data/", "test copy 2.png");
    const imageStream = fs.createReadStream(imagePath);

    const imageId = await this.getImageId(id!);
    const responseImageEdit = await this.request.patch(
      `https://stage.rentzila.com.ua/api/unit-images/${imageId}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        multipart: {
          unit: id!,
          is_main: true,
          image: imageStream,
        },
      }
    );

    if (responseImageEdit.status() !== 200) {
      throw new Error(responseImageEdit.statusText());
    }
  }

  async addToFavUnit(id: number): Promise<void> {
    const userId = await this.getMyUserId();
    const token = await this.createUserAccessToken();
    const response = await this.request.post(
      `https://stage.rentzila.com.ua/api/auth/users/${userId}/favourite-units/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(await response.json());
  }

  async deleteUnit(id: number): Promise<void> {
    const token = await this.createAccessToken();
    const response = await this.request.delete(
      `https://stage.rentzila.com.ua/api/units/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  async createTender(): Promise<{ name: string; responseBodyTender: any }> {
    const name = "Test " + generateRandomCombination();
    const tenderDataString = await fs.promises.readFile(
      "utils/tender-data.json",
      "utf8"
    );
    const tenderData = JSON.parse(tenderDataString);
    const start_propose_date = date.currentDate;
    const end_propose_date = date.endDate;
    const start_tender_date = date.startTenderDate;
    const end_tender_date = date.endTenderDate;
    const customer = await this.getMyUserId();
    const category = await this.getServiceCategoryId(
      tenderData.services[0].name
    );
    const services = await this.getServiceId(tenderData.services[0].name);
    const token = await this.createUserAccessToken();

    const responseTender = await this.request.post(
      "https://stage.rentzila.com.ua/api/tenders/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          ...tenderData,
          name,
          start_propose_date,
          end_propose_date,
          start_tender_date,
          end_tender_date,
          customer,
          category,
          services: [services],
        },
      }
    );
    const responseBodyTender = await responseTender.json();
    // console.log(responseBodyTender);

    if (responseTender.status() !== 201) {
      throw new Error("Tender creation failed");
    }

    const tenderId = responseBodyTender.id;

    // Upload the documentation
    const imagePath1 = path.resolve("data/", "test.png");
    const imageStream1 = fs.createReadStream(imagePath1);

    const responseImage1 = await this.request.post(
      "https://stage.rentzila.com.ua/api/tender/attachment-file/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        multipart: {
          tender: tenderId,
          attachment_file: imageStream1,
        },
      }
    );

    if (responseImage1.status() !== 201) {
      throw new Error("Tender Image uploading failed");
    }

    return { name, responseBodyTender };
  }

  async approveTender(id: number): Promise<void> {
    const token = await this.createAccessToken();
    await this.request.post(
      `https://stage.rentzila.com.ua/api/crm/tenders/${id}/moderate/?status=approved`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // if (response.status() !== 200) {
    //   throw new Error(response.statusText());
    // }
  }

  async rejectTender(id: number): Promise<void> {
    const token = await this.createAccessToken();
    await this.request.post(
      `https://stage.rentzila.com.ua/api/crm/tenders/${id}/moderate/?status=declined`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // if (response.status() !== 200) {
    //   throw new Error(response.statusText());
    // }
  }

  async closeTender(id: number): Promise<void> {
    const token = await this.createAccessToken();
    await this.request.patch(
      `https://stage.rentzila.com.ua/api/tender/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          is_closed: true,
        },
      }
    );

    // if (response.status() !== 200) {
    //   throw new Error(response.statusText());
    // }
  }

  async getTenderList(): Promise<any> {
    const token = await this.createAccessToken();
    const response = await this.request.get(
      `https://stage.rentzila.com.ua/api/tenders/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 10000,
      }
    );
    tenderList = await response.json();
    // console.log(tenderList);
    return tenderList;
  }

  async checkTenderResponseResultsByName(name: string): Promise<boolean> {
    const response = await this.getTenderList();
    for (const tender of response.tenders) {
      if (tender.name === name) {
        return true;
      }
    }
    return false;
  }

  async checkTenderResponseResultsById(id: number): Promise<boolean> {
    const response = await this.getTenderList();
    for (const tender of response.tenders) {
      if (tender.id === id) {
        return true;
      }
    }
    return false;
  }

  async getTenderId(name: string): Promise<number | null> {
    const response = await this.getTenderList();
    let id: number | null = null;
    for (const tender of response.tenders) {
      if (tender.name === name) {
        id = tender.id;
        console.log(tender.name);
        return id;
      }
    }
    return id;
  }

  async deleteTender(id: number): Promise<void> {
    const token = await this.createAccessToken();
    await this.request.patch(
      `https://stage.rentzila.com.ua/api/tender/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          is_closed: true,
        },
      }
    );
    await this.request.delete(
      `https://stage.rentzila.com.ua/api/tender/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  async deleteTenderByName(name: string): Promise<void> {
    const id = await this.getTenderId(name);
    const token = await this.createAccessToken();
    await this.request.patch(
      `https://stage.rentzila.com.ua/api/tender/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          is_closed: true,
        },
      }
    );
    await this.request.delete(
      `https://stage.rentzila.com.ua/api/tender/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  async deleteService(name: string): Promise<void> {
    const id = await this.getServiceId(name);
    const token = await this.createAccessToken();
    await this.request.delete(
      `https://stage.rentzila.com.ua/api/crm/services/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  async checkServiceResponseResults(name: string): Promise<boolean> {
    const response = await this.getServiceList();
    for (const service of response) {
      if (service.name === name) {
        return true;
      }
    }
    return false;
  }
}

export default APIhelper;
