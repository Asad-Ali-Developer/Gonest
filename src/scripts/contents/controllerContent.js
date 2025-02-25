const controllerContentForTs = `
import { Controller, Get } from "gonest";

@Controller("demo") // Base route: /api/v1/demo
export class DemoController {

  /**
   * Handles GET requests to "/api/v1/demo/route".
   * @returns A simple JSON response.
   */
  @Get("/route")
  async demo() {
    return { message: "Hello, Gonest!" };
  }
}
`;

const controllerContentForJs = `
import { Controller, Get } from "gonest";

@Controller("demo") // Base route: /api/v1/demo
export class DemoController {

  /**
   * Handles GET requests to "/api/v1/demo/route".
   * @returns A simple JSON response.
   */
  @Get("/route")
  async demo() {
    return { message: "Hello, Gonest!" };
  }
}
`;

module.exports = { controllerContentForTs, controllerContentForJs };
