// import Bala from "./Bala.js";
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.ancho = 40;
        this.alto = 40;
        this.velocidad = 5;
        this.imagen = new Image();
        this.imagen.src = "recursos/player.png";
    }

    dibujar(ctx) {
        ctx.drawImage(this.imagen, this.x, this.y, this.ancho, this.alto);
    }

    movimiento(teclas, anchoCanvas) {
        if (teclas["a"] && this.x > 0) { // Mover izquierda
            this.x -= this.velocidad;
        }
        if (teclas["d"] && this.x + this.ancho < anchoCanvas) { // Mover derecha
            this.x += this.velocidad;
        }
    }

    disparar(teclas,balas){
        if(teclas["p"]){
           crearBala(this,balas);
      }
       
    }
}
