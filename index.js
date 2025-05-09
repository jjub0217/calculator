const buttons = document.querySelectorAll(".button");
const numButtons = document.querySelectorAll(".button.number");
const display = document.querySelector(".display");
const clearBtn = document.querySelector(".clear-btn");

let isDecimal = false;


// 숫자를 마구 눌렀을 경우 .display 영역 밖으로 숫자들이 넘칠 경우
// 맥북 계산기에서 착안
const adjustFontSize = () => {
  const length = display.textContent.length;

  if (length < 7) {
    display.style.fontSize = "100px";
  } else if (length < 10) {
    display.style.fontSize = "70px";
  } else if (length < 14) {
    display.style.fontSize = "50px";
  } else {
    display.style.fontSize = "30px";
  }
};



const showDisplay = (btn, classList) => {
  const isBtnDecimal = [...classList].includes("decimal");

  // 소숫점을 다시 눌렀을 경우도 isBtnDecimal 은 소숫점 버튼을 누른거니까 이 역시 true이다. isBtnDecimal = true
  // 소숫점을 다시 눌렀을 경우엔 isDecimal 가 이미 true 로 상태가 변경되어 있음
  // 소숫점 버튼도 눌렀고, isDecimal 상태도 true 라면 무시


  if (isBtnDecimal && isDecimal ) return;

  // isBtnDecimal = true (소숫점 버튼 눌렸다)
  // 소수점이 처음 눌렸을 때만 isDecimal 이 true로 변경
  // isDecimal 의 상태 변경
  if (isBtnDecimal) {
    isDecimal = true;
  }
  
  if (display.textContent === "0") {
    display.textContent = "";

    // 소숫점 버튼을 처음 눌렀을 경우엔 '0.'으로 시작되게 하고, 그 외에는 그대로 입력
    display.textContent += isBtnDecimal ? "0." : btn;
    adjustFontSize();
  } else {
    display.textContent += btn;
    adjustFontSize()
  }
};

buttons.forEach((button) => {
  button.addEventListener("click", function (e) {
    console.log(e.target.textContent);
  });
});

numButtons.forEach((numButton) => {
  numButton.addEventListener("click", function (e) {
    let btnValue = e.target.textContent;
    let btnClassList = e.target.classList;
    showDisplay(btnValue, btnClassList);
  });
});

clearBtn.addEventListener("click", function () {
  display.textContent = "0";
  display.style.fontSize = "100px";
});





