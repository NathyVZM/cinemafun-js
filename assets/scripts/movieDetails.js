import movies from '../../movies.json' assert { type: 'json' }
import { renderClasification } from './miscellaneous.js'

export const renderMovieDetails = (movieId) =>  {
    const movie = movies.find(m => m.id === movieId)
    const { ticket } = JSON.parse(sessionStorage.getItem('user'))

    const main = document.querySelector('#main')
    main.setAttribute('page', 'movie-details')
    main.innerHTML = `
        <section>
            <img src="${movie.banner}" alt="${movie.title}">
        </section>
        <section>
            <div id="movie-first">
                <img src="${movie.cover}" alt="${movie.title}">
                <div>
                    <h3>Reparto</h3>
                    <ul>
                        ${movie.cast.map(c => `
                            <li>
                                <img src="${c.photo}" alt="${c.name}">
                                <div>
                                    <p>${c.name}</p>
                                    <p>como ${c.role}</p>
                                </div>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
            <div id="movie-second">
                <header>
                    <h2>${movie.title}</h2>
                    <h3>Titulo original: ${movie.originalTitle}</h3>
                    <a href="#available-days" class="button">
                        Ver funciones
                        <i class="ph-duotone ph-film-strip"></i>
                    </a>
                </header>

                <main>
                    <div>
                        <p>${movie.plot}</p>
                    </div>
                    <div>
                        <h3>Detalles</h3>
                        <table class="movie-info-table">
                            <tr>
                                <th>Generos</th>
                                ${movie.genre.map(genre => `
                                    <td><span class="genre">${genre}</span></td>
                                `).join('')}
                                <td></td>
                            </tr>
                            <tr>
                                <th>Clasificacion</th>
                                <td class="${renderClasification(movie.clasification)}">${movie.clasification}</td>
                            </tr>
                            <tr>
                                <th>Duracion</th>
                                <td>${movie.duration}</td>
                            </tr>
                        </table>
                    </div>
                    <div id="available-days">
                        <h3>Funciones disponibles</h3>
                        <ul class="movie-schedule">
                            <li><button type="button" class="button" onclick="selectDay('Mayo 5')" data="Mayo 5">Mayo 5</button></li>
                            <li><button type="button" class="button" onclick="selectDay('Mayo 6')" data="Mayo 6">Mayo 6</button></li>
                            <li><button type="button" class="button" onclick="selectDay('Mayo 7')" data="Mayo 7">Mayo 7</button></li>
                        </ul>
                    </div>
                    <div id="schedule" selected-day="false">
                        <h3>Horarios disponibles</h3>
                        <ul class="movie-schedule">
                            <li>
                                <button type="button" class="button" onclick="selectHour('8:00 PM', 'Sala 1')" data="8:00 PM-Sala 1">
                                    <span>8:00 PM</span>-<span>Sala 1</span>
                                </button>
                            </li>
                            <li>
                                <button type="button" class="button" onclick="selectHour('7:00 PM', 'Sala 2')" data="7:00 PM-Sala 2">
                                    <span>7:00 PM</span>-<span>Sala 2</span>
                                </button>
                            </li>
                            <li>
                                <button type="button" class="button" onclick="selectHour('9:00 PM', 'Sala 3')" data="9:00 PM-Sala 3">
                                    <span>9:00 PM</span>-<span>Sala 3</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div id="purchase-tickets" selected-hour="false">
                        <h3>Compra de tickets</h3>
                        <table>
                            <tr>
                                <th>Precio unitario</th>
                                <th>Cantidad</th>
                                <th>Total</th>
                            </tr>
                            <tr>
                                <td id="ticket">USD$ ${ticket}</td>
                                <td>
                                    <div class="quantity">
                                        <button type="button" class="button" onclick="decrease()">-</button>
                                        <input type="number" readonly min="1" value="1" oninput="saveAmount()">
                                        <button type="button" class="button" onclick="increase()">+</button>
                                    </div>
                                </td>
                                <td id="total">USD$ ${calculateTotal()}</td>
                            </tr>
                        </table>
                    </div>
                    <div id="continue-purchase" selected-hour="false">
                        <button type="button" class="button" onclick="continuePurchase()">
                            Continuar
                            <i class="ph-duotone ph-caret-right"></i>
                        </button>
                    </div>
                </main>
            </div>
        </section>
    `

    window.scrollTo(0, 0)
}

export const increaseTicketQuantity = () => {
    const input = document.querySelector('.quantity input')
    const value =  Number(input.value) + 1
    input.value = value

    const total = calculateTotal()
    document.querySelector('#purchase-tickets #total').textContent = `USD$ ${total}`
}

export const decreaseTicketQuantity = () => {
    const input = document.querySelector('.quantity input')
    let value =  Number(input.value)
    value === 1 ? value = 1 : value -= 1
    input.value = value

    const total = calculateTotal()
    document.querySelector('#purchase-tickets #total').textContent = `USD$ ${total}`
}

export const calculateTotal = () => {
    const { ticket } = JSON.parse(sessionStorage.getItem('user'))
    const input = document.querySelector('.quantity input')
    const value = input ? Number(input.value) : 1
    return Math.round(((ticket * value) + Number.EPSILON) * 100) / 100
}

export const selectDay = day => {
    const buttons = document.querySelectorAll('#available-days .button')
    buttons.forEach(button => button.setAttribute('selected', false))

    document.querySelector(`#available-days .button[data="${day}"]`).setAttribute('selected', true)
    document.querySelector('#movie-second #schedule').setAttribute('selected-day', true)
}

export const selectHour = (hour, room) => {
    const buttons = document.querySelectorAll('#schedule .button')
    buttons.forEach(button => button.setAttribute('selected', false))

    document.querySelector(`#schedule .button[data="${hour}-${room}"]`).setAttribute('selected', true)
    document.querySelector('#movie-second #purchase-tickets').setAttribute('selected-hour', true)
    document.querySelector('#movie-second #continue-purchase').setAttribute('selected-hour', true)
}

export const continuePurchase = () => {
    const buttons = document.querySelectorAll('#movie-second .button[selected="true"]')
    const ticketsQuantity = document.querySelector('.quantity input').value
    const total = document.querySelector('#purchase-tickets #total').textContent

    const movie = {
        day: buttons[0].textContent,
        hour: buttons[1].getAttribute('data').split('-')[0],
        room: buttons[1].getAttribute('data').split('-')[1],
        tickets: Number(ticketsQuantity),
        total: Number(total.substring(5))
    }

    sessionStorage.setItem('movie', JSON.stringify(movie))
}