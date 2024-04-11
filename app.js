let on = false;
let strict = false;
let win = false;
let colorArr = [];
let choiceArr = [];
let count = 1;
let correctCount = 0;
let index = 0;

const turnCounter = document.querySelector("#turn");
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

strictButton.addEventListener("click", () => {
  if (strictButton.checked == true) {
    strict = true;
  } else {
    strict = false;
  }
});

onButton.addEventListener("click", () => {
  if (onButton.checked == true) {
    on = true;
    turnCounter.innerText = "-";
  } else {
    on = false;
    turnCounter.innerText = "";
  }
});

startButton.addEventListener("click", () => {
  if (on) {
    play();
  }
});

function play() {
  turnCounter.innerText = count;
  randomColor();
  flashStart();
}

function randomColor() {
  for (let i = 0; i < count; i++) {
    colorArr.push(Math.floor(Math.random() * 4));
  }
}

function flashStart() {
  let i = 0;
  const interval = setInterval(() => {
    flashColor(i);
    i++; // i 변수를 증가시켜 다음 컬러를 플래시할 준비를 함
    setTimeout(() => {
      clearFlash();
    }, 300);
    if (i >= colorArr.length) {
      clearInterval(interval); // 모든 컬러를 플래시했을 때 interval을 종료함
    }
  }, 800);
}

function flashColor(i) {
  switch (colorArr[i]) {
    case 0:
      flashTopLeft();
      break;
    case 1:
      flashTopRight();
      break;
    case 2:
      flashBottomLeft();
      break;
    case 3:
      flashBottomRight();
      break;
  }
}

function flashTopLeft() {
  topLeft.style.backgroundColor = "lightgreen";
}
function flashTopRight() {
  topRight.style.backgroundColor = "tomato";
}
function flashBottomLeft() {
  bottomLeft.style.backgroundColor = "yellow";
}
function flashBottomRight() {
  bottomRight.style.backgroundColor = "lightskyblue";
}

function clearFlash() {
  topLeft.style.backgroundColor = "darkgreen";
  topRight.style.backgroundColor = "darkred";
  bottomLeft.style.backgroundColor = "goldenrod";
  bottomRight.style.backgroundColor = "darkblue";
}

function flashAll() {
  topLeft.style.backgroundColor = "lightgreen";
  topRight.style.backgroundColor = "tomato";
  bottomLeft.style.backgroundColor = "yellow";
  bottomRight.style.backgroundColor = "lightskyblue";
}

topLeft.addEventListener("click", () => {
  if (on) {
    choiceArr.push(0);
    if (check(index) == true) {
      flashTopLeft();
    }
    winCheck();
  }
});

topRight.addEventListener("click", () => {
  if (on) {
    choiceArr.push(1);
    if (check(index) == true) {
      flashTopRight();
    }
    winCheck();
  }
});

bottomLeft.addEventListener("click", () => {
  if (on) {
    choiceArr.push(2);
    if (check(index) == true) {
      flashBottomLeft();
    }
    winCheck();
  }
});

bottomRight.addEventListener("click", () => {
  if (on) {
    choiceArr.push(3);
    if (check(index) == true) {
      flashBottomRight();
    }
    winCheck();
  }
});

function winCheck() {
  if (index == count) {
    count++;
    index = 0;
    colorArr = [];
    choiceArr = [];
    play();
  }
}

function check(i) {
  console.log(colorArr + 'dd' + choiceArr)

  if (colorArr[i] == choiceArr[i]) {
    setTimeout(() => {
      clearFlash();
    }, 300);
    index ++;
    return true;

  } else {
    flashAll();
    setTimeout(() => {
      clearFlash();
    }, 300);
    choiceArr = [];
    index = 0;

    turnCounter.innerText = 'NO!';

    if(strict) {
      count = 1;
      colorArr = [];
      play();
    }

    return false;
  }
}