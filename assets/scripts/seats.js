import movies from '../../movies.json' assert { type: 'json' }
import { renderInvoiceForm } from './invoice-form.js'

const labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O']

export const createSeats = () => {
    const seats = Array(16).fill('<i class="ph-duotone ph-armchair"></i>').map(() => Array(25).fill('<i class="ph-duotone ph-armchair"></i>'))

    seats[0][0] = ''

    for (let i = 1; i < 25; i++) {
        seats[0][i] = i
    }

    let j = 0
    for (let i = 1; i < 16; i++) {
        seats[i][0] = labels[j]
        j++
    }

    return seats
}

export const renderSeatsPage = () => {
    const movieInfo = JSON.parse(sessionStorage.getItem('movie'))
    const movie = movies.find(m => m.id === movieInfo.movieId)

    const main = document.querySelector('#main')
    main.setAttribute('page', 'seats')

    main.innerHTML = `
        <header id="seats-header">
            <section>
                <h2>${movie.title}</h2>
                <p>${movieInfo.tickets} asientos</p>
            </section>
            <section>
                <div>
                    <i class="ph-duotone ph-calendar-blank"></i>
                </div>
                <div>
                    <p>${movieInfo.hour}</p>
                    <p>${movieInfo.day}</p>
                </div>
            </section>
        </header>

        <div id="seats-content" class="arc">
            <section>
                <h3>Sala ${movieInfo.theater}</h3>
                <ul id="selected-seats"></ul>
            </section>
        </div>

        <footer id="seats-footer">
            <section>
                <div class="available">
                    <i class="ph-duotone ph-armchair"></i>
                    <p>Disponible</p>
                </div>
                <div class="selected">
                    <i class="ph-duotone ph-armchair"></i>
                    <p>Seleccionado</p>
                </div>
            </section>
            <button type="button" class="button" onclick="continueWithSeats()">
                Continuar
                <i class="ph-duotone ph-caret-right"></i>
            </button>
        </footer>
    `

    sessionStorage.setItem('seatsAmount', movieInfo.tickets)
}

export const renderSeats = () => {
    const seats = createSeats()
    const main = document.querySelector('#seats-content')

    const table = document.createElement('table')

    for (let i = 0; i < 16; i++) {
        const row = document.createElement('tr')
        for (let j = 0; j < 25; j++) {
            if ((i === 0) || (j === 0)) {
                row.insertAdjacentHTML('beforeend', `
                    <th>${seats[i][j]}</th>
                `)
            }
            else {
                row.insertAdjacentHTML('beforeend', `
                    <td selected="false" seat-number="${labels[i - 1]}${j}" onclick="selectSeat('${labels[i - 1]}${j}')">
                        <i class="ph-duotone ph-armchair"></i>
                    </td>
                `)
            }
        }

        table.appendChild(row)
    }

    main.appendChild(table)
    window.scrollTo(0, 0)
}

export const selectSeat = seat => {
    let seatsAmount = sessionStorage.getItem('seatsAmount')
    const seatButton = document.querySelector(`#seats-content table td[seat-number="${seat}"]`)

    const selectedSeats = document.querySelector('#selected-seats')
    const foundSeat = document.querySelector(`#selected-seats li[seat="${seat}"]`)

    if (foundSeat) {
        seatButton.setAttribute('selected', false)
        selectedSeats.removeChild(foundSeat)
        seatsAmount++
    }
    else if (seatsAmount > 0) {
        seatButton.setAttribute('selected', true)
        const li = document.createElement('li')
        li.textContent = seatButton.getAttribute('seat-number')
        li.classList.add('seat')
        li.setAttribute('seat', seat)
        selectedSeats.appendChild(li)
        seatsAmount--
    }

    if (seatsAmount === 0) {
        window.scrollTo(0, 600)
    }

    sessionStorage.setItem('seatsAmount', seatsAmount)
}

export const continueWithSeats = () => {
    const movie = JSON.parse(sessionStorage.getItem('movie'))
    const selectedSeats = document.querySelectorAll('#selected-seats li')
    const seats = Array(selectedSeats.length)
    selectedSeats.forEach((seat, i) => seats[i] = seat.textContent)

    const updatedMovie = { ...movie, seats: seats }
    sessionStorage.setItem('movie', JSON.stringify(updatedMovie))

    renderInvoiceForm()
}