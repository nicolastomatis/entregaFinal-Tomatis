let publicidades = [];
let anunciantes = [];
let ivaActivo = false;

// Valida que se ingresen la cantidad y el precio de la publicidad antes de agregarla

function validarYAgregarPublicidad() {
    const cantidadPublicidades = document.getElementById('cantidad').value;
    const precioPublicidad = document.getElementById('precio').value;
    if (!cantidadPublicidades || !precioPublicidad) {
        Swal.fire(
            'Atención',
            'Por favor, complete los campos de "Cantidad de publicidades" y "Valor de publicidades" antes de agregar.?',
            'warning'
        );
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

    guardarPublicidadesEnLocalStorage();

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
        <td><button class="modificarPublicidad" onclick="editarPublicidad(${i})">Modificar</button>
        <button class="eliminarPublicidad" onclick="eliminarPublicidad(${i})">X</button></td>
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

// Limpio los datos y reseteo el arreglo para volver a empezar

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

// Cambia el estado de agregar IVA o eliminarlo

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

// Ventana modal para mostrar la opcion de ingreso de anunciantes

const abrirModalButton = document.getElementById('abrirModal');
const modal = document.getElementById('modal');

abrirModalButton.addEventListener('click', () => {
    modal.style.display = 'block';
});

abrirModalButton.addEventListener('click', () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Bloquea el scroll
});
function cerrarModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Desbloquea el scroll
}

// Funcion para agregar nuevos anunciantes 

function validarYAgregarAnunciante() {
    const nombreAnunciante = document.getElementById('nombreAnunciante').value;
    const direccionAnunciante = document.getElementById('direccionAnunciante').value;
    const localidadAnunciante = document.getElementById('localidadAnunciante').value;
    const correoAnunciante = document.getElementById('correoAnunciante').value;

    if (!nombreAnunciante || !direccionAnunciante || !localidadAnunciante || !correoAnunciante) {
        Swal.fire(
            'Atención',
            'Por favor, complete todos los campos del anunciante antes de agregar.',
            'warning'
        );
        return;
    }

    const anunciante = {
        nombre: nombreAnunciante,
        direccion: direccionAnunciante,
        localidad: localidadAnunciante,
        correo: correoAnunciante,
    };

    anunciantes.push(anunciante);

    // Limpia los campos del formulario de anunciante
    document.getElementById('nombreAnunciante').value = '';
    document.getElementById('direccionAnunciante').value = '';
    document.getElementById('localidadAnunciante').value = '';
    document.getElementById('correoAnunciante').value = '';

    // Guarda los anunciantes en el Local Storage
    localStorage.setItem('anunciantes', JSON.stringify(anunciantes));
    actualizarSelectAnunciantes();

    mostrarDatosAnuncianteSeleccionado();

    cerrarModal();

    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Anunciante agregado correctamente',
        showConfirmButton: false,
        timer: 1500
    })
}

// Funcion para actualizar anunciantes en el select

function actualizarSelectAnunciantes() {
    const selectAnunciantes = document.getElementById('selectAnunciantes');
    selectAnunciantes.innerHTML = '';

    for (let i = 0; i < anunciantes.length; i++) {
        let anunciante = anunciantes[i];
        const option = document.createElement('option');
        option.value = i;
        option.text = anunciante.nombre;
        selectAnunciantes.appendChild(option);
    }
}

// Función para mostrar los datos de anunciantes que se encuentran guardados en el localStorage

function cargarAnunciantesDesdeLocalStorage() {
    const anunciantesGuardados = localStorage.getItem('anunciantes');
    if (anunciantesGuardados) {
        anunciantes = JSON.parse(anunciantesGuardados);
    }
    actualizarSelectAnunciantes();

}

const selectAnunciantes = document.getElementById('selectAnunciantes');
selectAnunciantes.addEventListener('change', mostrarDatosAnuncianteSeleccionado);


// Función para mostrar los datos del anunciante seleccionado

