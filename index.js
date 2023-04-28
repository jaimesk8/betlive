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
//app.get('/get', (req,res) => {

    //Puppeteer library
const pt= require('puppeteer')
   
    async function getText(){
        browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        // Reset the viewport for more results in single page of google maps.
        await page.setViewport({ width: 500, height: 3000 })
        //launch URL
        await page.goto('https://www.betano.pt/sport/futebol/portugal/primeira-liga/17083/')
        await page.waitForSelector('.landing-page-modal__primary-container__box')
        await page.click('#landing-page-modal')
        
        //team: el.querySelector(".GTM-event-link"),
       // teamB: el.querySelector(".")?.textContent.trim(),
       // time: el.querySelector(".MW4etd"),
       // hour: el.querySelector(".tw-mr-0")?.textContent.trim(),
        //tittle: el.querySelector(".selections__selection__title"),
       // odd: el.querySelector(".selections__selection__odd"),
       // Scrapes the data from the page and them to de databases
        // Scrooll to the finla page

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
            const team = quote.querySelector(".GTM-event-link").innerText;
            const time = quote.querySelector(".events-list__grid__info__datetime").innerText;
           // const tittle = quote.querySelector(".selections__selection").innerText;
            const odd = quote.querySelector(".events-list__grid__event")

            return { team, time, odd };
            });
        });

        // Display the quotes
        console.log("Betano", quotes);
    
        // Close the browser
        await browser.close();
    }
    
    getText()

    async function getText1(){
        browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        // Reset the viewport for more results in single page of google maps.
        await page.setViewport({ width: 1000, height: 3000 })
        //launch URL
        await page.goto('https://www.betclic.pt/futebol-s1/portugal-primeira-liga-c32')
        
        //team: el.querySelector(".GTM-event-link"),
       // teamB: el.querySelector(".")?.textContent.trim(),
       // time: el.querySelector(".MW4etd"),
       // hour: el.querySelector(".tw-mr-0")?.textContent.trim(),
        //tittle: el.querySelector(".selections__selection__title"),
       // odd: el.querySelector(".selections__selection__odd"),
       // Scrapes the data from the page and them to de databases
        // Scrooll to the finla page

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
            const team = quote.querySelector(".scoreboard_contestantLabel");
            const time = quote.querySelector(".events-scoreboard_info");
           // const tittle = quote.querySelector(".selections__selection").innerText;
            const odd = quote.querySelector(".oddValue")

            return { team, time, odd };
            });
        });

        // Display the quotes
        console.log("Betclic", quotess);
    
        // Close the browser
        await browser.close();
    }

    getText1()

//});//results get


app.listen(port, () => console.log('Server running at http://127.0.0.1:3000/'));
