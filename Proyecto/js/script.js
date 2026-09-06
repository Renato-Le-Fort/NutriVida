document.addEventListener('DOMContentLoaded', function () {
    const tarjetas = document.querySelectorAll('.tarjeta-resena');
    const btnAnterior = document.getElementById('btnAnterior');
    const btnSiguiente = document.getElementById('btnSiguiente');

    let indiceInicial = 0;

    function obtenerCantidadVisible() {

        if (window.innerWidth <= 600) {
            return 1;
        }
        if (window.innerWidth <= 900) {
            return 2;
        }
        return 3;
    }


    function mostrarTarjetas() {
        const tarjetasVisibles = obtenerCantidadVisible();
        if (
            indiceInicial >
            tarjetas.length - tarjetasVisibles
        ) {
            indiceInicial = Math.max(
                0,
                tarjetas.length - tarjetasVisibles
            );
        }

        tarjetas.forEach(function (tarjeta, indice) {

            const visible =
                indice >= indiceInicial &&
                indice < indiceInicial + tarjetasVisibles;


            tarjeta.classList.toggle(
                'activa',
                visible
            );

        });

    }



    if (btnSiguiente) {

        btnSiguiente.addEventListener(
            'click',
            function () {

                const tarjetasVisibles =
                    obtenerCantidadVisible();
                if (
                    indiceInicial <
                    tarjetas.length - tarjetasVisibles
                ) {
                    indiceInicial++;
                    mostrarTarjetas();
                }
            }
        );
    }



    if (btnAnterior) {

        btnAnterior.addEventListener(
            'click',
            function () {

                if (indiceInicial > 0) {

                    indiceInicial--;

                    mostrarTarjetas();
                }

            }
        );

    }



    window.addEventListener(
        'resize',
        mostrarTarjetas
    );


    mostrarTarjetas();

});

// Registro
let formularioRegistro = document.getElementById("registro");
let nombre = document.getElementById("nombre");
let apellido = document.getElementById("apellido");
let rut = document.getElementById("rut");
let fecnac = document.getElementById("fecnac");
let telefono = document.getElementById("telefono");
let email = document.getElementById("email");
let contrasena = document.getElementById("contrasena");
let confirmarContrasena = document.getElementById("confirmarContrasena");

if (formularioRegistro) {
    formularioRegistro.addEventListener("submit", function (event) {
        event.preventDefault();

        // Validacion de los  campos obligatorios
        if (
            nombre.value.trim() === "" ||
            apellido.value.trim() === "" ||
            rut.value.trim() === "" ||
            fecnac.value === "" ||
            telefono.value.trim() === "" ||
            email.value.trim() === "" ||
            contrasena.value.trim() === "" ||
            confirmarContrasena.value.trim() === ""
        ) {
            alert("Debes completar todos los campos.");
            return;
        }

        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre.value)) {
            alert("El nombre debe contener solo letras");
            nombre.focus();
            return;
        }

        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(apellido.value)) {
            alert("El apellido debe contener solo letras");
            apellido.focus();
            return;
        }

        if (!/^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9kK]$/.test(rut.value)) {
            alert("El formato del RUT es: XX.XXX.XXX-X");
            rut.focus();
            return;
        }

        let nacimiento = new Date(fecnac.value);
        let fechaActual = new Date();
        let edad = fechaActual.getFullYear() - nacimiento.getFullYear();
        let nacimientoMes = fechaActual.getMonth() - nacimiento.getMonth();
        let nacimientoDia = fechaActual.getDate() - nacimiento.getDate();

        if (nacimientoMes < 0 || (nacimientoMes == 0 && nacimientoDia < 0)) {
            edad--;
        }

        if (edad < 18) {
            alert("Debes ser mayor de 18 años");
            fecnac.focus();
            return;
        }
        if (telefono.value.trim() === "") {
            alert("Debes ingresar tu número de teléfono.");
            telefono.focus();
             return;
        }

        if (!/^\+569\d{8}$/.test(telefono.value)) {
            alert("El teléfono debe tener el formato +56912345678.");
            telefono.focus();
            return;
        }

        if (!/^[^\s@]+@(gmail\.com|outlook\.com|duocuc\.cl)$/.test(email.value)) {
            alert("El email debe ser: @outlook.com, @gmail.com o @duocuc.cl");
            email.focus();
            return;
        }

        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@!%*?&()])[A-Za-z\d$@!%*?&()]{8,15}$/.test(contrasena.value)) {
            alert("La contraseña debe tener mínimo 8 y máximo 15 caracteres, con una mayúscula, un número y un carácter especial");
            contrasena.focus();
            return;
        }

        if (contrasena.value !== confirmarContrasena.value) {
            alert("Las contraseñas no coinciden.");
            confirmarContrasena.focus();
            return;
        }

        localStorage.setItem("emailUsuario", email.value);
        localStorage.setItem("contraUsuario", contrasena.value);

        alert("¡Registro exitoso!");
        formularioRegistro.reset();
    });
}

