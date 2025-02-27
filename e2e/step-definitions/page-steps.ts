import { Given, Then, When } from '@cucumber/cucumber'
import { CustomWorld } from '../cucumber-setup/custom-world'
import { setTimeout } from 'node:timers/promises'

Given('Goto page {string}', async function (this: CustomWorld, path: string) {
  this.page = await this.browser.newPage()
  this.page.setViewportSize({ width: 1920, height: 1040 })
  await this.page.goto(`${this.parameters.appUrl}/${path}`)
})

Then('Address block has the {string} brand', async function (this: CustomWorld, brand: string) {
  await this.page.locator('.catalog__address').getByText(brand).waitFor()
})

Given('Wait for {int} sec', async function (sec: number) {
  await setTimeout(sec * 1000)
})

When('Screenshot {string}', async function (this: CustomWorld, name: string) {
  await this.screenshot(name)
})
