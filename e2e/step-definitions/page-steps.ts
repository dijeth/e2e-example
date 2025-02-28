import { Given, Then, When } from "@cucumber/cucumber";
import { CustomWorld } from "../cucumber-setup/custom-world";
import { setTimeout } from "node:timers/promises";
import * as assert from "node:assert";

Given("Goto page {string}", async function (this: CustomWorld, path: string) {
  this.page = await this.browser.newPage();
  this.page.setViewportSize({ width: 1920, height: 1040 });
  await this.page.goto(`${this.parameters.appUrl}/${path}`);
});

Then(
  "Address block has the {string} brand",
  async function (this: CustomWorld, brand: string) {
    await this.page.locator(".catalog__address").getByText(brand).waitFor();
  }
);

Given("Wait for {int} sec", async function (sec: number) {
  await setTimeout(sec * 1000);
});

When("Screenshot {string}", async function (this: CustomWorld, name: string) {
  await this.screenshot(name);
});

Given(
  "Store {string} to {string}",
  async function (this: CustomWorld, element: string, store: string) {
    let elementData: string;
    switch (element) {
      case "main-image":
        elementData = await this.page
          .locator(".slide--active .look__image")
          .evaluate((el) => {
            return el.getAttribute("src");
          });
        break;

      case "thrumbnail-image":
        elementData = await this.page
          .locator(".nav-carousel.navigation .slide--active img")
          .evaluate((el) => {
            return el.getAttribute("src");
          });
        break;
    }

    this.scope.set(store, elementData);
  }
);

When(
  "Click the {string} button",
  async function (this: CustomWorld, button: string) {
    switch (button) {
      case "next":
        await this.page
          .locator(".catalog__look-navigation button")
          .last()
          .click();
        break;
    }
  }
);

Then(
  "The {string} is not equal {string}",
  async function (this: CustomWorld, element: string, store: string) {
    let elementData: string;
    switch (element) {
      case "main-image":
        elementData = await this.page
          .locator(".look-navigation .slide--active .look__image")
          .evaluate((el) => {
            return el.getAttribute("src");
          });
        break;

      case "thrumbnail-image":
        elementData = await this.page
          .locator(".nav-carousel.navigation .slide--active img")
          .evaluate((el) => {
            return el.getAttribute("src");
          });
        break;
    }

    assert.notEqual(elementData, this.scope.get(store));
  }
);
