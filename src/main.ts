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

    await fetch(endpoint)
        .then(async (response) => {
            const data = await response.json();
            const countEl = document.getElementById("count");
            console.info(`total visitors: ${data.count}`);

            if (countEl) {
                countEl.innerText = data.count;

                const containerEl = countEl.parentElement;
                containerEl?.classList.add("opacity-100");
                containerEl?.classList.remove("opacity-0");
            }
        })
        .catch((e) => {
            console.log("Visitor count unavailable");
            console.log(e);
        });
});
