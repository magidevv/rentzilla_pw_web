import { Page } from "@playwright/test";
import BasePage from "./base-page";

const sendMsgBtn: string =
  "//a[contains(@class, 'tgme_action_button_new shine')]";

class TelegramPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public async checkTelegramBotURL(): Promise<void> {
    await super.doesPageHaveURL(/t.me\/letka_lq_bot/);
  }

  public async checkSendMsgBtn(): Promise<void> {
    await super.isDisplayed(sendMsgBtn);
    await super.doesElementAttrHaveValue(
      sendMsgBtn,
      "href",
      "tg://resolve?domain=letka_lq_bot"
    );
  }
}

export default TelegramPage;
