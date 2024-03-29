const { Cluster } = require('puppeteer-cluster');

(async () => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 2,
     puppeteerOptions: {
      headless: false,
      defaultViewport: false,
      userDataDir: "./tmp",
    },
  });

  await cluster.task(async ({ page, data: url}) => {
    await page.goto(url);
    await page.waitForSelector('#landing-page-modal');
    await page.click('#landing-page-modal');

        // Get page data
        const quotes = await page.evaluate(() => {
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

        // Display the quotes
        console.log("Betano", quotes);

        res.json(quotes);
        
  });

  cluster.queue('https://www.betano.pt/sport/futebol/portugal/primeira-liga/17083/');
  cluster.queue('https://www.betclic.pt/futebol-s1/portugal-primeira-liga-c32');
  // many more pages

  await cluster.idle();
  await cluster.close();
})();