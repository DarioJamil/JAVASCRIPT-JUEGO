import { random } from "./utils.js";


export default class Item {
    // static tiempo_pasado = 0;
    // static tiempo_entre_item = 500;

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.ancho = 30;
        this.alto = 30;
        this.velocidady = 1;
        this.velocidadx = 0;
        this.tipo = random(1, 3); // 1, 2 o 3
        this.color = this.tipo === 1 ? "red" : this.tipo === 2 ? "green" : "blue";
        this.imagen = new Image();
        
        switch (this.tipo) {
            case 1:
                this.imagen.src = 'recursos/X2.png';
                break;
            case 2:
                this.imagen.src = 'recursos/X3.png';
                break;
            case 3:
                this.imagen.src = 'recursos/X5.png';
                break;
        }

        // Crear el rectángulo del item para colisiones
        this.rect = {
            x: this.x,
            y: this.y,
            width: this.ancho,
            height: this.alto
        };
    }

    dibujar(ctx) {
        // Actualizar el rectángulo
        this.rect.x = this.x;
        this.rect.y = this.y;
        ctx.drawImage(this.imagen, this.x, this.y, this.ancho, this.alto);
    }

    movimiento() {
        this.y += this.velocidady;
    }
}
