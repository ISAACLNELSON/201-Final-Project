'use strict';

var attackChoices = ['sword', 'spell', 'shield'];

var currentUserChoice = '';

var SCORE_DATA = 'SCORE_DATA';

var scoreData = '';

var badGuyChoice = '';

var winCountingArray = [0, 0]; // [0] is currentUser , [1] is badGuy

var scoreBoardReference = document.getElementById('scoreBoard');

var currentUser = {
  winLossHistory: [0, 0],
  userHistory: 0
};

var scoreString = document.createElement('p');
var dialogueString = document.createElement('p');
var choiceString = document.createElement('p');

// Reference for hearing the Clear Local Data <a href> button

// var clearDataReference = document.getElementById('clearData');
// clearDataReference.addEventListener('click', clearDataFunction);

//  Local Storage set into User array

if (SCORE_DATA === null) {
  var userArray = [];
} else {
  var jsonData = localStorage.getItem(SCORE_DATA);
  var arrayFromLs = JSON.parse(jsonData);
  arrayFromLs.push(userArray);
}

var User = function (name) {
  this.name = name;
  this.winLossHistory = [0, 0];
  this.userHistory = 0;

  this.saveToLocal = function () {
    userArray.push(this);
    scoreData = JSON.stringify(userArray);//can parse here
    localStorage.setItem(SCORE_DATA, scoreData);
  };
};

//  To Remove Local Data, there is a clicker beneath About Us in index

function clearDataFunction() {
  localStorage.removeItem(SCORE_DATA);
}

// sword beats spell, spell beats shield, shield beats sword

var swordTarget = document.getElementById('swordTarget');
var spellTarget = document.getElementById('spellTarget');
var shieldTarget = document.getElementById('shieldTarget');


// Action Listeners with What Happens when Clicked

swordTarget.addEventListener('click', event => {
  currentUserChoice = 'sword';
  battleFunction();
});

spellTarget.addEventListener('click', event => {
  currentUserChoice = 'spell';
  battleFunction();
});

shieldTarget.addEventListener('click', event => {
  currentUserChoice = 'shield';
  battleFunction();
});

// Current Scoreboard Render

function scoreBoard() {
  scoreString.textContent = `User: ${winCountingArray[0]}, Enemy: ${winCountingArray[1]}`;
  if (!winCountingArray.includes(3)) {
    choiceString.textContent = `${currentUserChoice} vs ${badGuyChoice}`;
  } else {
    choiceString.textContent = '';
  }
  scoreBoardReference.append(scoreString);
  scoreBoardReference.append(dialogueString);
  scoreBoardReference.append(choiceString);
}

//  Evaluate the Battle

function battleFunction() {

  badGuyChoice = attackChoices[Math.floor(Math.random() * 3)];
  if (currentUserChoice === badGuyChoice) {
    // draw condition
    dialogueString.textContent = 'It was a draw!';
  } else if ((currentUserChoice === 'sword' && badGuyChoice === 'spell') ||
    (currentUserChoice === 'spell' && badGuyChoice === 'shield') ||
    (currentUserChoice === 'shield' && badGuyChoice === 'sword')) {
    // user win condition
    switch (currentUserChoice) {
      case 'sword':
        dialogueString.textContent = 'Your sword removes their limbs!';
        break;
      case 'shield':
        dialogueString.textContent = 'Your shield deflects the sword blow!';
        break;
      case 'spell':
        dialogueString.textContent = 'Your spell crushes their aspirations!';
        break;
      default:
        break;
    }
    winCountingArray[0]++;
  } else {
    // enemy win condtion
    switch (badGuyChoice) {
      case 'sword':
        dialogueString.textContent = 'Enemy sword disembowels you!';
        break;
      case 'shield':
        dialogueString.textContent = 'Enemy shield laughs at your sword!';
        break;
      case 'spell':
        dialogueString.textContent = 'Enemy spell really ruins your day!';
        break;
      default:
        break;
    }
    winCountingArray[1]++;
  }
  scoreBoard();

  if (winCountingArray.includes(3)) {
    winDetected();
  }
}

// peter - in the spirit of small functions,
// peter - I moved win check to its' own function

