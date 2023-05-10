const tableBody = document.getElementById("data-output")

const getBet = () => {
    fetch('http://127.0.0.1:3000/betano')
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(quotes => {
        console.log(quotes)
        for (const flight of quotes) {
            const tableRow = document.createElement('tr')
            const tableIcon = document.createElement('td')
            tableIcon.textContent = "💎"
            tableRow.append(tableIcon)
            //flight.teamA.innerText = "Team"
    
            const flightDetails = {
                team: flight.teamA, // .innerText = "Team",
                time: flight.time,
                odd: flight.odd
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
    })
    .catch(err => console.error(err));

}

getBet();

const tableBody1 = document.getElementById("data-output1")

const getBet1 = () => {
    fetch('http://127.0.0.1:3000/betclic')
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(quotess => {
        console.log(quotess)
        for (const flight of quotess) {
            const tableRow = document.createElement('tr')
            const tableIcon = document.createElement('td')
            
            tableIcon.textContent = "Betclic";
            tableRow.appendChild(tableIcon)

            const flightDetails = {
                //team: flight.team,
                odd: flight.resultodd
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
    })
    .catch(err => console.error(err));

}

getBet1();


