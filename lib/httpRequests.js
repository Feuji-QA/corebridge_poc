import http from "k6/http";
import { check, sleep } from "k6";
import { Counter } from "k6/metrics";
const failedRequestsCounter = new Counter("failed_requests");

export function authRequest(BASE_URL) {
  const url = `${BASE_URL}/api/security/login`;
  const payload = JSON.stringify({
    username: 'Adminqa',
    password: 'automate@123',
  });
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = http.post(url, payload, params);
  check(
    res,
    { "status is 200": (r) => r.status === 200 },
    { type: "authentication" }
  );
  check(
    res,
    { "response time is less than 500ms": (r) => r.timings.duration < 500 },
    { type: "authentication" }
  );
  if (!res.status === 200) {
    failedRequestsCounter.add(1);
  }
  if (res.status !== 200) {
    throw new Error(`Auth failed! Status: ${res.status}`);
  }
  const token = JSON.parse(res.body.replace("Adminqa", ""));
  return token;
}

export function testPostRequest(URL, tokenData, payloadData) {
  const headers = {
    headers: {
      Authenticate: `Avala-Api krishnakanthk${tokenData.token}`,
      "Content-Type": "application/json",
    },
  };
  let res = http.post(URL, JSON.stringify(payloadData), headers);
  check(
    res,
    { "post status is 201": (r) => r.status === 201 },
    { type: "post_order" }
  );
  check(
    res,
    {
      "post response time is less than 5000ms": (r) =>
        r.timings.duration < 5000,
    },
    { type: "post_order" }
  );
  if (!res.status === 200) {
    failedRequestsCounter.add(1);
  }
  sleep(1);
}