// Login y sus validaciones 

let formularioLogin = document.getElementById("login");
let emailSesion = document.getElementById("emailSes");
let contraSesion = document.getElementById("contraSes");

if (formularioLogin) {

    formularioLogin.addEventListener("submit", function (event) {
        event.preventDefault();

        // Validar que el correo no esté vacío
        if (emailSesion.value.trim() === "") {
            alert("Debes ingresar tu correo electrónico.");
            emailSesion.focus();
            return;
        }

        // Validar que la contraseña no esté vacía
        if (contraSesion.value.trim() === "") {
            alert("Debes ingresar tu contraseña.");
            contraSesion.focus();
            return;
        }

        // Validar formato del correo
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailSesion.value)) {
            alert("Debes ingresar un correo electrónico válido.");
            emailSesion.focus();
            return;
        }

        // Validar largo de la contraseña
        if (contraSesion.value.length < 8 || contraSesion.value.length > 15) {
            alert("La contraseña debe tener entre 8 y 15 caracteres.");
            contraSesion.focus();
            return;
        }

        // Obtener datos registrados
        let emailRegistrado = localStorage.getItem("emailUsuario");
        let contraRegistrada = localStorage.getItem("contraUsuario");

        // Verificar que exista un usuario registrado
        if (!emailRegistrado || !contraRegistrada) {
            alert("No existe un usuario registrado. Primero debes registrarte.");
            return;
        }

        // Comparar correo
        if (emailSesion.value !== emailRegistrado) {
            alert("Correo incorrecto o usuario no registrado.");
            emailSesion.focus();
            return;
        }

        // Comparar contraseña
        if (contraSesion.value !== contraRegistrada) {
            alert("Contraseña incorrecta.");
            contraSesion.focus();
            return;
        }

        alert("¡Sesión iniciada con éxito!");
    });
}

// =========================================
// DETALLE DEL PRODUCTO
// =========================================

const imagenProducto = document.getElementById("imagenProducto");
const nombreProducto = document.getElementById("nombreProducto");
const precioProducto = document.getElementById("precioProducto");
const descripcionProducto = document.getElementById("descripcionProducto");

const botonAumentar = document.getElementById("aumentar");
const botonDisminuir = document.getElementById("disminuir");
const cantidadTexto = document.getElementById("cantidad");
const totalTexto = document.getElementById("total");
const botonAgendar = document.getElementById("botonAgendar");

