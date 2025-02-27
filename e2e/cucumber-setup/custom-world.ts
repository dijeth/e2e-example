import { IWorldOptions, World } from '@cucumber/cucumber'
import { Browser, chromium, Page } from 'playwright'

interface CustomWorldParameters {
  appUrl: string
}

export class CustomWorld extends World<CustomWorldParameters> {
  browser: Browser
  page: Page
  scope: Map<string, any> = new Map()

  constructor(options: IWorldOptions) {
    super(options)
  }

  async init() {
    this.browser = await chromium.launch({ headless: true })
  }

  async close() {
    await this.browser.close()
  }

  async screenshot(path = '1.png') {
    if (!this.page) {
      return
    }

    await this.page.screenshot({ path })
  }
}
