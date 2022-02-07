const screenText = document.getElementById("screenText");

//getting all of the buttons
//row 1
const clearBtn = document.getElementById("AC");
const plusMinus = document.getElementById("plus/minus");
const percent = document.getElementById("percent");
const divide = document.getElementById("divide");
//row 2
const seven = document.getElementById("seven");
const eight = document.getElementById("eight");
const nine = document.getElementById("nine");
const x = document.getElementById("X");
//row 3
const four = document.getElementById("four");
const five = document.getElementById("five");
const six = document.getElementById("six");
const minus = document.getElementById("minus"); 
//row 4
const one = document.getElementById("one");
const two = document.getElementById("two");
const three = document.getElementById("three");
const plus = document.getElementById("plus");
//row 5
const zero = document.getElementById("zero");
const point = document.getElementById("point");
const equals= document.getElementById("equals");

let screenArr = [];     //array where the inputed current operation will appear --> 2 + 2 =
let resultsArr = [];    //array where the results from screenArr will be sent --> 4

//add click eventListeners to each button
clearBtn.addEventListener('click', clear);
seven.addEventListener('click', clickNumber);
eight.addEventListener('click', clickNumber);
nine.addEventListener('click', clickNumber);
four.addEventListener('click', clickNumber);
five.addEventListener('click', clickNumber);
six.addEventListener('click', clickNumber);
one.addEventListener('click', clickNumber);
two.addEventListener('click', clickNumber);
three.addEventListener('click', clickNumber);
zero.addEventListener('click', clickNumber);
plus.addEventListener('click', clickNumber);
equals.addEventListener('click', evaluate);



function clear(){
    screenArr = [];
    resultsArr = [];
    screenText.textContent = "0";
    console.log("cleared screen");
}

function clickNumber(){
    screenArr.push(this.innerHTML);
}

function evaluate(){
    screenArr.push(this.innerHTML);
    
}
