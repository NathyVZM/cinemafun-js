import { showDialog, closeDialog, saveUser, updateUser } from "./mainDialog.js"
import { renderHeader, renderSidebar, renderCarousel, renderMoviesPreviews, renderFooter } from "./renderHome.js"
import { goToHome, goToMovies } from "./navigation.js"
import { renderMovieDetails, increaseTicketQuantity, decreaseTicketQuantity, selectDay, selectHour, continuePurchase } from "./movieDetails.js"
import { generateSchedules } from "./generateSchedules.js"

window.showDialog = showDialog
window.closeDialog = closeDialog
window.saveUser = saveUser
window.updateUser = updateUser
window.goToHome = goToHome
window.goToMovies = goToMovies
window.renderMovieDetails = renderMovieDetails
window.increase = increaseTicketQuantity
window.decrease = decreaseTicketQuantity
window.selectDay = selectDay
window.selectHour = selectHour
window.continuePurchase = continuePurchase

window.onload = () => {
    const user = JSON.parse(sessionStorage.getItem('user'))

    if (user) {
        renderHeader()
        renderSidebar()
        renderCarousel()
        renderMoviesPreviews()
        renderFooter()
    } else showDialog(false)

    const schedules = JSON.parse(sessionStorage.getItem('schedules'))

    if (!schedules) {
        const newSchedules = generateSchedules()
        sessionStorage.setItem('schedules', JSON.stringify(newSchedules))
    }
}