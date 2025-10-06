import {
  chromium,
  firefox,
  webkit,
  Browser,
  BrowserContext,
  Page,
  APIRequestContext,
} from '@playwright/test';
import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';

export interface APIResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: any;
  responseTime: number;
  url: string;
}

export interface APIRequest {
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: any;
}

export interface CustomWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  apiContext?: APIRequestContext;
  currentRequest?: APIRequest;
  currentResponse?: APIResponse;
  storedData?: Map<string, any>;
  openBrowser(browserName?: string, headless?: boolean): Promise<void>;
  closeBrowser(): Promise<void>;
  initializeApiContext(): Promise<void>;
}

export class CustomWorldConstructor extends World implements CustomWorld {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  apiContext?: APIRequestContext;
  currentRequest?: APIRequest;
  currentResponse?: APIResponse;
  storedData?: Map<string, any>;

  constructor(options: IWorldOptions) {
    super(options);
    this.storedData = new Map();
  }

  async openBrowser(browserName: string = 'chromium', headless: boolean = true) {
    switch (browserName.toLowerCase()) {
      case 'firefox':
        this.browser = await firefox.launch({ headless });
        break;
      case 'webkit':
      case 'safari':
        this.browser = await webkit.launch({ headless });
        break;
      case 'chromium':
      case 'chrome':
      default:
        this.browser = await chromium.launch({ headless });
        break;
    }

    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  async closeBrowser() {
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
    if (this.apiContext) await this.apiContext.dispose();
  }

  async initializeApiContext() {
    if (!this.browser) {
      // If no browser context exists, create one for API testing
      this.browser = await chromium.launch({ headless: true });
    }
    this.apiContext = await this.browser.newContext().then((ctx) => ctx.request);
  }
}

setWorldConstructor(CustomWorldConstructor);
