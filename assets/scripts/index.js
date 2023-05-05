import movies from '../../movies.json' assert { type: 'json' }

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

const renderHome = () => {
    const main = document.querySelector('main')
    const slides = [...movies].sort(() => Math.random() - 0.5).slice(0, 3)
    const previews = [...movies].sort(() => Math.random() - 0.5).slice(0, 5)

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
        </section>
    `
}

renderHome()