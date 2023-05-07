const { Cluster } = require('puppeteer-cluster');

(async () => {
    // Create a cluster with 2 workers
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 2,
        puppeteerOptions: {
            headless: false
        },
    });

    // Define a task
    await cluster.task(async ({ page, data: url }) => {
        await page.goto(url);
        
        const pageTitle = await page.evaluate(() => {
            // Fetch the first element with class "quote"
            // Get the displayed text and returns it
            const quoteList = document.querySelectorAll(".events-list__grid__info");

            // Convert the quoteList to an iterable array
            // For each quote fetch the text and author
            return Array.from(quoteList).map((quote) => {
            // Fetch the sub-elements from the previously fetched quote element
            // Get the displayed text and return it (`.innerText`)
            const teamA = quote.querySelector(".events-list__grid__info__main__participants").innerText.replace('\n', ' - ');
            const time = quote.querySelector(".events-list__grid__info__datetime").innerText.replace('\n', ' - ');
           // const tittle = quote.querySelector(".selections__selection").innerText;
            //const odd = quote.querySelector(".selections__selection__odd");

            return { teamA, time };
            });
        });
        return pageTitle;

        
    });

    // Use try-catch block as "execute" will throw instead of using events
    try {
        // Execute the tasks one after another via execute
        const result1 = await cluster.execute('https://www.betano.pt/sport/futebol/portugal/primeira-liga/17083/');
        console.log(result1);
        const result2 = await cluster.execute('https://www.betclic.pt/futebol-s1/portugal-primeira-liga-c32');
        console.log(result2);
    } catch (err) {
        // Handle crawling error
    }

    // Shutdown after everything is done
    await cluster.idle();
    await cluster.close();
})();