// Phone Users Keyboard Pop up 
document.getElementById("openKeyboard").addEventListener("click", function () {
    let inputElement = document.getElementById("hiddenInput");
    inputElement.style.visibility = 'visible'; // unhide the input
    inputElement.focus(); // focus on it so keyboard pops
    inputElement.style.visibility = 'hidden'; // hide it again
  });

// Variables for DOM manipulation
let gamesWon = document.getElementById("wincount");
let gamesLost = document.getElementById("lostcount");
let result = document.getElementById("finalmessage");
let wordsUsedSpan = document.getElementById("wordsused");
let answerSpan = document.getElementById("answer");
let message = document.getElementById("finalmessage");
let chancesSpan = document.getElementById("chancescount");
let image = document.getElementById("image");
let audioLose = document.createElement("audio");
audioLose.setAttribute("src", "assets/sounds/lose.mp3");
let audioWin = document.createElement("audio");
audioWin.setAttribute("src", "assets/sounds/win.mp3");

// Variables I wanted to leave outside
var randomNumber;

// Game Object
var gameObject = {
  imgName: ["assets/images/madonna.jpg", "assets/images/seventies.jpg", "assets/images/random.jpg", "assets/images/ayuwoki.jpg", "assets/images/problem.png"],
  userPressed: "",
  canUse: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
  words: ["madonna", "seventies", "random", "jackson", "problem"],
  wordsUsed: [],
  answer: [],
  wordArray: [],
  chances: 10,
  arrayTracker: 0,
  wins: 0,
  losses: 0,
  wArrayString: "",
  aArrayString: "",
  checkWin: function (string1, string2) {
    if (string1 === string2) {
      audioWin.play();
      message.innerHTML = "You won!";
      this.changeImage(randomNumber);
      this.wins++
      gamesWon.innerHTML = this.wins;
      this.reset();
    }
    else if (this.chances === 0) {
      audioLose.play();
      message.innerHTML = "You lost!";
      this.losses++;
      gamesLost.innerHTML = this.losses;
      this.reset();
    }
  },
  guessed: function (rand) {
    for (i = 0; i < rand.length; i++) {
      if (this.userPressed === this.wordArray[i]) {
        this.answer[i] = this.wordArray[i];
      }
    }
  },
  setSpaces: function (string) {
    for (i = 0; i < string.length; i++) {
      this.answer[i] = "_";
    }
  },
  wordToArray: function (string) {
    this.wordArray = [];
    for (i = 0; i < string.length; i++) {
      this.wordArray[i] = string.charAt(i);
    }
  },
  wordChecker: function (word) {
    this.update();
    if (this.wordsUsed.includes(word) || this.answer.includes(word)) {
      message.innerHTML = "You already tried this word!";
      this.checkWin(this.wArrayString, this.aArrayString);
    }
    else if (this.canUse.includes(word) === false) {
      message.innerHTML = "You can only use words!";
    }
    else {
      if (this.wordArray.includes(word) && this.answer.includes(word) === false) {
        this.update();
        message.innerHTML = "You guessed a word";
        this.checkWin(this.wArrayString, this.aArrayString);
      }
      else if (this.wordsUsed.includes(word) === false) {
        message.innerHTML = "Try again";
        this.wordsUsed[this.arrayTracker] = this.userPressed;
        this.arrayTracker++;
        this.chances--;
        wordsUsedSpan.innerHTML = this.wordsUsed.join(", ");
        chancesSpan.innerHTML = this.chances;
        if (this.chances === 0) {
          this.checkWin(this.wArrayString, this.aArrayString);
        }
      }
    }
  },
  reset: function () {
    this.answer = [];
    this.wordsUsed = [];
    this.chances = 10;
    chancesSpan.innerHTML = this.chances;
    this.arrayTracker = 0;
    this.wArrayString = "";
    this.aArrayString = "";
    wordsUsedSpan.innerHTML = this.wordsUsed.join(", ");
    this.update();
    this.game();
  },
  changeImage: function (number) {
    var imgSrc = image.src;
    image.src = image.src.replace(imgSrc, gameObject.imgName[number]);
  },
  update: function () {
    this.aArrayString = "";
    this.wArrayString = "";
    this.wArrayString = this.wordArray.join("");
    this.aArrayString = this.answer.join("");
  },
  game: function () {
    randomNumber = Math.floor(Math.random() * gameObject.words.length);
    var rand = gameObject.words[randomNumber];
    this.wordToArray(rand);
    this.setSpaces(rand);
    this.wArrayString = this.wordArray.join("");
    this.aArrayString = this.answer.join("");
    answerSpan.innerHTML = this.answer.join(" , ");
  }
};

// Key Functions 
document.onkeydown = function (event) {
  gameObject.userPressed = event.key.toLowerCase();
  gameObject.update();
}

document.onkeyup = function (event) {
  gameObject.wordChecker(gameObject.userPressed);
  gameObject.guessed(gameObject.wordArray);
  answerSpan.innerHTML = gameObject.answer.join(" , ");
  gameObject.update();
  gameObject.checkWin(gameObject.wArrayString, gameObject.aArrayString);
}




gameObject.game();
