import { crearBala } from "./Bala.js";

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.ancho = 40;
        this.alto = 40;
        this.velocidad = 5;
        this.velocidady = 3;
        this.tipoDisparo = 3; // Tipo de disparo inicial
        this.municion = 100; // Munición inicial
        this.vida = 2;
        this.tiempoUltimoDisparo = 0;

        // Crear el rectángulo del Personaje para colisiones
        this.rect = {
            x: this.x,
            y: this.y,
            width: this.ancho,
            height: this.alto
        };

        this.imagen = new Image();
        this.imagen.src = "recursos/player.png";
        this.disparoDisponible= true; // Bloqueo de disparo
        this.disparoPresionado = false;
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
  
    actualizarPosicionMouse(evento, canvas) {
        // Obtener la posición del ratón relativa al canvas
        const rect = canvas.getBoundingClientRect();
        this.mouseX = evento.clientX - rect.left;
        this.mouseY = evento.clientY - rect.top;
    }

    movimientoConRaton() {
        // Calcular la dirección hacia el puntero
        const dx = this.mouseX - (this.x + this.ancho / 2);
        const dy = this.mouseY - (this.y + this.alto / 2);

        // Calcular la distancia
        const distancia = Math.sqrt(dx * dx + dy * dy);

        // Mover hacia el puntero si está fuera de la posición actual
        if (distancia > 1) { // Tolerancia para evitar movimiento errático
            const movX = (dx / distancia) * this.velocidad;
            const movY = (dy / distancia) * this.velocidady;
            this.x += movX;
            this.y += movY;
        }
    }

    movimientoConTeclado(teclas, anchoCanvas, altoCanvas) {
        if (teclas["a"] && this.x > 0) { // Mover izquierda
            this.x -= this.velocidad;
        }
        if (teclas["d"] && this.x + this.ancho < anchoCanvas) { // Mover derecha
            this.x += this.velocidad;
        }
        if (teclas["w"] && this.y > 0) { // Mover arriba
            this.y -= this.velocidady;
        }
        if (teclas["s"] && this.y + this.alto < altoCanvas) { // Mover derecha
            this.y += this.velocidady;
        }
    }

    disparar(teclas, balas) {
        if (teclas["p"] && this.disparoDisponible ) {
            crearBala(this, balas);
            this.disparoDisponible = false; // Bloquear disparo hasta que se suelte la tecla
        }
    }

    dispararAutomaticamente(balas, timestamp) {
        const tiempoEntreDisparos = 200; // 200ms entre disparos
        if (this.disparoPresionado && timestamp - this.tiempoUltimoDisparo > tiempoEntreDisparos) {
            crearBala(this, balas);
            this.tiempoUltimoDisparo = timestamp; // Actualizar el tiempo del último disparo
        }
    }

    habilitarDisparo(evento){
       if(evento.key === "p"){
            this.disparoDisponible = true;  // Rehabilitar el disparo al soltar la tecla
       }
    }
}

export default Player;
