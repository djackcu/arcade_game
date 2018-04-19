// Entities our player must avoid
var Entity = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0;
    this.y = 0;
    // The image/sprite for our entities, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the entity's position, required method for game
// Parameter: dt, a time delta between ticks
Entity.prototype.update = function(dt) {

};

// Draw the entity on the screen, required method for game
Entity.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function(row = 0, speedFactor = 1) {
    Entity.prototype = Object.call(this);
    this.x = -90;
    this.y = 60 + row * 85;
    this.speed = 30 * speedFactor;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

    // Update the enemy's position, required method for game
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    Entity.prototype = Object.call(this);
    this.sprite = 'images/char-boy.png';
    this.x = 200-100;
    this.y = 400-85;
};

Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

Player.prototype.handleInput = function(key) {
    //factor to move in x = 100
    //factor to move in y = 85

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let enemy1 = new Enemy(2);
let enemy2 = new Enemy(1,1.5);
let enemy3 = new Enemy(0,2);
let player = new Player();
var allEnemies = [];
allEnemies.push(enemy1,enemy2,enemy3);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});