import Player from "./Personaje.js";
import { Bala } from "./Bala.js";
import Enemigo from "./Enemigo.js";
import { detectarColision } from "./utils.js";


const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

const teclas = {};
const player = new Player(230, 450);
const balas = []; // Lista de balas activas
const enemigos = []; // Lista de enemigos
let puntos = 0; // Inicializar los puntos en 0

let tiempoEntreEnemigos = 1000; // Tiempo en milisegundos entre enemigos
let ultimoTiempoEnemigo = 0;

// Escuchar eventos de teclado
window.addEventListener("keydown", (evento) => {
    teclas[evento.key] = true;
});

window.addEventListener("keyup", (evento) => {
    teclas[evento.key] = false;
    player.habilitarDisparo(evento); // Rehabilitar disparo
});

// Actualizar y dibujar el juego
function actualizarJuego(timestamp) {
    // Rellenar el fondo de negro
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

// Mostrar puntos
ctx.fillStyle = "white";
ctx.font = "20px Arial";
ctx.fillText(`Puntos: ${puntos}`, 10, 20);

    // Mover al jugador
    player.movimiento(teclas, canvas.width);

    // Dibujar al jugador
    player.dibujar(ctx);

    // Disparar si se presiona la tecla correspondiente
    player.disparar(teclas, balas);

    // Crear nuevos enemigos en intervalos
    if (timestamp - ultimoTiempoEnemigo > tiempoEntreEnemigos) {
        const posicionX = Math.random() * (canvas.width - 30); // Posición aleatoria dentro del canvas
        enemigos.push(new Enemigo(posicionX, -30)); // Crear enemigo en la parte superior
        ultimoTiempoEnemigo = timestamp; // Actualizar el último tiempo
    }

    // Mover y dibujar los enemigos
    for (let i = enemigos.length - 1; i >= 0; i--) {
        const enemigo = enemigos[i];
        enemigo.movimiento();
        enemigo.dibujar(ctx);

        // Eliminar enemigo si sale del canvas
        if (enemigo.y > canvas.height) {
            enemigos.splice(i, 1);
        }
    }

    // Mover y dibujar las balas
    for (let i = balas.length - 1; i >= 0; i--) {
        const bala = balas[i];
        bala.movimiento();
        bala.dibujar(ctx);

       let balaEliminada = false;

        // Verificar colisiones con enemigos
        for (let j = enemigos.length - 1; j >= 0; j--) {
            const enemigo = enemigos[j];
            if (detectarColision(bala.rect, enemigo.rect)) {
                enemigo.vida -= 1;
                balas.splice(i, 1); // Eliminar la bala
                balaEliminada = true;

                if (enemigo.vida <= 0) {
                    enemigos.splice(j, 1); // Eliminar enemigo
                    puntos += 1; // Incrementar puntos
                    console.log(puntos);
                }
                break; // No necesitamos revisar más colisiones para esta bala
            }
        }

        if (balaEliminada) break; // Si la bala ya fue eliminada, salir del bucle
    }

    // Llamar al siguiente frame
    requestAnimationFrame(actualizarJuego);
}

// Iniciar el juego
requestAnimationFrame(actualizarJuego);
