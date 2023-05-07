const tableBody = document.getElementById("data-output")
const tableBody1 = document.getElementById("data-output1") //getelement by id


const getBet = () => {
    fetch('http://127.0.0.1:3000/betano')
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(quotes => {
        betano(quotes)
    })
    .catch(err => console.error(err));

}


/*
const getBet1 = () => {
    fetch('http://127.0.0.1:3000/betclic')
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(quotess => {
        betclic(quotess)
    })
    .catch(err => console.error(err));
}*/

getBet();
//getBet1();

const betano = (quotes) => {
    console.log(quotes)
    for (const flight of quotes) {
        const tableRow = document.createElement('tr')
        const tableIcon = document.createElement('td')
        tableIcon.textContent = "✈"
        tableRow.append(tableIcon)

        const flightDetails = {
            team: flight.teamA,
            time: flight.time
            
        }

        for (const flightDetail in flightDetails) {
            const tableCell = document.createElement('td')
            const word = Array.from(flightDetails[flightDetail]);

            for (const [index, letter] of word.entries()) {
                const letterElement = document.createElement('div')
                setTimeout(() => {
                    letterElement.classList.add('flip')
                    letterElement.textContent = letter
                    tableCell.appendChild(letterElement)
                }, 100 * index)

                // Create a table data element instead of a table cell
                const tableCell = document.createElement('td')
                // Set the table data element to display as an inline-block
                tableCell.style.display = 'inline-block'
                tableRow.appendChild(tableCell)
            }
            tableRow.append(tableCell)
        }
        tableBody.append(tableRow)
    }

}

const betclic = (quotess) => {
    console.log(quotess)
    for (const flight of quotess) {
        const tableRow = document.createElement('tr')
        const tableIcon = document.createElement('td')
        tableIcon.textContent = "✈"
        tableRow.append(tableIcon)

        const flightDetails = {
            team: flight.team, 
        }

        for (const flightDetail in flightDetails) {
            const tableCell = document.createElement('td')
            const word = Array.from(flightDetails[flightDetail]);

            for (const [index, letter] of word.entries()) {
                const letterElement = document.createElement('div')
                setTimeout(() => {
                    letterElement.classList.add('flip')
                    letterElement.textContent = letter
                    tableCell.appendChild(letterElement)
                }, 100 * index)

                // Create a table data element instead of a table cell
                const tableCell = document.createElement('td')
                // Set the table data element to display as an inline-block
                tableCell.style.display = 'inline-block'
                tableRow.appendChild(tableCell)
            }
            tableRow.append(tableCell)
        }
        tableBody1.append(tableRow)
    }

}