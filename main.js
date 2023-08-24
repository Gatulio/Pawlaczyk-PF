window.addEventListener('load', async () => {
    try {
        const response = await fetch('stock.json')
        const cigarrillos = await response.json()

        const cigarrosLista = document.getElementById('productos-lista')
        let cigarrosComprados = []

        const agregarCigarro = (index, atados) => {
            let precio = cigarrillos[index].precio
            let subtotal = precio * atados

            const cigarroAgregado = document.createElement('li')
            cigarroAgregado.textContent = `Has agregado ${atados} atado de ${cigarrillos[index].marca} por un total de $${subtotal}`
            cigarrosLista.appendChild(cigarroAgregado)

            cigarrosComprados.push({ marca: cigarrillos[index].marca, atados, subtotal })

            localStorage.setItem('cigarrosComprados', JSON.stringify(cigarrosComprados))
        }

        const finalizarCompra = () => {
            let totalAtados = 0
            let valorTotal = 0
        
            for (const producto of cigarrosComprados) {
                totalAtados += producto.atados
                valorTotal += producto.subtotal
            }
        
            if (totalAtados === 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'No elegiste!',
                    text: 'No agregaste atados.'
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Muchas gracias!',
                    text: `Has comprado ${totalAtados} atado(s) en total. El valor total de la compra es de $${valorTotal}.`
                }).then(() => {
                    cigarrosLista.innerHTML = ''
                    cigarrosComprados.length = 0
                    localStorage.removeItem('cigarrosComprados')
                });
            }
        };

        document.getElementById('btn-phillips').addEventListener('click', () => {
            agregarCigarro(0, 1)
            Swal.fire(
                'Agregado',
                'Agregaste un atado de Phillips Morris.',
                'success'
            )
        })

        document.getElementById('btn-marlboro').addEventListener('click', () => {
            agregarCigarro(1, 1)
            Swal.fire(
                'Agregado',
                'Agregaste un atado de Marlboro.',
                'success'
            )
        })

        document.getElementById('btn-camel').addEventListener('click', () => {
            agregarCigarro(2, 1)
            Swal.fire(
                'Agregado',
                'Agregaste un atado de Camel.',
                'success'
            )
        })

        document.getElementById('btn-finalizar').addEventListener('click', finalizarCompra)
    } catch (error) {
        console.error('El proveedor desaparecio!', error);
    }
})

window.addEventListener('load', () => {
    const cigarrosGuardados = JSON.parse(localStorage.getItem('cigarrosComprados'));

    if (cigarrosGuardados) {
        cigarrosComprados = cigarrosGuardados;

        for (const producto of cigarrosComprados) {
            const cigarroAgregado = document.createElement('li');
            cigarroAgregado.textContent = `Has agregado ${producto.atados} atado de ${producto.marca} por un total de $${producto.subtotal}`;
            cigarrosLista.appendChild(cigarroAgregado);
        }
    }
})

alert('Buenas noches, esto es una tienda de cigarrillos.')