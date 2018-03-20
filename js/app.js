// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = Math.random() * -400;
    this.yPositions = [46, 138, 230];
    this.y = this.yPositions[Math.floor(Math.random() * 2.99)];
    this.speed = Math.random() * (450 - 200) + 200;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 501) {
        this.y = this.yPositions[Math.floor(Math.random() * 2.99)];
        this.x = -92;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Create some kind of collision box for the Enemies
Enemy.prototype.checkCollBox = function() {
    this.r = this.x + 65;
    this.l = this.x - 65;
    this.u = this.y - 50;
    this.d = this.y + 50;
};

// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.hasWon = false;
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 400;
};

Player.prototype.update = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        allEnemies[i].checkCollBox();
        if (player.x < allEnemies[i].r && player.x > allEnemies[i].l && player.y < allEnemies[i].d && player.y > allEnemies[i].u) {
            player.x = 202;
            player.y = 400;
        }
    }
    this.checkWon();

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.checkWon = function() {
    if (this.y < 60) {
        this.hasWon = true;
        this.isWon();
    }
};

Player.prototype.isWon = function () {
    if (this.hasWon = true) {
        alert("Você ganhou");
        this.x = 202;
        this.y = 400;
    }
};

Player.prototype.handleInput = function(k) {
    switch (k) {
        case 'right':
            if ((this.x + 100) < 480) {
                this.x += 100;
            }
            break;
        case 'left':
            if ((this.x - 100) > 0) {
                this.x -= 100;
            }
            break;
        case 'up':
            if ((this.y - 83) > -30) {
                this.y -= 83;
            }
            break;
        case 'down':
            if ((this.y + 83) < 480) {
                this.y += 83;
            }
    }
};

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

while (allEnemies.length <7) {
    allEnemies.push(new Enemy());
}

var player = new Player();

// This listens for key presses and sends the keys to
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
};

    player.handleInput(allowedKeys[e.keyCode]);
});

