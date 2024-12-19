export class Bala {
    constructor(x, y, velocidadX = 0) {
        this.x = x;
        this.y = y;
        this.ancho = 20;
        this.alto = 20;
        this.velocidadY = -5; // Velocidad en el eje Y
        this.velocidadX = velocidadX; // Velocidad en el eje X (diagonal)
        this.imagen = new Image();
        this.imagen.src = "recursos/bala(1).png"; // Ruta de la imagen
    }

    // Dibujar la bala en el canvas
    dibujar(ctx) {
        ctx.drawImage(this.imagen, this.x, this.y, this.ancho, this.alto);
    }

    // Movimiento de la bala
    movimiento() {
        this.y += this.velocidadY;
        this.x += this.velocidadX;
    }
}

export function crearBala(player, balas) {
    switch (player.tipoDisparo) {
        case 0:
            balas.push(new Bala(player.x + 11, player.y - 4));
            break;
        case 1:
            balas.push(new Bala(player.x, player.y - 4));
            balas.push(new Bala(player.x + 22, player.y - 4));
            player.municion -= 2;
            if (player.municion <= 0) {
                player.tipoDisparo = 0;
                player.municion = 0;
            }
            break;
        case 2:
            balas.push(new Bala(player.x, player.y - 4));
            balas.push(new Bala(player.x + 11, player.y - 4));
            balas.push(new Bala(player.x + 22, player.y - 4));
            player.municion -= 3;
            if (player.municion <= 0) {
                player.tipoDisparo = 0;
                player.municion = 0;
            }
            break;
        case 3:
            balas.push(new Bala(player.x - 11, player.y - 4, -2));
            balas.push(new Bala(player.x, player.y - 4));
            balas.push(new Bala(player.x + 11, player.y - 4));
            balas.push(new Bala(player.x + 22, player.y - 4));
            balas.push(new Bala(player.x + 33, player.y - 4, 2));
            player.municion -= 5;
            if (player.municion <= 0) {
                player.tipoDisparo = 0;
                player.municion = 0;
            }
            break;
        default:
            break;
    }
    // Opcional: Reproducir sonido
    const sonidoDisparo = new Audio("recursos/disparo.mp3");
    sonidoDisparo.play();
}

export default Bala;
