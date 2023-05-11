export const renderStars = rating => {
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

export const renderClasification = clasification => {
    let color = ''

    if (clasification === 'A' || clasification === 'PG' || clasification === '12') color = 'friendly'
    else if (clasification === 'PG-13' || clasification === '16') color = 'teen'
    else color = 'adult'

    return color
}

export const openMovieTrailer = trailer => {
    const iframe = document.querySelector('iframe')
    iframe.src = trailer

    const dialog = document.querySelector('#trailer-dialog')
    dialog.open = true
}

export const closeMovieTrailer = () => {
    const iframe = document.querySelector('iframe')
    iframe.src = ''

    const dialog = document.querySelector('#trailer-dialog')
    dialog.open = false
}

export const goToTop = () => {
    if (window.location.hash) history.replaceState(null, null, window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

export const cleanFilename = filename => {
    const cleanedFilename = filename.replace(/[^\w]/g, '_');
    return cleanedFilename;
}
