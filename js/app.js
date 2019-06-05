// Enemies our player must avoid
let debug = false;
let game = true;

class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/enemy-bug.png';
        this.height = 65;
        this.width = 95;
        this.collision = false;
    }

    update(dt) {

        let speed = (Math.floor(Math.random() * 4) + 1);
        if (this.x > (ctx.canvas.width)) {
            this.x = -200 * Math.floor((Math.random() * 4) + 1);
        } else {
            this.x += 150 * speed * dt;
        }

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

    render() {

        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    }
}

class Player {

    constructor(x, y, sprite) {

        this.x = x;
        this.y = y;
        this.height = 75;
        this.width = 65;
        this.sprite = sprite;

    }
    //If player touches the water, the game ends and prompts an alert box
    update(dt) {
        if(game && this.y < 15){
            swal("Good job!", "You made it to the other side", "success");
            this.x = 200;
            this.y = 400;

        }

    }

    render() {

        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    }

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

const enemyPosition = [55, 140, 230];

const player = new Player(200, 400, 'images/char-boy.png');

const allEnemies = enemyPosition.map((y, index) => {
    return new Enemy((-200 * (index + 1)), y);
});





// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.




// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

// Place the player object in a variable called player




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

function collision(px, py, ph, pw, ex, ey, eh, ew) {

    return (Math.abs(px - ex) * 2 < pw + ew) && (Math.abs(py - ey) * 2 < ph + eh);

}

let wonGame = function() {
    window.alert('You won the game');
}