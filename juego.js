import Player from "./Personaje.js";
// import { Bala } from "./Bala.js";
import Enemigo from "./Enemigo.js";
import { detectarColision, mostrarHUD} from "./utils.js";
import Item from "./Item.js";


const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

const teclas = {};
const player = new Player(230, 450);
const balas = []; // Lista de balas activas
const enemigos = []; // Lista de enemigos
const items = []; // Lista de items
let puntos = 0; // Inicializar los puntos en 0
let bonus = 5;

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

// Evento para actualizar la posición del ratón
canvas.addEventListener("mousemove", (evento) => {
    player.actualizarPosicionMouse(evento, canvas);
});

// Habilitar el movimiento y disparo al hacer clic izquierdo
canvas.addEventListener("mousedown", (evento) => {
    if (evento.button === 0) { // Botón izquierdo
        player.movimientoHabilitado = true; // Habilitar movimiento
        player.disparoPresionado = true;   // Habilitar disparo
    }
});

// Deshabilitar el disparo al soltar el botón izquierdo
canvas.addEventListener("mouseup", (evento) => {
    if (evento.button === 0) { // Botón izquierdo
        player.disparoPresionado = false; // Deshabilitar disparo
    }
});

canvas.addEventListener("mouseleave", () => {
    player.mouseX = player.x + player.ancho / 2;
    player.mouseY = player.y + player.alto / 2;
    player.disparoPresionado = false; // Deshabilitar disparo
});

// Actualizar y dibujar el juego
function actualizarJuego(timestamp) {
    // Rellenar el fondo de negro
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

   

    // Mover al jugador
    // player.movimientoConTeclado(teclas, canvas.width, canvas.height );

    player.movimientoConRaton();

    // Dibujar al jugador
    player.dibujar(ctx);

    // Disparar si se presiona la tecla correspondiente
    player.disparar(teclas, balas);

    player.dispararAutomaticamente(balas, timestamp);


    // Crear nuevos enemigos en intervalos
    if (timestamp - ultimoTiempoEnemigo > tiempoEntreEnemigos) {
        const posicionX = Math.random() * (canvas.width - 30); // Posición aleatoria dentro del canvas
        enemigos.push(new Enemigo(posicionX, -30)); // Crear enemigo en la parte superior
        ultimoTiempoEnemigo = timestamp; // Actualizar el último tiempo
    }

    if (puntos >= bonus){
        const posicionX = Math.random() * (canvas.width - 30);
        items.push(new Item(posicionX, -30));
        bonus = puntos+5;
    }

    // Bucle para mover y dibujar los items
    for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];
        item.movimiento();
        item.dibujar(ctx);

        // Verificar si el enemigo se sale del canvas
        if (item.y > canvas.height) {
            items.splice(i, 1); // Eliminar item
            continue; 
        }

        // Verificar colisión entre el player y los items
        if (detectarColision(player.rect, item.rect)) {
            player.tipoDisparo = item.tipo;
            if(item.tipo == 3){
                player.municion = 500;
            }else{
                player.municion = 50;
            }
            items.splice(i, 1); // Eliminar item
        }
    }

    // Bucle para mover y dibujar los enemigos
    for (let i = enemigos.length - 1; i >= 0; i--) {
        const enemigo = enemigos[i];
        enemigo.movimiento();
        enemigo.dibujar(ctx);

        // Verificar si el enemigo se sale del canvas
        if (enemigo.y > canvas.height) {
            enemigos.splice(i, 1); // Eliminar enemigo
            continue; // No se necesita el "else" aquí porque ya eliminamos al enemigo si se sale del canvas
        }

        // Verificar colisión entre el player y los enemigos
        if (detectarColision(player.rect, enemigo.rect)) {
            player.vida -= 1;
            console.log(`me ha quitado  ${player.vida} vida`);
            enemigos.splice(i, 1); // Eliminar enemigo
        }
    }

    // Mover y dibujar las balas
    for (let i = balas.length - 1; i >= 0; i--) {
        const bala = balas[i];
        bala.movimiento();
        bala.dibujar(ctx);

       let balaEliminada = false;

        // Verificar colisiones bala con enemigos
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

    mostrarHUD(ctx, puntos, player.vida, player.municion, bonus);

    // Llamar al siguiente frame
    requestAnimationFrame(actualizarJuego);
}

// Iniciar el juego
requestAnimationFrame(actualizarJuego);
