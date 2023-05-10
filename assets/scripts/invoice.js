import movies from '../../movies.json' assert { type: 'json' }

export const renderInvoice = () => {
  const main = document.querySelector('#main')
  main.setAttribute('page', 'invoice')

  const user = JSON.parse(sessionStorage.getItem('user'))
  const movieInfo = JSON.parse(sessionStorage.getItem('movie'))
  const movie = movies.find(m => m.id === movieInfo.movieId)
  const invoice = JSON.parse(sessionStorage.getItem('invoice'))

  main.innerHTML = `
    <header id="invoice-header">
      <div>
          <i class="ph-duotone ph-check-circle"></i>
          <h2>¡Tu pago ha sido completado!</h2>
      </div>
      <button type="button" class="button" onclick="printInvoice('${movie.title}')">
          Descargar
          <i class="ph-duotone ph-file-arrow-down"></i>
      </button>
    </header>

    <div id="invoice">
      <header>
          <section id="first">
              <div>
                  <h2>${movie.title}</h2>
                  <div>
                      <p>Factura</p>
                      <p>#1-0000</p>
                  </div>
                  <div>
                      <p>Fecha</p>
                      <p>${new Date().toLocaleString('es', { 'day': 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                  <div>
                      <p>Monto total</p>
                      <p>${movieInfo.total} USD</p>
                  </div>
              </div>
              <div>
                  <h3>${invoice.name}</h3>
                  <p>${invoice.address}</p>
                  <p>${invoice.email}</p>
                  <p>${invoice.phone}</p>
              </div>
          </section>
          <section id="second">
              <i class="ph-duotone ph-film-slate"></i>
              <h2 class="logo">CINEMAFUN</h2>
          </section>
      </header>

      <section>
          <h4>Información personal</h3>
              <table>
                  <tr>
                      <td>Nombre</td>
                      <td>${invoice.name}</td>
                  </tr>
                  <tr>
                      <td>Cédula de Identidad</td>
                      <td>${invoice.userId}</td>
                  </tr>
                  <tr>
                      <td>Correo electrónico</td>
                      <td>${invoice.email}</td>
                  </tr>
                  <tr>
                      <td>Teléfono</td>
                      <td>${invoice.phone}</td>
                  </tr>
                  <tr>
                      <td>Dirección</td>
                      <td>${invoice.address}</td>
                  </tr>
              </table>
      </section>

      <section>
          <h4>Información de la compra</h3>
              <table>
                  <tr>
                      <td>Película</td>
                      <td>${movie.title}</td>
                  </tr>
                  <tr>
                      <td>Fecha</td>
                      <td>${movieInfo.day}</td>
                  </tr>
                  <tr>
                      <td>Hora</td>
                      <td>${movieInfo.hour}</td>
                  </tr>
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
      </section>

      <footer>
          <h4>TOTAL</h4>
          <h4>${movieInfo.total} USD</h4>
      </footer>
    </div>
  `

  window.scrollTo(0, 0)
}


export const printInvoice = movieTitle => {
  const invoiceContainer = document.querySelector('#invoice')
  const lights = document.querySelector('#lights')
  const clonedContainer = invoiceContainer.cloneNode(true)

  const printWindow = window.open('', '_blank')
  printWindow.document.open()

  printWindow.document.write(`
      <html>
      <head>
        <title>Factura - ${movieTitle} - CINEMAFUN</title>
            <link rel="icon" href="favicon.svg" sizes="16x16">

            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link
                href="https://fonts.googleapis.com/css2?family=Hind:wght@300;400;500;600;700&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
                rel="stylesheet">

            <!-- Bootstrap -->
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">

            <!-- Phosphor -->
            <script src="https://unpkg.com/@phosphor-icons/web"></script>

            <!-- Styles -->
            <link rel="stylesheet" href="assets/styles/theme.css">
            <link rel="stylesheet" href="assets/styles/styles.css">
            <link rel="stylesheet" href="assets/styles/seats.css">
            <link rel="stylesheet" href="assets/styles/invoice-form.css">
            <link rel="stylesheet" href="assets/styles/invoice.css">

            <style>
                /* Estilos adicionales para el documento de impresión */
                /* Puedes personalizar los estilos según tus necesidades */
                @media print {
                    /* Eliminar los márgenes en el documento de impresión */
                    @page {
                        margin: 0;
                    }
                    
                    /* Ajustar el tamaño del contenedor de la factura */
                    #invoice {
                        width: 100%;
                        height: 100%;
                        gap: 3vmax;
                    }

                    #invoice #first > div h2 {
                      font-size: 1.4em;
                    }
                  
                    #invoice #first > div:last-child h3 {
                      font-size: 1.2em;
                    }

                    #invoice > section > h4 {
                      font-size: 1.1em;
                    }
                }
      </style>
      </head>
      <body>
        ${lights.outerHTML}
        ${clonedContainer.outerHTML}
      </body>
      </html>
    `)

  printWindow.document.close()

  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print()
      printWindow.close()
    }, 10)
  }
}


