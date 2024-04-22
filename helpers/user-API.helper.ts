import { APIRequestContext } from "@playwright/test";

let currentUser: any;

class UserAPIhelper {
  constructor(private request: APIRequestContext) {
    this.request = request;
  }

  async getCurrentUser(token: string): Promise<any> {
    const response = await this.request.get(
      `https://stage.rentzila.com.ua/api/auth/users/me/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    currentUser = await response.json();
    return currentUser;
  }
}

export default UserAPIhelper;
