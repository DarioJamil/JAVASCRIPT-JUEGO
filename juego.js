import Player from "./Personaje.js";
import { Bala } from "./Bala.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

const teclas = {};
const player = new Player(230, 450);
const balas = []; // Lista de balas activas

// Escuchar eventos de teclado
window.addEventListener("keydown", (evento) => {
    teclas[evento.key] = true;
});

window.addEventListener("keyup", (evento) => {
    teclas[evento.key] = false;
    player.habilitarDisparo(evento); // Rehabilitar disparo
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

    // Disparar si se presiona la tecla correspondiente
    player.disparar(teclas, balas);

    // Mover y dibujar las balas
    for (let i = balas.length - 1; i >= 0; i--) {
        const bala = balas[i];
        bala.movimiento();
        bala.dibujar(ctx);

        // Eliminar la bala si sale del canvas
        if (bala.y + bala.alto < 0) {
            balas.splice(i, 1);
        }
    }

    // Llamar a la función de nuevo en el próximo frame
    requestAnimationFrame(actualizarJuego);
}

// Iniciar el juego
actualizarJuego();
