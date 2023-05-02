const tableBody = document.getElementById("data-output") //getelement by id

const getBet = () => {
    fetch('http://127.0.0.1:3000/get')
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        betDist(data)
    })
    .catch(err => console.error(err));
}

getBet();

const betDist = (data) => {
    console.log(data)
    for (const flight of data) {
        const tableRow = document.createElement('tr')
        const tableIcon = document.createElement('td')
        tableIcon.textContent = "✈"
        tableRow.append(tableIcon)

        const flightDetails = {
            team: flight.team,
            time: flight.time,
            teamA: flight.teamA
        }

        for (const flightDetail in flightDetails) {
            const tableCell = document.createElement('td')
            const word = Array.from(flightDetails[flightDetail]);

            for (const [index, letter] of word.entries()) {
                const letterElement = document.createElement('div')

                setTimeout(() => {
                    letterElement.classList.add('flip')
                    letterElement.textContent = letter
                    tableCell.append(letterElement)
                }, 100 * index)
            }
            tableRow.append(tableCell)
        }
        tableBody.append(tableRow)
    }

}