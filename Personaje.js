import { crearBala } from "./Bala.js";

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.ancho = 40;
        this.alto = 40;
        this.velocidad = 5;
        this.tipoDisparo = 3; // Tipo de disparo inicial
        this.municion = 100; // Munición inicial
        this.vida = 2;

        // Crear el rectángulo del Personaje para colisiones
        this.rect = {
            x: this.x,
            y: this.y,
            width: this.ancho,
            height: this.alto
        };

        this.imagen = new Image();
        this.imagen.src = "recursos/player.png";
        this.disparoDisponible= true // Bloqueo de disparo
    }

    dibujar(ctx) {
          // Actualizar el rectángulo
        this.rect.x = this.x;
        this.rect.y = this.y;

        // Dibujar la imagen del jugador
        ctx.drawImage(this.imagen, this.x, this.y, this.ancho, this.alto);

        // Dibujar el rectángulo para depuración (contorno)
        ctx.strokeStyle = "red"; // Color del contorno
        ctx.lineWidth = 2; // Ancho del contorno
        ctx.strokeRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
    }

    movimiento(teclas, anchoCanvas) {
        if (teclas["a"] && this.x > 0) { // Mover izquierda
            this.x -= this.velocidad;
        }
        if (teclas["d"] && this.x + this.ancho < anchoCanvas) { // Mover derecha
            this.x += this.velocidad;
        }
    }

    disparar(teclas, balas) {
        if (teclas["p"] && this.disparoDisponible ) {
            crearBala(this, balas);
            this.disparoDisponible = false; // Bloquear disparo hasta que se suelte la tecla
        }
    }

    habilitarDisparo(evento){
       if(evento.key === "p"){
            this.disparoDisponible = true;  // Rehabilitar el disparo al soltar la tecla
       }
    }
}

export default Player;
