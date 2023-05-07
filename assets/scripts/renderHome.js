import movies from '../../movies.json' assert { type: 'json' }
import { renderStars, renderClasification } from './miscellaneous.js'

export const renderHeader = () => {
    const script = document.querySelector('body script')
    script.insertAdjacentHTML('beforebegin', `
        <!-- header -->
       <header id="header">
            <div>
                <i class="ph-duotone ph-film-slate"></i>
                <h1 class="logo">CINEMAFUN</h1>
            </div>
            <div class="form-input">
                <i class="ph-duotone ph-magnifying-glass"></i>
                <input type="search" name="search" id="search" placeholder="Buscar peliculas...">
            </div>
       </header>
    `)
}

export const renderSidebar = () => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    const script = document.querySelector('body script')
    script.insertAdjacentHTML('beforebegin', `
        <!-- aside -->
        <aside>
            <section class="info-panel">
                <div id="first">
                    <i class="ph-duotone ph-user"></i>
                    <div>
                        <p>${user?.name}</p>
                        <p>${user?.email}</p>
                    </div>
                </div>
                <div id="second">
                    <div>
                        <p>Monto del boleto</p>
                        <p>
                            <i class="ph-duotone ph-ticket"></i>
                            USD$ <span>${user?.ticket}</span>
                        </p>
                    </div>
                    <div>
                        <button type="button" class="button" onclick="showDialog()"><i class="ph-duotone ph-pencil-simple"></i></button>
                    </div>
                </div>
            </section>
            <ul>
                <li onclick="goToHome()">
                    <i class="ph-duotone ph-house"></i>
                    <span>Inicio</span>
                </li>
                <li onclick="goToMovies()">
                    <i class="ph-duotone ph-film-reel"></i>
                    <span>Peliculas</span>
                </li>
                <li>
                    <i class="ph-duotone ph-popcorn"></i>
                    <span>Proximos estrenos</span>
                </li>
                <li>
                    <i class="ph-duotone ph-users"></i>
                    <span>Sobre nosotros</span>
                </li>
            </ul>
        </aside>
    `)
}

export const renderCarousel = () => {
    const slides = movies.toSorted(() => Math.random() - 0.5).slice(0, 3)

    const script = document.querySelector('body script')
    script.insertAdjacentHTML('beforebegin', `
        <!-- main -->
        <main id="main">
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
        </main>
    `)
}

export const renderMoviesPreviews = () => {
    const main = document.querySelector('#main')
    const previews = movies.toSorted(() => Math.random() - 0.5).slice(0, 5)

    main.innerHTML += `
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
}

export const renderFooter = () => {
    const script = document.querySelector('body script')
    script.insertAdjacentHTML('beforebegin', `
        <!-- footer -->
        <footer id="footer">
            <section>
                <i class="ph-duotone ph-film-slate"></i>
                <h2 class="logo">CINEMAFUN</h2>
            </section>
            <section>
                <a href="https://github.com/NathyVZM" target="_blank">
                    <i class="ph-duotone ph-github-logo"></i>
                </a>
                <a href="https://www.instagram.com/nathievzm/" target="_blank">
                    <i class="ph-duotone ph-instagram-logo"></i>
                </a>
                <a href="https://www.linkedin.com/in/nathalie-zambrano-571997230/" target="_blank">
                    <i class="ph-duotone ph-linkedin-logo"></i>
                </a>
            </section>
            <section>
                <small>&copy; Copyright 2023. CINEMAFUN - Nathalie Zambrano</small>
                <small>Todos los derechos reservados</small>
            </section>
        </footer>
    `)
}