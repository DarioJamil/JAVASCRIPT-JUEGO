export function detectarColision(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

export function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function mostrarHUD(ctx, puntos, vida, municion, bonus) {
    // Mostrar puntos
    ctx.fillStyle = "white";
    ctx.font = "12px Arial";
    ctx.fillText(`Puntos: ${puntos}`, 10, 20);

    // Mostrar vida
    ctx.fillText(`Vida: ${vida}`, 120, 20);

    // Mostrar municion
    ctx.fillText(`Municion: ${municion}`, 220, 20);

    // Mostrar Bonus
    ctx.fillText(`Bonus: ${bonus}`, 350, 20);
}
