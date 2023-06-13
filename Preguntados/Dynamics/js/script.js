// Aquí comienza la ruleta

// Definimos las materias
const array_Materias = [
    'Matematicas',
    'Computacion',
    'Literatura',
    'Pysicologia',
    'Quimica',
    'Fisica'
];

// Obtenemos el canvas y su contexto
let canvas = document.getElementById("idcanvas");
let context = canvas.getContext("2d");
let center = canvas.width / 2;

// Dibujamos el fondo de la ruleta
context.beginPath();
context.moveTo(center, center);
context.arc(center, center, center, 0, 2 * Math.PI);
context.lineTo(center, center);
context.fillStyle = '#33333333'; 
context.fill();

// Dibujamos el círculo central
context.beginPath();
context.moveTo(center, center);
context.arc(center, center, center - 10, 0, 2 * Math.PI);
context.lineTo(center, center);
context.fillStyle = 'black'; 
context.fill();

// Dibujamos las divisiones de la ruleta
for (var i = 0; i < array_Materias.length; i++) {
    context.beginPath();
    context.moveTo(center, center);
    context.arc(center, center, center - 20, i * 2 * Math.PI / array_Materias.length, (i + 1) * 2 * Math.PI / array_Materias.length);
    context.lineTo(center, center);
    context.fillStyle = random_color(); // Color aleatorio
    context.fill();

    // Rotamos y colocamos el texto de las materias
    context.save();
    context.translate(center, center);
    context.rotate(3 * 2 * Math.PI / (5 * array_Materias.length) + i * 2 * Math.PI / array_Materias.length);
    context.translate(-center, -center);
    context.font = "13px Comic Sans MS";
    context.textAlign = "right";
    context.fillStyle = "white";
    context.fillText(array_Materias[i], canvas.width - 30, center);
    context.restore();
}

let pos_ini = 0;
let clic = 0;
let movement;

// Función para sortear la ruleta
function sortear() {
    if (clic == 0) {
        // Iniciamos el movimiento de rotación
        let canvas = document.getElementById("idcanvas");
        movement = setInterval(function () {
            pos_ini += 10;
            canvas.style.transform = 'rotate(' + pos_ini + 'deg)';
        }, 10);
        clic = 1;
        document.getElementById("idestado").innerHTML = "Detener";
    } else {
        // Detenemos el movimiento de rotación
        clearInterval(movement);
        clic = 0;
        document.getElementById("idestado").innerHTML = "Girar";
    }
}

// Función para generar un color aleatorio 
function random_color() {
    let ar_digit = ['2', '3', '4', '5', '6', '7', '8', '9'];
    let color = '';
    let i = 0;
    while (i < 6) {
        let pos = Math.round(Math.random() * (ar_digit.length - 1));
        color = color + '' + ar_digit[pos];
        i++;
    }
    return '#' + color;
} 

// Obtenemos los datos de los jugadores del URL
const urlParams = new URLSearchParams(window.location.search);
const jugador1 = urlParams.get('jugador1');
const jugador2 = urlParams.get('jugador2');

// Mostramos la información de los jugadores en el HTML
const jugador1Info = document.getElementById("jugador1-info");
const jugador2Info = document.getElementById("jugador2-info");
jugador1Info.innerHTML = "Jugador 1: " + jugador1;
jugador2Info.innerHTML = "Jugador 2: " + jugador2;