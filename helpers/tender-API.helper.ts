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

  async createTender(
    userId: number,
    serviceCategoryId: number,
    serviceId: number,
    token: string
  ): Promise<{
    name: string;
    responseBodyTender: any;
  }> {
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
          customer: userId,
          category: serviceCategoryId,
          services: [serviceId],
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

  async approveTender(token: string, id: number): Promise<void> {
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

  async rejectTender(token: string, id: number): Promise<void> {
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

  async closeTender(token: string, id: number): Promise<void> {
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

  async checkTenderByName(token: string, name: string): Promise<boolean> {
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

    for (const tender of tenderList.tenders) {
      if (tender.name === name) {
        return true;
      }
    }
    return false;
  }

  async checkTenderById(token: string, id: number): Promise<boolean> {
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

    for (const tender of tenderList.tenders) {
      if (tender.id === id) {
        return true;
      }
    }
    return false;
  }

  async deleteTenderById(token: string, id: number): Promise<void> {
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

  async deleteTenderByName(token: string, name: string): Promise<void> {
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

    let id: number | null = null;
    for (const tender of tenderList.tenders) {
      if (tender.name === name) {
        id = tender.id;
        console.log(tender.name);
      }
    }

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
