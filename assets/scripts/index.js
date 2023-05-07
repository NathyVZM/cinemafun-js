import { showDialog, closeDialog, saveUser, updateUser } from "./mainDialog.js"
import { renderHeader, renderSidebar, renderCarousel, renderMoviesPreviews, renderFooter } from "./renderHome.js"
import { goToHome, goToMovies } from "./navigation.js"
import { showMovieDetails } from "./movieDetails.js"

window.showDialog = showDialog
window.closeDialog = closeDialog
window.goToHome = goToHome
window.goToMovies = goToMovies
window.showMovieDetails = showMovieDetails

window.onload = () => {
    const user = JSON.parse(sessionStorage.getItem('user'))

    if (user) {
        // renderHeader()
        // renderSidebar()
        // renderCarousel()
        // renderMoviesPreviews()
        // renderFooter()

        document.querySelector('#dialog-button').addEventListener('click', updateUser)
    } else {
        showDialog(false)
        document.querySelector('#dialog-button').addEventListener('click', saveUser)
    }
}