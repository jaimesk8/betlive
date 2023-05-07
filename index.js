const port = 3000;
const express = require('express');
const app = express();
const puppeteer = require('puppeteer');
const cors = require('cors');
app.use(cors())


//converter data to json como resposta á nossa aplicação
app.use(express.json());
//para obter os dados submetidos no post
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'))




//method results GET 
app.get('/betano', (req,res) => {
    
        //betano
    async function getText(){
        browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        // Reset the viewport for more results in single page of google maps.
        await page.setViewport({ width: 500, height: 3000 });
        //launch URL
        await page.goto('https://www.betano.pt/sport/futebol/portugal/primeira-liga/17083/');
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
    
       // await page.waitForTimeout(4000);

       // const array = quotess.concat(quotes);
        //const data = JSON.stringify(array); 
        res.json(quotes);
    
        // Close the browser
        await browser.close();
        
    }

    getText();

});


app.get('/betclic', (res,req) => {

    //BETCLIC
    async function getText1(){
        browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        // Reset the viewport for more results in single page of google maps.
        await page.setViewport({ width: 500, height: 3000 });

        await page.goto('https://www.betclic.pt/futebol-s1/portugal-primeira-liga-c32');
            
        // Get page data
        const quotess = await page.evaluate(() => {
            // Fetch the first element with class "quote"
            // Get the displayed text and returns it
            const quoteListt = document.querySelectorAll(".cardEvent");

            // Convert the quoteList to an iterable array
            // For each quote fetch the text and author
            return Array.from(quoteListt).map((quote) => {
            // Fetch the sub-elements from the previously fetched quote element
            // Get the displayed text and return it (`.innerText`)
            //const info = quote.querySelector(".breadcrumb_itemLabel").innerText.replace('\n',' ');
            const team = quote.querySelector(".market_odds").innerText.replaceAll('\n',' '); 
            //const time = quote.querySelector(".scoreboard_hour").textContent.trim();
            
        // const draw = quote.querySelector(".oddValue").textContent;

            return {team};
            });
        });

        // Display the quotes
        console.log("Betclic", quotess)
   
    }

    getText1();
})
app.listen(port, () => console.log('Server running at http://127.0.0.1:3000/'));
