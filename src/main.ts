async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser");

    return worker.start();
  } else {
    return;
  }
}

enableMocking().then(async () => {
  const endpoint =
    "https://rdt07jwj7j.execute-api.us-east-1.amazonaws.com/prod/";

  async function getVisitorCount() {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      return data;
    } catch (e) {
      console.error(e);

      return null;
    }
  }

  const visitorCount = await getVisitorCount();

  if (!visitorCount) {
    console.log("Visitor count unavailable");
  } else {
    const { count } = visitorCount;
    console.info(`total visitors: ${count}`);
  }
});
