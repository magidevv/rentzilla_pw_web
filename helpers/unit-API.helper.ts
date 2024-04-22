import { APIRequestContext } from "@playwright/test";
import fs from "fs";
import path from "path";
import { generateRandomCombination } from "../utils/random.util";

let unitList: any;
let priceList: any;
let imageList: any;

class APIhelper {
  constructor(private request: APIRequestContext) {
    this.request = request;
  }

  async createUnit(
    ownerId: number,
    manufacturerId: number,
    categoryId: number,
    serviceId: number,
    token: string
  ): Promise<{ name: string; responseBodyUnit: any }> {
    const name = "Test " + generateRandomCombination();
    const unitDataString = await fs.promises.readFile(
      "utils/unit-data.json",
      "utf8"
    );
    const unitData = JSON.parse(unitDataString);

    const responseUnit = await this.request.post(
      "https://stage.rentzila.com.ua/api/units/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          ...unitData,
          name,
          owner: ownerId,
          manufacturer: manufacturerId,
          category: categoryId,
          services: [serviceId],
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

  async approveUnit(token: string, id: number): Promise<void> {
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

  async getImageId(token: string, unitId: number): Promise<number | null> {
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

    let id: number | null = null;
    for (const image of imageList)
      if (image.unit === unitId) {
        id = image.id;
        console.log(image.unit);
        return id;
      }
    return id;
  }

  async getUserUnit(token: string, name: string): Promise<any> {
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

  async checkUnitById(token: string, id: number): Promise<boolean> {
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

    for (const unit of unitList.results) {
      if (unit.id === id) {
        return true;
      }
    }
    return false;
  }

  async editUnit(
    id: number,
    name: string,
    manufacturerId: number,
    serviceId: number,
    priceId: number,
    imageId: number,
    token: string
  ): Promise<void> {
    const unitDataString = await fs.promises.readFile(
      "utils/edit-unit-data.json",
      "utf8"
    );
    const unitData = JSON.parse(unitDataString);

    const responseUnitEdit = await this.request.patch(
      `https://stage.rentzila.com.ua/api/units/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          ...unitData,
          name: name + " Edited",
          manufacturer: manufacturerId,
          services: [serviceId],
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
          service: serviceId,
          unit: id,
        },
      }
    );

    if (responsePriceAdd.status() !== 201) {
      throw new Error(responsePriceAdd.statusText());
    }

    // Edit Unit Service price
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

  async getPriceId(token: string, unitId: number): Promise<number | null> {
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

    let id: number | null = null;
    for (const price of priceList) {
      if (price.unit === unitId) {
        id = price.id;
        console.log(price.id);
        return id;
      }
    }
    return id;
  }

  async addToFavUnit(userId: number, id: number, token: string): Promise<void> {
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

  async deleteUnit(token: string, id: number): Promise<void> {
    const response = await this.request.delete(
      `https://stage.rentzila.com.ua/api/units/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status() !== 204) {
      throw new Error("Unit deletion failed");
    }
  }
}

export default APIhelper;
