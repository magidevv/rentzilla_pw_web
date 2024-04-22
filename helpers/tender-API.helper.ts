import { APIRequestContext } from "@playwright/test";
import fs from "fs";
import path from "path";
import { generateRandomCombination } from "../utils/random.util";
import { date } from "../utils/tender-data";

let tenderList: any;

class APIhelper {
  constructor(private request: APIRequestContext) {
    this.request = request;
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
}

export default APIhelper;
