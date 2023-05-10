const puppeteer = require('puppeteer');


//placard
async function getText2(){
    browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // Reset the viewport for more results in single page of google maps.
    await page.setViewport({ width: 500, height: 3000 });

    await page.goto('https://www.placard.pt/apostas/sports/soccer/competitions/soccer-pt');
        
    // Get page data
    const plac = await page.evaluate(() => {
        // Fetch the first element with class "quote"
        // Get the displayed text and returns it
        const quoteListt = document.querySelectorAll(".ta-EventList");

        // Convert the quoteList to an iterable array
        // For each quote fetch the text and author
        return Array.from(quoteListt).map((quote) => {
        // Fetch the sub-elements from the previously fetched quote element
        // Get the displayed text and return it (`.innerText`)
        //const info = quote.querySelectorAll(".ta-Button");
        const team = quote.querySelectorAll(".ta-ParticipantsName");
        const odd = quote.querySelectorAll(".ta-price_text");
        
        //const draw = quote.querySelector(".oddValue").textContent;

        return {info, team, odd};
        });
    });

     // Display the quotes
     console.log("Placard", plac);
     
      //res.json(plac);
  
      // Close the browser
      await browser.close();
}

getText2();