const buttons = document.querySelectorAll(".button");
const numButtons = document.querySelectorAll(".button.number");
const display = document.querySelector(".display");
const clearBtn = document.querySelector(".clear-btn");
const operatorButtons = document.querySelectorAll(".operator");
const equalBtn = document.querySelector(".equal-btn");

let firstOperand = "";
let operator = "";

let isDecimal = false;
let isOperator = false;

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


// 첫번째 피연산자 저장, 연산자 저장, 연산자 버튼 누른 상태 변경 함수, 
const handleOperator = (clickedOperator) => {

  firstOperand = display.textContent;
  operatorValue = clickedOperator;
  isOperator = true;
    console.log(
      `firstOperand: ${display.textContent}, operator: ${clickedOperator}`
    );
};


// 연산 처리 함수
const handleEqual = () => {

  // 처음부터 소숫점 버튼만 눌려 있는 경우랑 한글자도 입력하지 않은 상태라면 "0" 을 디스플레이에 표시
  const isOnlyDecimalPressed = isDecimal && display.textContent.length <= 1;
  secondOperand = isOnlyDecimalPressed ? "0" : display.textContent;



  // 연산 함수
  const result = calculate(firstOperand, operatorValue, secondOperand);

  display.textContent = isNaN(result) ? "Error" : parseFloat(result.toFixed(3));

  adjustFontSize();
  
  firstOperand = display.textContent;
  operator = "";
  isDecimal = false;
  isOperator = false;
}


// 연산 함수
const calculate = (firstOperand, operatorValue, secondOperand) => {

  firstOperand = parseFloat(firstOperand);
  secondOperand = parseFloat(secondOperand);

  switch (operatorValue) {
    case "+":
      return firstOperand + secondOperand;
    case "-":
      return firstOperand - secondOperand;
    case "*":
      return firstOperand * secondOperand;
    case "/":
      return secondOperand === 0 ? "Error" : firstOperand / secondOperand;
    default:
      console.log("연산할수 없습니다.");
  }
};


// 사용자 입력 처리 함수
const showDisplay = (btn, classList) => {

  const isBtnDecimal = classList.contains("decimal");

  // 소숫점 중복 입력 방지
  // 소숫점을 다시 눌렀을 경우도 isBtnDecimal 은 소숫점 버튼을 누른거니까 이 역시 true이다. isBtnDecimal = true
  // 소숫점을 다시 눌렀을 경우엔 isDecimal 가 이미 true 로 상태가 변경되어 있음
  // 소숫점 버튼도 눌렀고, isDecimal 상태도 true 라면 무시
  if (isBtnDecimal && isDecimal) return;

  // isBtnDecimal = true (소숫점 버튼 눌렸다)
  // 소수점이 처음 눌렸을 때만 isDecimal 이 true로 변경
  // isDecimal 의 상태 변경
  if (isBtnDecimal) isDecimal = true;

  // 연산자 다음 숫자 입력 시 초기화 &  디스플레이가 초기값 0 일 경우
  if (isOperator || display.textContent === "0") {
    isOperator = false;
    isDecimal = false;

    // 소숫점 버튼을 처음 눌렀을 경우엔 '0.'으로 시작되게 하고, 그 외에는 그대로 입력
    display.textContent = isBtnDecimal ? "0." : btn;

  } else {
    display.textContent += btn;
  }

  adjustFontSize();
};


// 리셋 함수
const handleReset = () => {
  display.textContent = "0";
  display.style.fontSize = "100px";
  firstOperand = "";
  operator = "";
  isDecimal = false;
  isOperator = false;
};


buttons.forEach((button) => {
  button.addEventListener("click", function (e) {
    console.log(e.target.textContent);
  });
});


// 숫자버튼 눌렀을 때 이벤트 리스너 + 디스플레이에 누른 숫자 표시(사용자 입력 처리) 함수 호출
numButtons.forEach((numButton) => {
  numButton.addEventListener("click", function (e) {
    let btnValue = e.target.textContent;
    let btnClassList = e.target.classList;
    showDisplay(btnValue, btnClassList);
  });
});


// 연산자 버튼 눌렀을때 이벤트 리스너 + 첫번째 피연산자 저장, 연산자 저장 함수 호출
operatorButtons.forEach((operatorBtn) => {
  operatorBtn.addEventListener("click", function (e) {
    handleOperator(e.target.textContent);
  });
});

// = 버튼 눌렀을 때 이벤트 리스너 + 연산 처리 함수 호출
equalBtn.addEventListener("click", function(){
  handleEqual()
})

// C 버튼 눌렀을 때 이벤트 리스너 + 리셋 함수 호출
clearBtn.addEventListener("click", function () {
  handleReset();
});
