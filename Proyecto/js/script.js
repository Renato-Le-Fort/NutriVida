// Registro
let formularioRegistro = document.getElementById("registro");
let nombre = document.getElementById("nombre");
let apellido = document.getElementById("apellido");
let rut = document.getElementById("rut");
let fecnac = document.getElementById("fecnac");
let email = document.getElementById("email");
let contrasena = document.getElementById("contrasena");
let confirmarContrasena = document.getElementById("confirmarContrasena");

if(formularioRegistro){
    formularioRegistro.addEventListener("submit", function(event) {
        event.preventDefault();

        if(!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre.value)){
            alert("El nombre debe contener solo letras");
            nombre.focus();
            return;
        }

        if(!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(apellido.value)){
                alert("El apellido debe contener solo letras");
                apellido.focus();
                return;
        }

        if(!/^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9kK]$/.test(rut.value)){
                alert("El formato del RUT es: XX.XXX.XXX-X");
                rut.focus();
        return;
        }

        let nacimiento = new Date(fecnac.value);
        let fechaActual = new Date();

        let edad = fechaActual.getFullYear() - nacimiento.getFullYear();

        let nacimientoMes = fechaActual.getMonth() - nacimiento.getMonth();
        let nacimientoDia = fechaActual.getDate() - nacimiento.getDate();

        if(nacimientoMes < 0 || (nacimientoMes == 0 && nacimientoDia < 0)){
            edad--;
        }

        if(edad < 18){
            alert("Debes ser mayor de 18 años")
            fecnac.focus();
            return;
        }

        if(!/^[^\s@]+@(gmail\.com|outlook\.com|duocuc\.cl)$/.test(email.value)){
            alert("El email debe ser: @outlook.com, @gmail.com o @duocuc.cl");
            email.focus();
            return;
        }

        if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@!%*?&])[A-Za-z\d$@!%*?&]{8,15}$/.test(contrasena.value)){
            alert("La contraseña debe tener minimo 8 y maximo 15 caracteres. Y debe de tener una letra mayuscula, un numero y un caracter especial");
            contrasena.focus();
            return;
        }

        if(contrasena.value !== confirmarContrasena.value){
            alert("Contraseña diferente, agregue la misma contraseña.");
            confirmarContrasena.focus();
            return;
        }

        localStorage.setItem("emailUsuario", email.value);
        localStorage.setItem("contraUsuario", contrasena.value);

        alert("Registro exitoso!")
    })
}

// Login
formularioLogin = document.getElementById("login");

let emailSesion = document.getElementById("emailSes");
let contraSesion = document.getElementById("contraSes");
if(formularioLogin){
    formularioLogin.addEventListener("submit", function(event) {
        event.preventDefault();

        let emailRegistrado = localStorage.getItem("emailUsuario");
        let contraRegistrado = localStorage.getItem("contraUsuario");

        if(emailSesion.value !== emailRegistrado){
            alert("Correo incorrecto o usuario no registrado!");
            emailSesion.focus();
            return;
        }

        if(contraSesion.value !== contraRegistrado){
            alert("Contraseña incorrecta!");
            contraSesion.focus();
            return;
        }

        alert("Sesion valida!")
    })
}