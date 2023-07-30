function seleccionarTipoPublicidad() {
    while (true) {
        let seleccion = parseInt(prompt(`Seleccione el tipo de publicidad:\n1. Cuarto de página\n2. Media página\n3. Página completa`));
        switch (seleccion) {
            case 1:
                return 'Cuarto de página';
            case 2:
                return 'Media página';
            case 3:
                return 'Página completa';
            default:
                alert('Opción inválida. Por favor, seleccione nuevamente.');
                break;
        }
    }
}

function ingresarCantidadPublicidades() {
    let cantidadPublicidades;
    do {
        cantidadPublicidades = parseInt(prompt('Ingrese la cantidad de publicidades:'));
        if (isNaN(cantidadPublicidades)) {
            alert('Debe ingresar un número válido para la cantidad de publicidades.');
        }
    } while (isNaN(cantidadPublicidades));
    return cantidadPublicidades;
}

function ingresarPrecioPublicidad() {
    let precioPublicidad;
    do {
        precioPublicidad = parseFloat(prompt('Ingrese el precio de cada publicidad:'));
        if (isNaN(precioPublicidad)) {
            alert('Debe ingresar un número válido para el precio de cada publicidad.');
        }
    } while (isNaN(precioPublicidad));
    return precioPublicidad;
}

function preguntarPagarIVA() {
    let pagarIVA;
    do {
        pagarIVA = prompt('¿El anunciante debe pagar IVA? Seleccione:\n1. Sí\n2. No');
    } while (pagarIVA !== '1' && pagarIVA !== '2');
    return pagarIVA === '1';
}

function calcularTotal(subtotal, pagarIVA) {
    if (pagarIVA) {
        let impuesto = subtotal * 0.21;
        return subtotal + impuesto;
    } else {
        return subtotal;
    }
}

let publicidades = [];

function agregarPublicidad() {
    let tipoPublicidad = seleccionarTipoPublicidad();
    let cantidadPublicidades = ingresarCantidadPublicidades();
    let precioPublicidad = ingresarPrecioPublicidad();

    // Creamos un objeto de publicidad para cada cantidad ingresada y lo agregamos al arreglo
    for (let i = 0; i < cantidadPublicidades; i++) {
        let publicidad = {
            tipo: tipoPublicidad,
            cantidad: 1, // Cada objeto representa una cantidad individual
            precio: precioPublicidad
        };
        publicidades.push(publicidad);
    }
}

function preguntarAgregarMasPublicidades() {
    let respuesta;
    do {
        respuesta = prompt('¿Desea agregar otra publicidad? Seleccione:\n1. Sí\n2. No');
    } while (respuesta !== '1' && respuesta !== '2');
    return respuesta === '1';
}

do {
    agregarPublicidad();
} while (preguntarAgregarMasPublicidades());

// Agregar el mensaje de resultado
console.log(`¡Registro de publicidades finalizado!\nTotal de publicidades: ${publicidades.length}`);

let subtotalTotal = publicidades.reduce((total, publicidad) => total + publicidad.cantidad * publicidad.precio, 0);
let pagarIVATotal = preguntarPagarIVA();
let totalTotal = calcularTotal(subtotalTotal, pagarIVATotal);

// Mostramos el detalle de todas las publicidades
for (let i = 0; i < publicidades.length; i++) {
    let publicidad = publicidades[i];
    console.log(`Publicidad ${i + 1}\nTipo: ${publicidad.tipo}\nCantidad: ${publicidad.cantidad}\nPrecio: $${publicidad.precio}`);
}

console.log(`Subtotal: $${subtotalTotal}`);

if (pagarIVATotal) {
    let impuestoTotal = subtotalTotal * 0.21;
    console.log(`IVA: $${impuestoTotal}`);
} else {
    console.log("IVA: $0");
}

console.log(`Total: $${totalTotal}`);

console.log(`¡Gracias por usar nuestro servicio!`);