function winDetected() {
  currentUser.userHistory++;

  if (winCountingArray[0] > winCountingArray[1]) {
    currentUser.winLossHistory[0]++;
    dialogueString.textContent = 'GLORY TO THE USER';

  } else if (winCountingArray[0] < winCountingArray[1]) {
    currentUser.winLossHistory[1]++;
    dialogueString.textContent = 'DIE, USER SCUM!';
  }
  scoreBoard();
  var playAgain = confirm('Would you like to play again?');
  if (playAgain === true) {
    winCountingArray = [0, 0];
  } else {
    winCountingArray = [0, 0];
    var newUser = prompt('Input Name: ');
    var scoreObj = [];
    scoreObj = new User(newUser); //data constructed to obj
    scoreObj.userHistory = currentUser.userHistory;
    scoreObj.winLossHistory = currentUser.winLossHistory;
    scoreObj.saveToLocal();
  }
}

// ===============================================================

//ARTIFACT ANIMATION CODE

// var SPRITE_SIZE = 32;

// var canvas = document.getElementById('gameScreen');
// var ctx = canvas.getContext('2d');

// //preloading all images
// // var cloudImage = new Image();
// // cloudImage.src = "images/cloud1.png";

// // var cloudImage2 = new Image();
// // cloudImage2.src = "images/cloud2.png";

// // var cloudImage3 = new Image();
// // cloudImage3.src = "images/cloud3.png";

// var backgroundImg = new Image();
// backgroundImg.src = 'images/BG.png';

// swordTarget.src = 'images/swordSprite.png';
// spellTarget.src = 'images/spellSprite.png';
// shieldTarget.src = 'images/shieldSprite.png';

// var backgroundImg = new Image();
// backgroundImg.src = 'images/BG.png';

// var CharAnimation = function (frameSet) {
//   this.count = 0,
//   this.delay = 20,
//   this.frame = 0,
//   this.frameSet = frameSet,
//   this.frameIndex = 0,

//   //for an animation use the change function to change to it and change the frameset to an array of animation. the animation may also need to be its own object.
//   this.change = function (frameSet, delay) {
//     if (this.frameSet !== frameSet) {

//       this.count = 0;
//       this.delay = delay;
//       this.frameIndex = 0;
//       this.frameSet = frameSet;
//       this.frame = frameSet[this.frameIndex];
//     }
//   },

//   this.update = function () {
//     this.count++;

//     if (this.count >= this.delay) {
//       this.count = 0;


//       if (this.frameIndex === 1) {
//         this.frameIndex = 0;
//       } else {
//         this.frameIndex += 1;
//       }
//     }
//     this.frame = this.frameSet[this.frameIndex];
//   };

// };

// var banditSpriteSheet = {
//   frameSet: [[0, 1]],
//   image: new Image()

// };

// banditSpriteSheet.image.src = 'images/banditIdle32.png';

// var goodGuySpriteSheet = {

//   frameSet: [[0, 1], [2, 3], [4, 5], [6, 7], [8, 9]],
//   image: new Image()

// };

// goodGuySpriteSheet.image.src = 'images/pallySheet.png';

// var banditIdle = {
//   animation: new CharAnimation(banditSpriteSheet.frameSet),
//   height: 32,
//   width: 32,
//   x: 150,
//   y: 165
// };

// var goodGuyIdle = {
//   animation: new CharAnimation(goodGuySpriteSheet.frameSet),
//   height: 32,
//   width: 32,
//   x: 85,
//   y: 165
// };

// var loop = function () {
//   goodGuyIdle.animation.change(goodGuySpriteSheet.frameSet[2], 40);
//   banditIdle.animation.change(banditSpriteSheet.frameSet[0], 20);
//   ctx.clearRect(0, 0, 480, 640);
//   ctx.drawImage(backgroundImg, 0, 0);
//   ctx.drawImage(goodGuySpriteSheet.image, goodGuyIdle.animation.frame * SPRITE_SIZE,
//     0, SPRITE_SIZE, SPRITE_SIZE, Math.floor(goodGuyIdle.x), Math.floor(goodGuyIdle.y), SPRITE_SIZE, SPRITE_SIZE);

//   ctx.drawImage(banditSpriteSheet.image, banditIdle.animation.frame * SPRITE_SIZE, 0,
//     SPRITE_SIZE, SPRITE_SIZE, Math.floor(banditIdle.x), Math.floor(banditIdle.y), SPRITE_SIZE, SPRITE_SIZE);

//   banditIdle.animation.update();
//   goodGuyIdle.animation.update();
//   window.requestAnimationFrame(loop);

// };

// function renderNewSprite(image, x, y) {
//   image.onload = function () {
//     ctx.drawImage(image, x, y);
//   };

// }

//the constructor for new sprites on the canvas

// var Asset = function (image, x, y, velocity) {
//   this.image = image;
//   this.x = x;
//   this.y = y;
//   this.velocity = velocity;


//   renderNewSprite(image, x, y);


// goodGuySpriteSheet.image.addEventListener('load', function (event) {

