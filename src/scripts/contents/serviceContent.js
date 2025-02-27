const serviceContentForTs = `
import { NotFoundException } from "gonest";

class DemoService {
  constructor() {}

  async demo(userId: number) {
    if (!userId) {
      throw new NotFoundException("UserId not specified!");
    }

    if (userId) return \`User: \${userId}\`;
  }
}

export default DemoService;
`;

const serviceContentForJs = `
import { NotFoundException } from "gonest";

class DemoService {
  constructor() {}

  async demo(userId) {
    if (!userId) {
      throw new NotFoundException("UserId not specified!");
    }

    if (userId) return \`User: \${userId}\`;
  }
}

export default DemoService;
`;

module.exports = { serviceContentForTs, serviceContentForJs };
