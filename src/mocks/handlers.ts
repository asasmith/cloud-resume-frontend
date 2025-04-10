import { http, HttpResponse } from "msw";

const endpoint = "https://rdt07jwj7j.execute-api.us-east-1.amazonaws.com/prod/";

export const handlers = [
  http.get(endpoint, () => {
      return HttpResponse.json({ count: 1});
  }),
];