if (
    imagenProducto &&
    nombreProducto &&
    precioProducto &&
    descripcionProducto
) {

    const planes = {
        perdida: {
            nombre: "Plan de pérdida de peso",
            precio: 35000,
            imagen: "img/plan-perdida-peso.png",
            descripcion:
                "Programa nutricional enfocado en reducir grasa corporal de manera saludable y sostenible, evitando dietas extremas y adaptándose a las necesidades y estilo de vida de cada paciente."
        },

        metabolico: {
            nombre: "Plan control metabólico",
            precio: 40000,
            imagen: "img/plan-control-metabolico.png",
            descripcion:
                "Plan orientado a mejorar la alimentación y apoyar el control de condiciones como diabetes o hipertensión mediante recomendaciones nutricionales personalizadas."
        },

        deportivo: {
            nombre: "Plan nutrición deportiva",
            precio: 45000,
            imagen: "img/plan-nutricion-deportiva.png",
            descripcion:
                "Plan diseñado para mejorar el rendimiento físico, apoyar el aumento de masa muscular y favorecer la recomposición corporal de acuerdo con los objetivos de cada paciente."
        },

        vegano: {
            nombre: "Plan alimentación vegana / vegetariana",
            precio: 38000,
            imagen: "img/plan-vegano-vegetariano.png",
            descripcion:
                "Asesoría nutricional enfocada en llevar una alimentación basada en plantas de forma equilibrada, completa y segura, cubriendo los nutrientes necesarios para una alimentación saludable."
        }
    };


    const parametros = new URLSearchParams(window.location.search);

    const planSeleccionado = parametros.get("plan") || "perdida";

    const plan = planes[planSeleccionado] || planes.perdida;


    imagenProducto.src = plan.imagen;
    imagenProducto.alt = plan.nombre;

    nombreProducto.textContent = plan.nombre;

    precioProducto.textContent =
        "$" + plan.precio.toLocaleString("es-CL");

    descripcionProducto.textContent =
        plan.descripcion;


    let cantidad = 1;

    function actualizarTotal() {

    cantidadTexto.textContent = cantidad;

    const total = plan.precio * cantidad;

    totalTexto.textContent =
        "$" + total.toLocaleString("es-CL");

    const totalPagar = document.getElementById("totalPagar");

    if (totalPagar) {
        totalPagar.textContent =
            "$" + total.toLocaleString("es-CL");
    }
}


    botonAumentar.addEventListener("click", function () {

        cantidad++;

        actualizarTotal();
    });


    botonDisminuir.addEventListener("click", function () {

        if (cantidad > 1) {

            cantidad--;

            actualizarTotal();
        }
    });


    botonAgendar.addEventListener("click", function () {

    const formaPago = document.querySelector('input[name="formaPago"]:checked');
    const datosTarjeta = document.getElementById("datosTarjeta");

    if (!formaPago) {
        alert("Selecciona una forma de pago para continuar.");
        return;
    }

    if (formaPago.value === "debito" || formaPago.value === "credito") {
        datosTarjeta.style.display = "block";
    }

    if (formaPago.value === "efectivo") {
        datosTarjeta.style.display = "none";
        alert("Has seleccionado pago en efectivo.");
    }

});

const botonPagar = document.getElementById("botonPagar");

botonPagar.addEventListener("click", function () {

    const numeroTarjeta = document.getElementById("numeroTarjeta").value.trim();
    const titularTarjeta = document.getElementById("titularTarjeta").value.trim();
    const vencimientoTarjeta = document.getElementById("vencimientoTarjeta").value.trim();
    const cvvTarjeta = document.getElementById("cvvTarjeta").value.trim();
    const mensajePago = document.getElementById("mensajePago");

    if (
        numeroTarjeta === "" ||
        titularTarjeta === "" ||
        vencimientoTarjeta === "" ||
        cvvTarjeta === ""
    ) {
        mensajePago.textContent = "⚠️ Completa todos los datos de la tarjeta.";
        return;
    }

    const numeroSinEspacios = numeroTarjeta.replace(/\s/g, "");

    if (!/^\d{16}$/.test(numeroSinEspacios)) {
        mensajePago.textContent = "⚠️ Ingresa un número de tarjeta válido de 16 dígitos.";
        return;
    }

    if (!/^\d{2}\/\d{2}$/.test(vencimientoTarjeta)) {
        mensajePago.textContent = "⚠️ Ingresa el vencimiento en formato MM/AA.";
        return;
    }

    if (!/^\d{3}$/.test(cvvTarjeta)) {
        mensajePago.textContent = "⚠️ El CVV debe contener 3 números.";
        return;
    }

    const total = plan.precio * cantidad;

    mensajePago.innerHTML =
    "✅ <strong>Pago aprobado</strong><br>" +
    "Tu pago se ha realizado correctamente.<br>" +
    "Total pagado: $" +
    total.toLocaleString("es-CL") +
    "<br>El comprobante de tu pago fue enviado a tu correo electrónico.";
});


    actualizarTotal();
}