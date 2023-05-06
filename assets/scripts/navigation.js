import movies from '../../movies.json' assert { type: 'json' }
import { renderCarousel, renderMoviesPreviews } from './renderHome.js'

const renderStars = rating => {
    const fullStar = '<i class="ph-fill ph-star"></i>'
    const halfStar = '<i class="ph-fill ph-star-half"></i>'
    const emptyStar = '<i class="ph ph-star"></i>'
    let result = ''

    const ratingFiveScale = 5 * rating / 10
    const numStars = Math.round(ratingFiveScale * 2) / 2

    for (let index = 0; index < 5; index++) {
        if (index < Math.floor(numStars)) result += fullStar
        else if (index === Math.floor(numStars) && numStars % 1 !== 0) result += halfStar
        else result += emptyStar
    }

    return result
}

const renderClasification = clasification => {
    let color = ''

    if (clasification === 'A' || clasification === 'PG' || clasification === '12') color = 'friendly'
    else if (clasification === 'PG-13' || clasification === '16') color = 'teen'
    else color = 'adult'

    return color
}

export const goToHome = () => {
    renderCarousel()
    renderMoviesPreviews()
}

export const goToMovies = () => {
    const main = document.querySelector('#main')
    main.innerHTML = `
        ${movies.map(movie => {
            return `
                <figure class="movie">
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
    `
}