function mostrarDatosAnuncianteSeleccionado() {
    const indiceSeleccionado = selectAnunciantes.value;

    // Comprobar si se ha seleccionado un anunciante válido
    if (indiceSeleccionado >= 0 && anunciantes[indiceSeleccionado]) {
        const anuncianteSeleccionado = anunciantes[indiceSeleccionado];
        const datosAnuncianteDiv = document.getElementById('datosAnunciante');

        // Verificar que el objeto anunciante seleccionado tenga la propiedad 'nombre'
        if (anuncianteSeleccionado.nombre) {
            datosAnuncianteDiv.innerHTML = `
                <p><strong>Nombre:</strong> ${anuncianteSeleccionado.nombre}</p>
                <p><strong>Dirección:</strong> ${anuncianteSeleccionado.direccion}</p>
                <p><strong>Localidad:</strong> ${anuncianteSeleccionado.localidad}</p>
                <p><strong>Correo Electrónico:</strong> ${anuncianteSeleccionado.correo}</p>
            `;
        } else {
            datosAnuncianteDiv.innerHTML = '<p>Los datos del anunciante son inválidos.</p>';
        }
    } else {
        // Manejar el caso en que no se ha seleccionado un anunciante válido
        const datosAnuncianteDiv = document.getElementById('datosAnunciante');
        datosAnuncianteDiv.innerHTML = '<p>Seleccione un anunciante válido.</p>';
    }
}

function cargarDatosJSONLocal() {
    fetch('./js/anunciantes.json') // Ajusta la ruta al archivo JSON según su ubicación
        .then(response => response.json())
        .then(data => {
            // Asignar los datos a las variables correspondientes
            anunciantes = data.anunciantes;
            actualizarSelectAnunciantes();
            mostrarDatosAnuncianteSeleccionado();
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
        });
}

function guardarPublicidadesEnLocalStorage() {
    localStorage.setItem('publicidades', JSON.stringify(publicidades));
}

function cargarPublicidadesDesdeLocalStorage() {
    const publicidadesGuardadas = localStorage.getItem('publicidades');
    if (publicidadesGuardadas) {
        publicidades = JSON.parse(publicidadesGuardadas);
        mostrarRecibo(); // Mostrar las publicidades almacenadas automáticamente
    }
}

function editarPublicidad(indice) {
    const nuevaCantidadInput = document.getElementById('cantidad');
    const nuevoPrecioInput = document.getElementById('precio');

    // Obtén los valores actuales de la publicidad seleccionada
    const publicidadSeleccionada = publicidades[indice];

    // Llena los campos del formulario con los valores actuales de la publicidad
    nuevaCantidadInput.value = publicidadSeleccionada.cantidad;
    nuevoPrecioInput.value = publicidadSeleccionada.precio;

    // Cambia el botón "Agregar" a "Guardar Cambios" para indicar que estás editando
    const botonAgregar = document.querySelector('.agregar');
    botonAgregar.innerText = 'Actualizar';

    // Agrega un evento para manejar la edición
    botonAgregar.onclick = function () {
        const nuevaCantidad = parseInt(nuevaCantidadInput.value);
        const nuevoPrecio = parseFloat(nuevoPrecioInput.value);

        if (!isNaN(nuevaCantidad) && !isNaN(nuevoPrecio)) {
            // Actualiza los valores de la publicidad seleccionada
            publicidadSeleccionada.cantidad = nuevaCantidad;
            publicidadSeleccionada.precio = nuevoPrecio;

            // Restaura el botón a su estado original
            botonAgregar.innerText = 'Agregar';

            // Limpia los campos del formulario
            nuevaCantidadInput.value = '';
            nuevoPrecioInput.value = '';

            guardarPublicidadesEnLocalStorage(); // Actualiza el Local Storage
            mostrarRecibo(); // Vuelve a mostrar el recibo con los cambios
        } else {
            Swal.fire(
                'Atención',
                'Por favor, complete los campos de "Cantidad de publicidades" y "Valor de publicidades" antes de agregar.?',
                'warning'
            );
        }
    };
}

// Función para eliminar una publicidad por su índice en el arreglo
function eliminarPublicidad(indice) {
    if (
        Swal.fire({
            title: '¿Desea eliminar la publicidad?',
            confirmButtonText: 'Eliminar publicidad',
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {            
        publicidades.splice(indice, 1); // Elimina la publicidad del arreglo
        guardarPublicidadesEnLocalStorage(); // Actualiza el Local Storage
        mostrarRecibo(); // Vuelve a mostrar el recibo
                Swal.fire('La publicidad ha sido eliminada', '', 'info')
            }
        })


    ) {
    }
}


window.onload = function () {
    cargarDatosJSONLocal(); // Cargar datos JSON local
    cargarAnunciantesDesdeLocalStorage(); // Cargar anunciantes desde LocalStorage
    cargarPublicidadesDesdeLocalStorage(); // Cargar publicidades desde LocalStorage
    actualizarSelectAnunciantes();
    mostrarDatosAnuncianteSeleccionado();
};

// Imprime el anunciante y listado de publicidades con su respectivo valor
function imprimir() {
    window.print()
}
