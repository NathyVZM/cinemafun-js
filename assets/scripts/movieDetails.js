import movies from '../../movies.json' assert { type: 'json' }

export const showMovieDetails = (movieId) =>  {
    const movie = movies.find(m => m.id === movieId)
    console.log(movie)
}