let publicidades = [];
let ivaActivo = false;

// Valida que se ingresen la cantidad y el precio de la publicidad antes de agregarla

function validarYAgregarPublicidad() {
    const cantidadPublicidades = document.getElementById('cantidad').value;
    const precioPublicidad = document.getElementById('precio').value;
    if (!cantidadPublicidades || !precioPublicidad) {
        alert('Por favor, complete los campos de "Cantidad de publicidades" y "Valor de publicidades" antes de agregar.');
        return;
    }
    agregarPublicidad();
}

// Obtiene los datos de la publicidad (tipo, cantidad y precio) del formulario, chequea que no haya una publicidad con el mismo 
// tipo y precio y los agrega al un arreglo si son diferentes.
// Si tipo y precio son iguales suma las dos cantidades de publicidades

function agregarPublicidad() {
    const tipoPublicidad = document.getElementById('tipo').value;
    const cantidadPublicidades = parseInt(document.getElementById('cantidad').value);
    const precioPublicidad = parseFloat(document.getElementById('precio').value);

    let publicidad = {
        tipo: tipoPublicidad,
        cantidad: cantidadPublicidades,
        precio: precioPublicidad,
    };

    function buscarPublicidad(pub) {
        return pub.tipo === publicidad.tipo && pub.precio === publicidad.precio;
    }
    const index = publicidades.findIndex(buscarPublicidad);

    if (index !== -1) {
        publicidades[index].cantidad += cantidadPublicidades;
    } else {
        publicidades.push(publicidad);
    }

    document.getElementById('cantidad').value = '';
    document.getElementById('precio').value = '';

    mostrarRecibo();
}

// Muestra los detalles de las publicidades (tipo, cantidad, precio) en una tabla HTML para simular un recibo
// Aca calculo el subtotal, IVA y total

function mostrarRecibo() {
    const tablaRecibo = document.getElementById('tablaRecibo').getElementsByTagName('tbody')[0];
    tablaRecibo.innerHTML = '';

    let detalle = '';
    let subtotalTotal = 0;
    let publicidadesFiltradas = [];

    for (let i = 0; i < publicidades.length; i++) {
        let publicidad = publicidades[i];
        const precioTotal = publicidad.cantidad * publicidad.precio;

        function buscarPublicidad(pub) {
            return pub.tipo === publicidad.tipo && pub.precio === publicidad.precio;
        }
        const index = publicidadesFiltradas.findIndex(buscarPublicidad);

        if (index !== -1) {
            publicidadesFiltradas[index].cantidad += publicidad.cantidad;
        } else {
            publicidadesFiltradas.push({
                tipo: publicidad.tipo,
                cantidad: publicidad.cantidad,
                precio: publicidad.precio
            });
        }

        subtotalTotal += precioTotal;
    }

    for (let i = 0; i < publicidadesFiltradas.length; i++) {
        let publicidad = publicidadesFiltradas[i];
        const precioTotal = publicidad.cantidad * publicidad.precio;
        detalle += `
            <tr>
                <td>${i + 1}</td>
                <td>${publicidad.tipo}</td>
                <td>${publicidad.cantidad}</td>
                <td>$${publicidad.precio.toFixed(2)}</td>
                <td>$${precioTotal.toFixed(2)}</td>
            </tr>
        `;
    }

    tablaRecibo.innerHTML = detalle;

    const subtotal = document.getElementById('subtotal');
    subtotal.innerText = `$${subtotalTotal.toFixed(2)}`;

    let totalTotal = subtotalTotal;
    const agregarIVA = ivaActivo;

    if (agregarIVA) {
        const impuestoTotal = subtotalTotal * 0.21;
        totalTotal += impuestoTotal;

        const iva = document.getElementById('iva');
        iva.innerText = `$${impuestoTotal.toFixed(2)}`;
    } else {
        const iva = document.getElementById('iva');
        iva.innerText = '';
    }

    const total = document.getElementById('total');
    total.innerText = `$${totalTotal.toFixed(2)}`;
}

function limpiarTabla() {
    publicidades.splice(0, publicidades.length);
    const tablaRecibo = document.getElementById('tablaRecibo').getElementsByTagName('tbody')[0];
    tablaRecibo.innerHTML = '';

    const subtotal = document.getElementById('subtotal');
    subtotal.innerText = '';

    const iva = document.getElementById('iva');
    iva.innerText = '';

    const total = document.getElementById('total');
    total.innerText = '';

    const botonIVA = document.getElementById('botonIVA');
    botonIVA.innerText = 'Agregar IVA';
    ivaActivo = false;
}

function cambiarIVA() {
    const botonIVA = document.getElementById('botonIVA');
    const iva = document.getElementById('iva');

    if (ivaActivo) {
        // Elimina el IVA
        iva.innerText = '';
        botonIVA.innerText = 'Agregar IVA';
    } else {
        // Agregar el IVA
        const subtotal = parseFloat(document.getElementById('subtotal').innerText.slice(1));
        const ivaTotal = subtotal * 0.21;
        iva.innerText = `$${ivaTotal.toFixed(2)}`;
        botonIVA.innerText = 'Eliminar IVA';
    }

    ivaActivo = !ivaActivo;
    mostrarRecibo();
}
