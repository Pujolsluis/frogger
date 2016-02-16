// Enemies our player must avoid
var Enemy = function () {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.xRange = [-150, 600];
    this.yRange = [60, 140,220];
    this.speedRange = [150, 600];
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.reset();
};

Enemy.prototype.reset = function () {
    var startPos = this.xRange[0];
    
    this.x = startPos;
    this.y = this.getRandomY();
    this.speed = this.getRandomSpeed();
    
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var maxPos = this.xRange[1];
    this.x += this.speed * dt;
    
    if (this.x > maxPos) {
        this.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.getRandomY = function () {
    return this.yRange[Math.floor(Math.random() * this.yRange.length)];
};

Enemy.prototype.getRandomSpeed = function() {
    var minSpeed = this.speedRange[0];
    var maxSpeed = this.speedRange[1];
    
    return Math.floor(Math.random() * (maxSpeed - minSpeed)) + minSpeed;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (personaje) {
    this.xRange = [-5, 402];
    this.yRange = [-30, 380];
    this.points = 0;
    if(personaje === 'Boy')
    this.sprite = 'images/char-boy.png';
    else if(personaje === 'Cat Girl')
        this.sprite = 'images/char-cat-girl.png';
    else if(personaje === 'Horn Girl')
        this.sprite = 'images/char-horn-girl.png';
    else if (personaje === 'Pink Girl')
        this.sprite = 'images/char-pink-girl.png';
    else if (personaje === 'Princess Girl')
        this.sprite = 'images/char-princess-girl.png';
    else
        this.sprite = 'images/char-boy.png';
    this.reset();
};

Player.prototype.update = function () {
    this.checkCollisions();
};

Player.prototype.checkCollisions = function () {
    if (this.y === -20  ){
        alert("You Win, Try it Again!");
        this.reset();
    }
    
    else if(this.y >= 60 && this.y <= 670){
            var self = this;
            allStars.forEach(function(Star){
                if(Star.y === self.y){
                if(Star.x >= player.x - 30 && Star.x <= player.x + 30){
                    Star.reset();
                    self.points += 10;
                    score = self.points;
                    console.log("Score: " + score);
                    console.log("You now have " + self.points + " Points!");
                }
            }
        }
    )
    
      if(this.y >= 60 && this.y <= 220){
        var self = this;
        allEnemies.forEach(function(enemy){
                if(enemy.y === self.y){
                    if(enemy.x >= player.x - 30 && enemy.x <= player.x + 30){
                    self.reset();
                    score = self.points;
                    console.log("Score: " + score);
                    console.log("You Loss!, Ohh noo all my points have gone away :'( ");
                    }
                }
            });
      }
    
    };
}

Player.prototype.reset = function(){
    this.x = 200;
    this.y = 380;
    this.points = 0;
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key){
    if (key === 'left') {
            this.x -= (this.x - 101 < this.xRange[0]) ? 0 : 101;
    }
    else if (key === 'right') {
        this.x += (this.x + 101 > this.xRange[1]) ? 0 : 101;
    }
    else if (key === 'up') {
        this.y -= (this.y - 80 < this.yRange[0]) ? 0 : 80;
    }
    else if (key === 'down') {
        this.y += (this.y + 80 > this.yRange[1]) ? 0 : 80; 
    }
}

//Setting Up Global Score Variable.
var score = 0;
var getPlayerScore = function(){
    return score;
};

//Setting Up Star Feature
var Star = function(){
    //this.xRange = [100, 350];
    //this.yRange = [300, 380];
    this.xRange = [0, 100, 200, 300, 400];
    this.yRange = [60, 140, 220, 380];
//    this.x = 300;
//    this.y = 380;
    this.spawn = 0;
    this.sprite = 'images/Star.png';
    this.reset();
};

Star.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Star.prototype.reset = function(){
    //console.log("Hello");
    this.x = this.getRandomX();
    this.y = this.getRandomY();
//    if(this.spawn < 1){
//        this.x = this.getRandomX();
//        this.y = this.getRandomY();
//        this.spawn++;
//    }
//    else{
//        this.x = -150;
//        this.y = -150;
//        var clock = setInterval(randompos, 1000);
//        var randompos = function(){
//                this.x = this.getRandomX();
//                this.y = this.getRandomY();
//                }
//    }
    
}

Star.prototype.getRandomY = function(){
    return this.yRange[Math.floor(Math.random() * this.yRange.length)];
}

Star.prototype.getRandomX = function(){
    return this.xRange[Math.floor(Math.random() * this.xRange.length)];
}

/* Implemented Starting Point. [Must Make an image for it]
var StartPoint = function(){
    this.x = 200;
    this.y = 380;
    this.sprite = 'images/Selector.png';
}

StartPoint.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
*/

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
//var enemy1 = new Enemy();
//var enemy2 = new Enemy();
//var enemy3 = new Enemy();
//var enemy4 = new Enemy();
//var enemy5 = new Enemy();
//var enemy6 = new Enemy();
//var enemy7 = new Enemy();
//var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5,enemy6,enemy7];

var allEnemies = new Array;


for(var i=0; i < 3; i++){
    var temp = new Enemy();
    allEnemies[i] = temp;
}
var personaje = prompt("Cual personaje deseas?\n-Boy\n-Cat Girl\n-Horn Girl\n-Pink Girl\n-Princess Girl");
var player = new Player(personaje);

var Star = new Star();

var allStars = new Array;
allStars[0] = Star;

/*
[Part por Implemented Starting Point]
var Start = new StartPoint();

*/


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
