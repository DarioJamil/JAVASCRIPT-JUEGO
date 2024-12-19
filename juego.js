

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

const teclas = {};
const player = new Player(230, 460);

// Escuchar eventos de teclado
window.addEventListener("keydown", (evento) => {
    teclas[evento.key] = true;
});

window.addEventListener("keyup", (evento) => {
    teclas[evento.key] = false;
});

// Actualizar y dibujar el juego
function actualizarJuego() {
    // Rellenar el fondo de negro
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Mover al jugador
    player.movimiento(teclas, canvas.width);

    // Dibujar al jugador
    player.dibujar(ctx);

    // Llamar a la función de nuevo en el próximo frame
    requestAnimationFrame(actualizarJuego);
}

// Iniciar el juego
actualizarJuego();
