import { After, Before, setDefaultTimeout, setWorldConstructor } from '@cucumber/cucumber'
import { CustomWorld } from './custom-world'

setWorldConstructor(CustomWorld)
setDefaultTimeout(30000)

Before(async function (this: CustomWorld) {
  await this.init()
})

After(async function (this: CustomWorld) {
  await this.close()
})
