import { APIRequestContext } from "@playwright/test";

let manufacturerList: any;

class ManufacturerAPIhelper {
  constructor(private request: APIRequestContext) {
    this.request = request;
  }

  async getManufacturerId(token: string, name: string): Promise<number | null> {
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

    let id: number | null = null;
    for (const manufacturer of manufacturerList) {
      if (manufacturer.name === name) {
        id = manufacturer.id;
        console.log(manufacturer.name);
        return id;
      }
    }
    return id;
  }
}

export default ManufacturerAPIhelper;
