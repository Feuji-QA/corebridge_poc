import { BASE_URL, stagesConfig, defaultOptions } from "../lib/config.js";
import {
  authRequest,
  testPostRequest,
} from "../lib/httpRequests.js";

const {
  htmlReport,
} = require("https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js");

const payloadData = JSON.parse(open("./data/registrationPayload.json"));

function getStage() {
  const testType = __ENV.TEST_TYPE || "load"; // Default to 'load' test
  switch (testType) {
    case "load":
      return stagesConfig.loadTest;
    case "stress":
      return stagesConfig.stressTest;
    case "spike":
      return stagesConfig.spikeTest;
    case "soak":
      return stagesConfig.soakTest;
    default:
      exec.test.abort();
  }
}

const stage = getStage();

export const options = {
  stages: stage,
  thresholds: defaultOptions.thresholds,
};

// The setup function is executed once before VUs start
export function setup() {
  const token = authRequest(BASE_URL);
  return { token };
}

export default function (data) {
  testPostRequest(`${BASE_URL}/Marketing/api/Registration/?manufacturer=YM`, data, payloadData);
}

// Optional: Generate a summary report
export function handleSummary(data) {
  const testType = __ENV.TEST_TYPE || 'load';
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  
  // Enhanced report configuration
  const reportConfig = {
    "title": `Performance Test Report - ${testType.toUpperCase()}`,
    "note": `Test executed at ${new Date().toLocaleString()}`,
    "showTrendMarks": true
  };
  
  return {
    [`reports/${testType}-test.html`]: htmlReport(data, reportConfig),
    [`reports/${testType}-summary.json`]: JSON.stringify({
      ...data,
      metadata: {
        testType,
        timestamp,
        baseUrl: BASE_URL,
        stages: options.stages
      }
    }, null, 2)
  };
}

