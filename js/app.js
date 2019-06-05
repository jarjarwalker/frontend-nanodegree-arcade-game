//Enemy class
class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/enemy-bug.png';
        this.height = 65;
        this.width = 95;
        this.collision = false;
    }
    // Updates enemy position, once the bugs cross the screen this updates the bugs back to their starting position off screen
    update(dt) {

        let speed = (Math.floor(Math.random() * 4) + 1);
        if (this.x > (ctx.canvas.width)) {
            this.x = -200 * Math.floor((Math.random() * 4) + 1);
        } else {
            this.x += 150 * speed * dt;
        }
        // call collision function to check if the player has collided into the bugs, if collided the game resets
        if (collision(player.x, player.y, player.height, player.width, this.x, this.y, this.height, this.width)) {
            this.collision = true;

            if (player) {
                player.x = 200;
                player.y = 400;
            }
        } else {
            this.collision = false;
        }

    }
    //Draw the enemy on the screen
    render() {

        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    }
}
//Player class
class Player {

    constructor(x, y, sprite) {

        this.x = x;
        this.y = y;
        this.height = 75;
        this.width = 65;
        this.sprite = sprite; //sets the player image

    }
    //If player touches the water, the game ends and prompts an alert box
    update(dt) {
        if (this.y < 15) {
            swal("Good job!", "You made it to the other side", "success");
            this.x = 200;
            this.y = 400;

        }

    }
    //Draws player on screen
    render() {

        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    }
    //handles the keyboard event and keeps the player within the canvas
    handleInput(direction) {
        const horizontal = 101,
            vertical = 83;

        if (direction === 'left' && this.x - horizontal >= -101) {
            this.x -= horizontal;
        } else if (direction === 'right' && this.x + horizontal < (ctx.canvas.width - 101)) {
            this.x += horizontal;
        } else if (direction === 'down' && this.y + vertical < (ctx.canvas.height - 166)) {
            this.y += vertical;
        } else if (direction === 'up' && this.y - vertical >= (-83)) {
            this.y -= vertical;
        }

    }
}
//array of the enemy starting y positions
const enemyPosition = [55, 140, 230];
//player
const player = new Player(200, 400, 'images/char-boy.png');
//array of all the enemy objects
const allEnemies = enemyPosition.map((y, index) => {
    return new Enemy((-200 * (index + 1)), y);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. 
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
//function to check for any collisions
function collision(px, py, ph, pw, ex, ey, eh, ew) {

    return (Math.abs(px - ex) * 2 < pw + ew) && (Math.abs(py - ey) * 2 < ph + eh);

}
//function to alert the player if they won the game
let wonGame = function () {
    window.alert('You won the game');
}