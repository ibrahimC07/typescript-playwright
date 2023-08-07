import { Locator, Page } from '@playwright/test';
import * as userData from 'utils/userData.json';

export class LoginPage {
    private page: Page;
    eposta: Locator;
    password: Locator;
    clickButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.eposta =  page.locator('#email');
    this.password = page.locator('#password');
    this.clickButton = page.locator("button[type='submit']")

  }

  
  async navigate() {
    await this.page.goto(userData.webUIStage.url);
  }

  async login() {
    await this.eposta.fill(userData.webUIStage.musteri.username)
    await this.password.fill(userData.webUIStage.musteri.password)
    await this.clickButton.click();
}}

