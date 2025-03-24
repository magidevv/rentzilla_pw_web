import { APIRequestContext } from "@playwright/test";

let adminAccessToken: any = null;
let userAccessToken: any = null;

const data: any = {
  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD,

  userEmail: process.env.USER_EMAIL,
  userPassword: process.env.USER_PASSWORD,
  userPhone: process.env.USER_PHONE,
};

class TokenAPIhelper {
  constructor(private request: APIRequestContext) {
    this.request = request;
  }

  async createAdminAccessToken(): Promise<string> {
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
}

export default TokenAPIhelper;
