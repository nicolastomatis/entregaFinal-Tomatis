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

let tipoPublicidad = seleccionarTipoPublicidad();
let cantidadPublicidades = ingresarCantidadPublicidades();
let precioPublicidad = ingresarPrecioPublicidad();
let subtotal = cantidadPublicidades * precioPublicidad;
let pagarIVA = preguntarPagarIVA();
let total = calcularTotal(subtotal, pagarIVA);

for (let i = 1; i <= cantidadPublicidades; i++) {
    console.log("Publicidad " + i + "\n" + "Tipo: " + tipoPublicidad + "\n" + "Precio: $" + precioPublicidad);
}

console.log("Subtotal: $" + subtotal);

if (pagarIVA) {
    let impuesto = subtotal * 0.21;
    console.log("IVA: $" + impuesto);
} else {
    console.log("IVA: $ 0");
}

console.log("Total: $" + total);



