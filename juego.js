// VARIABLES
const terminal = document.getElementById("terminal");
const ahorcado = document.getElementById("ahorcado"); 
const jugarDeNuevo = document.getElementById("jugarDeNuevo"); 
const botonesAlfabeto = [
    document.getElementById("bA"),
    document.getElementById("bB"),
    document.getElementById("bC"),
    document.getElementById("bD"),
    document.getElementById("bE"),
    document.getElementById("bF"),
    document.getElementById("bG"),
    document.getElementById("bH"),
    document.getElementById("bI"),
    document.getElementById("bJ"),
    document.getElementById("bK"),
    document.getElementById("bL"),
    document.getElementById("bM"),
    document.getElementById("bN"),
    document.getElementById("bÑ"),
    document.getElementById("bO"),
    document.getElementById("bP"),
    document.getElementById("bQ"),
    document.getElementById("bR"),
    document.getElementById("bS"),
    document.getElementById("bT"),
    document.getElementById("bU"),
    document.getElementById("bV"),
    document.getElementById("bW"),
    document.getElementById("bX"),
    document.getElementById("bY"),
    document.getElementById("bZ")
];
const palabras = ["GRANADA", "PROGRAMACIÓN", "ROMPECABEZAS", "DELEGADO", "PLANIFICACIÓN", "AVIONETA", "NATACIÓN", "CARNÍVORO", "FINGIR", "CROMO", "CAMPANA", "BRINDIS", "PATATA", "DIVIDIR", "CARTA", "DOCTOR"];

// EVENTOS
botonesAlfabeto.forEach((boton) => {
    boton.addEventListener("click", () => verificarLetras(boton.textContent));
});

// VARIABLES GLOBALES Y INICIALIZACIÓN DEL JUEGO
let palabraAleatoria = obtenerPalabraAleatoria(palabras);
let progresoPalabra = progresoJugador(palabraAleatoria);
let contadorErrores = 0;

terminal.innerHTML = progresoPalabra.join(" ");

// DIBUJO DEL AHORCADO
const partesAhorcado = [
    "&nbsp|&nbsp <br>",
    "&nbsp0&nbsp <br>",
    "/",
    "|",
    "\\ <br>",
    "/",
    "&nbsp\\",
    ""
];

// FUNCIONES
function obtenerPalabraAleatoria(arrayPalabras) {
    let indiceAleatorio = Math.floor(Math.random() * palabras.length);
    let palabraAleatoria = arrayPalabras[indiceAleatorio];
    return palabraAleatoria.split("");
}

function progresoJugador(palabra) {
    return Array(palabra.length).fill("_");
}

function dibujarAhorcado() {
    // Mostrar partes del ahorcado según los errores que acumule el usuario
    if (contadorErrores < partesAhorcado.length) {
        ahorcado.innerHTML += partesAhorcado[contadorErrores - 1];
    }
}

/**
 * Verifica si una letra está en la palabra, actualiza el progreso y dibuja el ahorcado.
 * @param {string} inputUsuario - Letra introducida por el usuario.
 */
function verificarLetras(inputUsuario) {
    let letraEncontrada = false;

    // Deshabilitar el botón que el usuario ha seleccionado
    const boton = botonesAlfabeto.find(
        (btn) => btn.textContent === inputUsuario
    );
    if (boton) {
        boton.disabled = true;
    }

    // Comprobar si la letra está en la palabra
    for (let i = 0; i < palabraAleatoria.length; ++i) {
        if (palabraAleatoria[i] === inputUsuario || 
            (palabraAleatoria[i] === "À" && inputUsuario === "A") || // Aclarar accentos
            (palabraAleatoria[i] === "È" && inputUsuario === "E") ||
            (palabraAleatoria[i] === "É" && inputUsuario === "E") ||
            (palabraAleatoria[i] === "Í" && inputUsuario === "I") ||
            (palabraAleatoria[i] === "Ò" && inputUsuario === "O") ||
            (palabraAleatoria[i] === "Ó" && inputUsuario === "O") ||
            (palabraAleatoria[i] === "Ú" && inputUsuario === "U")) {
            progresoPalabra[i] = palabraAleatoria[i];
            letraEncontrada = true;
        }
    }

    if (!letraEncontrada) {
        ++contadorErrores;
        dibujarAhorcado();
    }

    actualizarProgreso();
}

function actualizarProgreso() {
    if (contadorErrores === 7) {
        hasPerdido();  // Si comete 7 errores, pierde
    } 
    else if (progresoPalabra.join("") === palabraAleatoria.join("")) {
        hasGanado();  // Si adivina, gana
    }
    else {
        terminal.innerHTML = progresoPalabra.join(" ");
    }
}

function hasPerdido() {
    // Mostrar mensaje de "game over" y la palabra correcta
    terminal.style.color = 'red';
    terminal.innerHTML = `¡HAS PERDIDO!<br><p style="font-size: 15px; margin-top: 0; color: orange">LA PALABRA ERA "${palabraAleatoria.join("")}"</p>`;
    terminal.style.marginTop = '-135px';
    terminal.style.fontSize = '40px';
    ahorcado.style.fontSize = '30px'
    // Desactivar y ocultar todos los botones
    botonesAlfabeto.forEach(boton => {
        boton.style.visibility = 'hidden';
        boton.disabled = true;
    });
    console.log(contadorErrores);
    // Activar el botón "Jugar de nuevo"
    jugarDeNuevo.style.visibility = 'visible';
}

function hasGanado() {
    // Mensaje de victoria
    terminal.style.color = '#5eff00';
    terminal.style.marginTop = '-128px';
    terminal.style.fontSize = '30px';
    ahorcado.style.fontSize = '40px';
    terminal.innerHTML = `¡FELICITACIONES! <br><p style="font-size: 15px; margin-top: 0; color: "orange">¡LO HAS LIBERADO!</p>`
    ahorcado.innerHTML = `\\0/<br>
                    &nbsp |<br>
                    &nbsp/&nbsp\\`;
    // Desactivar y ocultar todos los botones
    botonesAlfabeto.forEach(boton => {
        boton.style.visibility = 'hidden';
        boton.disabled = true;
    });
    // Activar el botón "Jugar de nuevo"
    jugarDeNuevo.style.visibility = 'visible';
}

function nuevaPartida() {
    location.reload();
}