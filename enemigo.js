export default class Enemigo {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.ancho = 30;
        this.alto = 30;
        this.velocidad = 3;
        this.vida = 1;

        // Crear el rectángulo del enemigo para colisiones
        this.rect = {
            x: this.x,
            y: this.y,
            width: this.ancho,
            height: this.alto
        };

        // Cargar la imagen del enemigo
        this.imagen = new Image();
        this.imagen.src = "recursos/enemigo.png";
    }

    // Dibujar el enemigo en el canvas
    dibujar(ctx) {
        // Actualizar el rectángulo
        this.rect.x = this.x;
        this.rect.y = this.y;
        ctx.drawImage(this.imagen, this.x, this.y, this.ancho, this.alto);
    }

    // Movimiento del enemigo
    movimiento() {
        this.y += this.velocidad;
    }
}
