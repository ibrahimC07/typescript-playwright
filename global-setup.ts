import fs from "fs-extra";

async function globalSetup(): Promise<void> {
  await fs.remove('./allure-results');
  
}

export default globalSetup;