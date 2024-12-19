export class Bala {
    constructor(x, y, velocidadX = 0) {
        this.x = x;
        this.y = y;
        this.ancho = 20;
        this.alto = 20;
        this.velocidadY = -5;
        this.velocidadX = velocidadX;
        this.imagen = new Image();
        this.imagen.src = "recursos/bala(1).png";
    }

    dibujar(ctx) {
        ctx.drawImage(this.imagen, this.x, this.y, this.ancho, this.alto);
    }

    movimiento() {
        this.y += this.velocidadY;
        this.x += this.velocidadX;
    }
}

export function crearBala(player, balas) {
    switch (player.tipoDisparo) {
        case 0: // Disparo sencillo
            balas.push(new Bala(player.x + player.ancho / 2 - 10, player.y - 10));
            break;
        case 1: // Disparo doble
            balas.push(new Bala(player.x + 5, player.y - 10));
            balas.push(new Bala(player.x + player.ancho - 15, player.y - 10));
            player.municion -= 2;
            break;
        case 2: // Disparo triple
            balas.push(new Bala(player.x, player.y - 10));
            balas.push(new Bala(player.x + player.ancho / 2 - 10, player.y - 10));
            balas.push(new Bala(player.x + player.ancho - 20, player.y - 10));
            player.municion -= 3;
            break;
        case 3: // Disparo quíntuple
            balas.push(new Bala(player.x - 10, player.y - 10, -2));
            balas.push(new Bala(player.x, player.y - 10, -1));
            balas.push(new Bala(player.x + player.ancho / 2 - 10, player.y - 10));
            balas.push(new Bala(player.x + player.ancho - 20, player.y - 10, 1));
            balas.push(new Bala(player.x + player.ancho + 10, player.y - 10, 2));
            player.municion -= 5;
            break;
        default:
            break;
    }

    // Volver al disparo básico si la munición se agota
    if (player.municion <= 0) {
        player.tipoDisparo = 0;
        player.municion = 0;
    }

    // Reproducir sonido de disparo
    const sonidoDisparo = new Audio("recursos/disparo.mp3");
    sonidoDisparo.play();
}
