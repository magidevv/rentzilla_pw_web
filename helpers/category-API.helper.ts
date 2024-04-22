import { APIRequestContext } from "@playwright/test";

let categoryList: any;

class CategoryAPIhelper {
  constructor(private request: APIRequestContext) {
    this.request = request;
  }

  async getCategoryId(token: string, name: string): Promise<number | null> {
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

    let id: number | null = null;
    for (const category of categoryList) {
      if (category.name === name) {
        id = category.id;
        console.log(category.name);
        return id;
      }
    }
    return id;
  }
}

export default CategoryAPIhelper;
