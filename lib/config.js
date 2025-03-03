export const BASE_URL = "https://yamahaqa.aimbase.com";

export const defaultOptions = {
  thresholds: {
    http_req_duration: ["p(95)<1000", "p(99)<1500"],
    http_req_failed: ["rate<0.05"],
    // 'http_reqs{expected_response:true}': ['rate>10'],
  },
};

export const stagesConfig = {
  loadTest: [
    { duration: "30s", target: 50 },
    { duration: "1m", target: 50 },
    { duration: "30s", target: 0 },
  ],
  stressTest: [
    { duration: "2m", target: 100 },
    { duration: "2m", target: 200 },
    { duration: "1m", target: 0 },
  ],
  spikeTest: [
    { duration: "5s", target: 200 },
    { duration: "30s", target: 0 },
  ],
  soakTest: [
    { duration: "2m", target: 100 },
    { duration: "1h", target: 100 },
  ],
};
