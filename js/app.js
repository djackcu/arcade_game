// Entities our player must avoid
class Entity {
        
   constructor() {
   // Variables applied to each of our instances go here,
    // we've provided one for you to get started
        this.x = 0;
        this.y = 0;
        // The image/sprite for our entities, this uses
        // a helper we've provided to easily load images
        this.sprite = '';
    }
    
    // Update the entity's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(){

    }
    
    // Draw the entity on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

};

// Enemies our player must avoid
class Enemy extends Entity {
    constructor(row = 0, speedFactor = 1) {
        super();
        this.x = -90;
        this.y = 60 + row * 85;
        this.speed = 50 * speedFactor;
        this.sprite = 'images/enemy-bug.png';
    }

// Update the enemy's position, required method for game
    update(dt) {
        super.update();
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.speed * dt;
        (this.x >= 500)? this.x = -90 : true;
    }

    checkCollisions(pl) {
        if(this.x <= pl.x + 90 && this.x + 90 >= pl.x && this.y + 10 == pl.y){
            pl.lost();
        }

    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player extends Entity {
    constructor(){
        super();    
        this.x = 200;
        this.y = 410;
        this.sprite = 'images/char-boy.png';
        //attribute to store live and score
        this.live = 3;
        this.score = 0;
    }

    //Update the player when get the water
    update() {
        if(this.y <= 60){
            this.win();
            this.init();
        }
    }
    //Set the start position of the player
    init() {
            this.x = 200;
            this.y = 410;         
    }
    //method to lost live and restart position of player
    lost(){
        this.live--;
        this.init();
    }
    //method to increase the score 100 point to arrive to water
    win(score = 100){
        this.score += score;
    }

    //Method to handle the key, the player only will move if have lives
    handleInput(key) {
        //factor to move in x = 100
        //factor to move in y = 85
        if(this.live){    
            switch(key) {
                case 'left':
                    (this.x - 100 >= 0) ? this.x -=100 : false;
                    break;
                case 'right':
                    (this.x + 100 < 500) ? this.x +=100 : false;
                    break;
                case 'up':
                    (this.y - 85 >= -15) ? this.y -=85 : false;
                    break;
                case 'down':
                    (this.y + 85 <= 410) ? this.y +=85 : false;
                    break;
                default:
                    false;
            }
        } else if(key == 'esc'){
            this.reset();
        }
    }
    //Method to reset the player
    reset(){
        this.live = 3;
        this.score = 0;
        this.init();
    }

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let enemy1 = new Enemy(2);
let enemy2 = new Enemy(1,2);
let enemy3 = new Enemy(0,3);
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
        40: 'down',
        27: 'esc'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});