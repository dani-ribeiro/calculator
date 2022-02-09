const screenText = document.querySelector("#screenText");
const buttons = document.querySelectorAll(".symbol");
const operators = document.querySelectorAll(".operator");
const equalsBtn = document.querySelector("#equals");
const pointBtn = document.querySelector("#point");
let calculator_History = "";  //logs each operation --> num1 (action) num2 = calculated_Answer -->  ex: 2 + 2 = 4
let calculated_Answer = "";
let action = "";
let num1 = "";
let num2 = "";


listenToMyKeys();

function listenToMyKeys(){
  buttons.forEach((button) => {
    button.addEventListener('click', () =>{
      if(button.classList.contains("number")){
        showNumber(button);
      } else if(button.classList.contains("operator")){
        operate(button);
      } else if(button.id === "point"){
        showDecimal(button);
      } else if(button.id === "equals"){
        operate(button);
        setOperators("enable");
        (num1 > 100000) ? screenText.textContent = "Too Big" : screenText.textContent = num1;
      } else if(button.id === "AC"){
        clear();
      }
    }); //arrow function: buttons.addEventListener
  });   //arrow function: buttons.forEach

  //keyboard controls --> Note: ^ , * , + operators only work with numberpads. This isn't programmed for holding shift :(
  const operators = {
    '^': 'power',
    '/': 'divide',
    '*': 'multiply',
    '-': 'minus',
    '+': 'plus',
  };

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      document.getElementById('AC').click();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      document.getElementById('equals').click();
    } else if (event.key === '.') {
      document.getElementById('point').click();
    } else if (event.key in operators) {
      document.getElementById(operators[event.key]).click();
    } else if (!Number.isNaN(event.key)) {
      document.getElementById(`num${event.key}`).click();
    }
  }); //document.addEventListener

}     //listenToMyKeys


//  calculations
function divide(a, b){
  return (b === 0) ? "ERROR" : a / b;
}
function multiply(a,b){
  return a * b;
}
function subtract(a, b){
  return a - b;
}
function add(a, b){
  return a + b;
}
function power(a, b){
  return Math.pow(a,b);
}

function showNumber(button){
  if(action === "equals" || calculated_Answer === "ERROR" || calculated_Answer === Infinity){
    clear();
  }
  if(screenText.textContent === "0"){
    screenText.textContent = button.textContent;
  } else{
    screenText.textContent += button.textContent;
  }
  setEquals();
  setOperators("enable");
}

function operate(button){
  pointBtn.removeAttribute("disabled", "");
  if(num1 === ""){                                  // checks if there was a first number in the operation. if there isn't make it num1 --> "2"
    num1 = screenText.textContent;                       // else calculate the operation if there's a num1, operator, and num 2 --> "2 + 2"
    action = button.id;
  } else if(num1 !== "" && action !== ""){
    num2 = screenText.textContent;
    calculator_History = storeCalc(action);
    num1 = calculate(action, num1, num2);
    action = button.id;
  }
  setOperators("disable");
  setEquals("disable");;
  screenText.textContent = ""
}

function calculate(operation, firstNum, secondNum){
  if(operation === "divide"){
    calculated_Answer = divide(+firstNum, +secondNum);
  }else if(operation === "multiply"){
    calculated_Answer = multiply(+firstNum, +secondNum);
  }else if(operation === "minus"){
    calculated_Answer = subtract(+firstNum, +secondNum);
  }else if(operation === "plus"){
    calculated_Answer = add(+firstNum, +secondNum);
  }else if(operation === "power"){
    calculated_Answer = power(+firstNum, +secondNum);
  }
  action = num1 = num2 = "";
  if(calculated_Answer !== "ERROR"){
    return round(calculated_Answer);
  }
  return calculated_Answer;
}

//round to four decimal places
function round(calculation){
  return Math.round(calculation * 10000) / 10000;
}

//stores equation in calculator_History   ex: "10÷5=2"
function storeCalc(operation){
  if(operation === "divide"){
    calculator_History = `${num1}÷${num2}=${calculate(action, num1, num2)}`;
  } else if(operation === "multiply"){
    calculator_History = `${num1}×${num2}=${calculate(action, num1, num2)}`;
  } else if(operation === "minus"){
    calculator_History = `${num1}−${num2}=${calculate(action, num1, num2)}`;
  } else if(operation === "plus"){
    calculator_History = `${num1}+${num2}=${calculate(action, num1, num2)}`;
  } else if(operation === "power"){
    calculator_History = `${num1}^${num2}=${calculate(action, num1, num2)}`;
  }
  return calculator_History;
}

function showDecimal(button){
  if(calculated_Answer !== "" && action === "equals"){
    clear();
    screenText.textContent += button.textContent;
  } else if(screenText.textContent === "" || screenText.textContent === "."){
    screenText.textContent = button.textContent;
  } else if(screenText.textContent !== "" && screenText.textContent.includes(".")){
    button.setAttribute("disabled", "");
  } else{
    screenText.textContent += button.textContent;
  }
}

//if the button is supposed to be disabeled, keep it disabled. otherwise enable it by removing the disabled attribute in html
function setOperators(state){
  operators.forEach((operator) =>{
    if(state === "disable" || calculated_Answer === "ERROR" || calculated_Answer === Infinity){
      operator.setAttribute("disabled", "");
    } else if(state === "enable"){
      operator.removeAttribute("disabled", "");
    }
  });
}

// equals button disabled when no operation should be done. ex: "2" or "2 +" --> enable it after operations like "2 + 2 ="
function setEquals(state){
  if(action === "" || state === "disable"){
    equalsBtn.setAttribute("disabled", "");
  } else{
    equalsBtn.removeAttribute("disabled", "");
  }
}

//clears calculator screen
function clear(){
    setOperators("enable");
    pointBtn.removeAttribute("disabled", "");
    equalsBtn.removeAttribute("disabled", "");
    calculator_History = "";
    screenText.textContent = "";
    calculated_Answer = "";
    action = "";
    num1 = "";
    num2 = "";
}