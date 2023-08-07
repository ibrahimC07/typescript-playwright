
import winston from "winston";
import { Reporter, TestCase, TestError, TestResult, TestStep } from "@playwright/test/reporter";



export default class CustomReporterConfig implements Reporter {
  private logger: winston.Logger | undefined;
  private logFileName: string | undefined;

  constructor() {
    this.createLogger();
  }

  private createLogger() {
    const now = new Date();
    const logDate = now.toISOString().split('T')[0];
    const logTime = now.toTimeString().split(' ')[0].replace(/:/g, '-');
    this.logFileName = `logs/${logDate}-${logTime}-info.log`;

    const consoleTransport = new winston.transports.Console();
    const fileTransport = new winston.transports.File({ filename: this.logFileName, level: 'info' });

    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      transports: [consoleTransport, fileTransport],
    });
  }

  onTestBegin(test: TestCase): void {
    this.logger?.info(`Test Case Started : ${test.title}`);
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    this.logger?.info(`Test Case Completed : ${test.title} Status : ${result.status}`);
  }

  onStepBegin(test: TestCase, result: TestResult, step: TestStep): void {
    if (step.category === `test.step`) {
      this.logger?.info(`Executing Step : ${step.title}`);
    }
  }

  onError(error: TestError): void {
    this.logger?.error(error.message);
  }
}