//   window.requestAnimationFrame(loop);

// });

// //character animation functions
// function idle() {
//     //plays idle animation


// }

// function ggSwordbgSword() {
//     //plays animation
// }

// function ggSwordbgSpell() {
//     //plays animation
// }

// function ggSwordbgSheild() {
//     //plays animation
// }

// function ggShieldbgSword() {
//     //plays animation
// }

// function ggShieldbgSpell() {
//     //plays animation
// }

// function ggShieldbgSheild() {
//     //plays animation
// }

// function ggSpellbgSword() {
//     //plays animation
// }

// function ggSpellbgSpell() {
//     //plays animation
// }

// function ggSpellbgSheild() {
//     //plays animation

// to do list, Refactoring with phaser!! :D
//idle with phaser,
//buttons with pahser?
//animate with phaser!

class SceneMain extends Phaser.Scene {
  constructor() {
    super('SceneMain');
  }
  preload() {
    this.load.image("BG", "images/BG.png");
    this.load.spritesheet("pallyNewIdle", "images/pallyNewIdle.png", { frameWidth: 32, frameHeight: 32 });
    // this.load.image("cloud1", "images/cloud1.png");
    // this.load.image("cloud2", "images/cloud2.png");
    // this.load.image("cloud3", "images/cloud3.png");
    // this.load.image("swordSprite", "images/swordSprite.png");
    // this.load.image("spellSprite", "images/spellSprite.png");
    // this.load.image("shieldSprite", "images/shieldSprite.png");
    this.load.spritesheet("banditIdle32", "images/banditIdle32.png", { frameWidth: 32, frameHeight: 32 });
    // this.load.image("ground", "images/ground.png");
  }
  create() {
    let background = this.add.image(game.config.width / 2, game.config.height / 2, "BG");

    // this.cloud1 = this.add.image(72, 38, "cloud1");
    // this.cloud2 = this.add.image(225, 53, "cloud2");
    // this.cloud3 = this.add.image(602, 29, "cloud3");

    this.char = this.add.sprite(190, 335, "pallyNewIdle");
    this.anims.create({
      key: 'pallyIdle',
      frames: [
        { key: 'pallyNewIdle', frame: 0 },
        { key: 'pallyNewIdle', frame: 1 },
      ],
      frameRate: 3.2,
      repeat: -1
    });
    this.char.play('pallyIdle');

    this.char = this.add.sprite(290, 339, "banditIdle32");

    this.anims.create({
      key: 'badIdle',
      frames: [
        { key: 'banditIdle32', frame: 0 },
        { key: 'banditIdle32', frame: 1 },
      ],
      frameRate: 3.2,
      repeat: -1
    });
    this.char.play('badIdle');

    // this.ground = this.add.image(game.config.width / 2, game.config.height / 2, "ground");

    // this.swordSprite = this.add.image(70, 506, "swordSprite");
    // this.swordSprite.setInteractive();
    // this.swordSprite.on('pointerdown', this.swordOnDown, this);
    // this.swordSprite.on('pointerup', this.swordOnUp, this);

    // this.spellSprite = this.add.image(215, 515, "spellSprite");
    // this.spellSprite.setInteractive();
    // this.spellSprite.on('pointerdown', this.spellOnDown, this);
    // this.spellSprite.on('pointerup', this.spellOnUp, this);

    // this.shieldSprite = this.add.image(385, 525, "shieldSprite");
    // this.shieldSprite.setInteractive();
    // this.shieldSprite.on('pointerdown', this.shieldOnDown, this);
    // this.shieldSprite.on('pointerup', this.shieldOnUp, this);


    
// }
// shieldOnUp() {
//   this.shieldSprite.alpha = 1;
// }
// shieldOnDown() {
//   this.shieldSprite.alpha = .5;
// }
// spellOnUp() {
//   this.spellSprite.alpha = 1;
// }
// spellOnDown() {
//   this.spellSprite.alpha = .5;
// }
// swordOnUp() {
//   this.swordSprite.alpha = 1;
// }
// swordOnDown() {
//   this.swordSprite.alpha = .5;
// }
// update() {
//   // this.cloud1.x += .1;
//   // if (this.cloud1.x > game.config.width + 100) {
//   //   this.cloud1.x = -100;
//   // }
//   // this.cloud2.x += .09;
//   // if (this.cloud2.x > game.config.width + 100) {
//   //   this.cloud2.x = -100;
//   // }
//   // this.cloud3.x += .075;
//   // if (this.cloud3.x > game.config.width + 100) {
//   //   this.cloud3.x = -100;
//   // }

// }
}

}