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
                            <li><button type="button" class="button">Mayo 5</button></li>
                            <li><button type="button" class="button">Mayo 6</button></li>
                            <li><button type="button" class="button">Mayo 7</button></li>
                        </ul>
                    </div>
                    <div id="schedule">
                        <h3>Horarios disponibles</h3>
                        <ul class="movie-schedule">
                            <li>
                                <button type="button" class="button">
                                    <span>8:00 PM</span>-<span>Sala 1</span>
                                </button>
                            </li>
                            <li>
                                <button type="button" class="button">
                                    <span>7:00 PM</span>-<span>Sala 2</span>
                                </button>
                            </li>
                            <li>
                                <button type="button" class="button">
                                    <span>9:00 PM</span>-<span>Sala 3</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div id="purchase-tickets">
                        <h3>Compra de tickets</h3>
                        <table>
                            <tr>
                                <th>Precio unitario</th>
                                <th>Cantidad</th>
                                <th>IVA</th>
                                <th>Total</th>
                            </tr>
                            <tr>
                                <td id="ticket">USD$ ${ticket}</td>
                                <td>
                                    <div class="quantity">
                                        <button type="button" class="button" onclick="decrease()">-</button>
                                        <input type="number" readonly min="1" value="1">
                                        <button type="button" class="button" onclick="increase()">+</button>
                                    </div>
                                </td>
                                <td id="iva">USD$ ${calculateIVA()}</td>
                                <td id="total">USD$ ${calculateTotal()}</td>
                            </tr>
                        </table>
                    </div>
                </main>
            </div>
        </section>
    `
}

export const increaseTicketQuantity = () => {
    const input = document.querySelector('.quantity input')
    const value =  Number(input.value) + 1
    input.value = value

    const iva = calculateIVA()
    const total = calculateTotal()
    document.querySelector('#purchase-tickets #iva').textContent = `USD$ ${iva}`
    document.querySelector('#purchase-tickets #total').textContent = `USD$ ${total}`
}

export const decreaseTicketQuantity = () => {
    const input = document.querySelector('.quantity input')
    let value =  Number(input.value)
    value === 1 ? value = 1 : value -= 1
    input.value = value

    const iva = calculateIVA()
    const total = calculateTotal()
    document.querySelector('#purchase-tickets #iva').textContent = `USD$ ${iva}`
    document.querySelector('#purchase-tickets #total').textContent = `USD$ ${total}`
}

export const calculateIVA = () => {
    const { ticket } = JSON.parse(sessionStorage.getItem('user'))
    const input = document.querySelector('.quantity input')
    const value = input ? Number(input.value) : 1
    return Math.round(((ticket * value * 0.16) + Number.EPSILON) * 100) / 100
}

export const calculateTotal = () => {
    const { ticket } = JSON.parse(sessionStorage.getItem('user'))
    const input = document.querySelector('.quantity input')
    const value = input ? Number(input.value) : 1
    return Math.round(((ticket * value * 1.16) + Number.EPSILON) * 100) / 100
}