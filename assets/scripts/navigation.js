import movies from '../../movies.json' assert { type: 'json' }
import { renderStars, renderClasification } from './miscellaneous.js'

export const goToHome = () => {
    const slides = movies.toSorted(() => Math.random() - 0.5).slice(0, 3)
    const previews = movies.toSorted(() => Math.random() - 0.5).slice(0, 5)

    const main = document.querySelector('#main')
    main.removeAttribute('page', 'movie-details')
    main.innerHTML = `
        <section>
            <div id="carousel" class="carousel slide carousel-fade" data-bs-ride="carousel">
                <div class="carousel-inner">
                    ${slides.map((movie, index) => {
                        return `
                        <div class="carousel-item${index === 0 ? ' active' : ''}">
                            <img src="${movie.banner}"
                                class="d-block w-100" alt="...">
                            <div class="carousel-caption d-none d-md-flex">
                                <img src="${movie.cover}" alt="${movie.title}">
                                <div>
                                    <h2>${movie.title}</h2>
                                    <h3>${movie.originalTitle || ''}</h3>
                                    <button class="button">
                                        Mira el trailer
                                        <i class="ph-duotone ph-play-circle"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        `
                    }).join('')}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Anterior</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Siguiente</span>
                </button>
            </div>
        </section>

        <section>
            ${previews.map(movie => {
                return `
                    <figure class="movie" onclick="renderMovieDetails(${movie.id})">
                        <img src="${movie.cover}" alt="${movie.title}">
                        <section>
                            <p>${movie.title}</p>
                            <p class="subtitle">${movie.genre.join('/')}</p>
                            <p class="subtitle">Clasificacion: <span class="${renderClasification(movie.clasification)}">${movie.clasification}</span></p>
                            <!-- <div class="rating">${renderStars(movie.rating)}</div> -->
                        </section>
                    </figure>
                `
            }).join('')}
        </section>
    `

    window.scrollTo(0,0)
}

export const goToMovies = () => {
    const main = document.querySelector('#main')
    main.removeAttribute('page', 'movie-details')
    main.innerHTML = `
        <section class="main-header">
            <i class="ph-duotone ph-film-reel"></i>
            <h2>Peliculas</h2>
        </section>
        <section>
            ${movies.map(movie => {
                return `
                    <figure class="movie" onclick="renderMovieDetails(${movie.id})">
                        <img src="${movie.cover}" alt="${movie.title}">
                        <section>
                            <p>${movie.title}</p>
                            <p class="subtitle">${movie.genre.join('/')}</p>
                            <p class="subtitle">Clasificacion: <span class="${renderClasification(movie.clasification)}">${movie.clasification}</span></p>
                            <!-- <div class="rating">${renderStars(movie.rating)}</div> -->
                        </section>
                    </figure>
                `
            }).join('')}
        </section>
    `

    window.scrollTo(0,0)
}