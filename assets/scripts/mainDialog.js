import { renderHeader, renderSidebar, renderCarousel, renderMoviesPreviews, renderFooter } from "./renderHome.js"

export const showDialog = (edit=true) => {
    let title = ''
    let subtitle = ''
    let button = ''

    if (edit) {
        title = 'Editar datos'
        subtitle = 'Actualiza o corrige tu informacion'
        button = 'Editar'

        const user = JSON.parse(sessionStorage.getItem('user'))
        const inputs = document.querySelectorAll('#dialog > form input')
        for (const input of inputs) input.value = user[input.getAttribute('name')]
    } else {
        title = 'Bienvenid@!'
        subtitle = 'Introduce tu nombre y el monto del boleto para continuar'
        button = 'Ingresar'
    }

    document.querySelector('#dialog-title').textContent = title
    document.querySelector('#dialog-subtitle').textContent = subtitle
    document.querySelector('#dialog-button').textContent = button

    const dialog = document.querySelector('#dialog')
    dialog.setAttribute('edit', edit)
    dialog.open = true
}

export const closeDialog = () => {
    const dialog = document.querySelector('#dialog')
    dialog.open = false

    const inputs = document.querySelectorAll('#dialog > form input')
    for (const input of inputs) input.value = ''
}

export const saveUser = () => {
    const data = document.querySelector('#dialog > form')
    const form = new FormData(data)

    const user = {
        name: form.get('name'),
        email: form.get('email'),
        ticket: form.get('ticket')
    }

    sessionStorage.setItem('user', JSON.stringify(user))
    closeDialog()
    const dialog = document.querySelector('dialog')

    setTimeout(() => {
        dialog.setAttribute('edit', true)
        document.querySelector('#dialog-button').addEventListener('click', updateUser)

        renderHeader()
        renderSidebar()
        renderCarousel()
        renderMoviesPreviews()
        renderFooter()
    }, 300)
}

export const updateUser = () => {
    const data = document.querySelector('#dialog > form')
    const form = new FormData(data)

    const user = {
        name: form.get('name'),
        email: form.get('email'),
        ticket: form.get('ticket')
    }

    sessionStorage.setItem('user', JSON.stringify(user))
    closeDialog()

    const name = document.querySelector('aside #first p:first-child')
    const email = document.querySelector('aside #first p:last-child')
    const ticket = document.querySelector('aside #second p span')

    name.textContent = user.name
    email.textContent = user.email
    ticket.textContent = user.ticket
}