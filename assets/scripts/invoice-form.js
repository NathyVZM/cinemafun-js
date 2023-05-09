import movies from '../../movies.json' assert { type: 'json' }

export const renderInvoiceForm = () => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    const movieInfo = JSON.parse(sessionStorage.getItem('movie'))
    const movie = movies.find(m => m.id === movieInfo.movieId)

    const main = document.querySelector('#main')
    main.setAttribute('page', 'invoice-form')
    main.innerHTML = `
        <header>
            <i class="ph-duotone ph-credit-card"></i>
            <h2>Ingresa tus datos para pagar</h2>
        </header>

        <section>
            <form id="invoice-form">
                <section>
                    <label for="name">Nombre completo</label>
                    <div class="form-input">
                        <i class="ph-duotone ph-user"></i>
                        <input type="text" name="name" id="name" placeholder="Jane Doe" value="${user.name}">
                    </div>
                </section>

                <section>
                    <label for="user-id">Cedula de Identidad</label>
                    <div class="form-input">
                        <i class="ph-duotone ph-identification-card"></i>
                        <input type="text" name="user-id" id="user-id" placeholder="XX.XXX.XXX">
                    </div>
                </section>

                <section>
                    <label for="email">Correo electronico</label>
                    <div class="form-input">
                        <i class="ph-duotone ph-envelope-simple"></i>
                        <input type="email" name="email" id="email" placeholder="janedoe@gmail.com" value="${user.email}">
                    </div>
                </section>

                <section>
                    <label for="phone">Telefono</label>
                    <div class="form-input">
                        <i class="ph-duotone ph-phone"></i>
                        <input type="tel" name="phone" id="phone" placeholder="+58 000 000 0000">
                    </div>
                </section>

                <section>
                    <label for="address">Direccion</label>
                    <div class="form-input">
                        <i class="ph-duotone ph-list"></i>
                        <textarea name="address" id="address" placeholder="Ingresa tu direccion"></textarea>
                    </div>
                </section>

                <footer>
                    <button type="button" class="button" onclick="saveInvoice()">Pagar</button>
                </footer>
            </form>
            <div id="invoice-movie">
                <div>
                    <div>
                        <h3>${movie.title}</h3>
                        <p>${movieInfo.day}; ${movieInfo.hour}</p>
                    </div>
                    <table>
                        <tr>
                            <td>Sala</td>
                            <td>${movieInfo.theater}</td>
                        </tr>
                        <tr>
                            <td>Boletos</td>
                            <td>${movieInfo.tickets}</td>
                        </tr>
                        <tr>
                            <td>Asientos</td>
                            <td>${movieInfo.seats.join(', ')}</td>
                        </tr>
                        <tr>
                            <td>Precio Unitario</td>
                            <td>${user.ticket} USD</td>
                        </tr>
                    </table>
                    <div>
                        <h4>TOTAL</h4>
                        <h4>${movieInfo.total} USD</h4>
                    </div>
                </div>
                <img src="${movie.cover}" alt="${movie.title}">
            </div>
        </section>
    `

    window.scrollTo(0, 0)
}

export const saveInvoice = () => {
    const data = document.querySelector('#invoice-form')
    const form = new FormData(data)

    const invoice = {
        name: form.get('name'),
        userId: form.get('user-id'),
        email: form.get('email'),
        phone: form.get('phone'),
        address: form.get('address')
    }

    sessionStorage.setItem('invoice', JSON.stringify(invoice))

    console.log(invoice)
}