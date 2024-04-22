import { APIRequestContext } from "@playwright/test";

let serviceList: any;

class ServiceAPIhelper {
  constructor(private request: APIRequestContext) {
    this.request = request;
  }

  async getServiceCategoryId(
    token: string,
    name: string
  ): Promise<number | null> {
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

    let id: number | null = null;
    for (const service of serviceList) {
      if (service.name === name) {
        id = service.category[0].id;
        console.log(service.category[0].name);
        return id;
      }
    }
    return id;
  }

  async deleteServiceByName(token: string, name: string): Promise<void> {
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

    let id: number | null = null;
    for (const service of serviceList) {
      if (service.name === name) {
        id = service.id;
        console.log(service.name);
      }
    }

    await this.request.delete(
      `https://stage.rentzila.com.ua/api/crm/services/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  async checkServiceByName(token: string, name: string): Promise<boolean> {
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

    for (const service of serviceList) {
      if (service.name === name) {
        return true;
      }
    }
    return false;
  }
}

export default ServiceAPIhelper;
