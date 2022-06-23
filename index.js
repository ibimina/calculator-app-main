const range = document.querySelector("#range");
const body = document.getElementsByTagName("body")[0];
//console.log(body)

let currentTheme = localStorage.getItem("mytheme") || "blue"
body.classList.add(currentTheme);
range.value = localStorage.getItem("val");

const changeColor = (newTheme) => {
  if (newTheme === "0") {
    body.classList.remove(currentTheme);
    body.classList.add("blue");
    currentTheme = "blue";
     localStorage.setItem("mytheme",currentTheme);
     localStorage.setItem("val",0)
  }
  if (newTheme === "1") {
    body.classList.remove(currentTheme);
    body.classList.add("white");
    currentTheme = "white";
 localStorage.setItem("mytheme", currentTheme);
      localStorage.setItem("val", 1);
  }
  if (newTheme === "2") {
    body.classList.remove(currentTheme);
    body.classList.add("purple");
    currentTheme = "purple";
    localStorage.setItem("mytheme", currentTheme);
         localStorage.setItem("val", 2);
  }
  
};

range.addEventListener("input", (e) => {
  const newTheme = e.currentTarget.value;

  //console.log(newTheme)
  changeColor(newTheme);
});

const buttons = document.querySelector(".keys");
const calculator = document.querySelector(".calculator-wrap");
const dispaly = document.querySelector(".display");

buttons.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    let button = e.target;
    let buttonContent = button.textContent;
    let dataAction = button.dataset.action;
    let displayedNumber = dispaly.textContent;
    let previousKeyType = calculator.dataset.previousKeyType;
    if (!dataAction) {
      if (
        displayedNumber === "0" ||
        previousKeyType === "equals" ||
        previousKeyType === "operator"
      ) {
        dispaly.textContent = buttonContent;
      } else {
        dispaly.textContent = displayedNumber + buttonContent;
      }
      calculator.dataset.previousKeyType = "number";
    }
    if (dataAction === "decimal") {
      if (!displayedNumber.includes(".")) {
        dispaly.textContent = displayedNumber + ".";
      } else if (
        previousKeyType === "equal" ||
        previousKeyType === "operator"
      ) {
        dispaly.textContent = "0.";
      }
      calculator.dataset.previousKeyType = "decimal";
    }
    if (
      dataAction === "add" ||
      dataAction === "subtract" ||
      dataAction === "multiply" ||
      dataAction === "divide"
    ) {
      let firstNumber = calculator.dataset.firstNumber;
      let operator = calculator.dataset.operator;
      let secondNumber = displayedNumber;

      if (
        firstNumber &&
        operator &&
        previousKeyType !== "operator" &&
        previousKeyType !== "equal"
      ) {
        const cal = calculation(firstNumber, operator, secondNumber);
        dispaly.textContent = cal;
        calculator.dataset.firstNumber = cal
      }else{
calculator.dataset.firstNumber = displayedNumber
      }
      calculator.dataset.previousKeyType="operator"
   calculator.dataset.operator = dataAction
    }if (dataAction ==="equals") {
       let firstNumber = calculator.dataset.firstNumber;
       let operator = calculator.dataset.operator;
       let secondNumber = displayedNumber;
       if (firstNumber) {
        if (previousKeyType ==="equal") {
            firstNumber = displayedNumber
            secondNumber = calculator.dataset.modValue
        }else{
            dispaly.textContent ="0"
        }
         const cal = calculation(firstNumber, operator, secondNumber);
        dispaly.textContent = cal;
       }  
       calculator.dataset.previousKeyType = "equal";
       calculator.dataset.modValue = secondNumber;
    }if (dataAction==="reset") {
  
     dispaly.textContent="0"
    //   firstNumber ="0"
    //   operator=null
      calculator.dataset.firstNumber= "0"
      calculator.dataset.operator=""
      calculator.dataset.modValue=""

    }if (dataAction==="delete") {
         dispaly.textContent = "0"; 
    }
           
  }
});

const calculation = (numOne, operator, numTwo) => {
  if (operator === "add") return parseFloat(numOne) + parseFloat(numTwo);
  if (operator === "subtract") return parseFloat(numOne) - parseFloat(numTwo);
  if (operator === "divide") return parseFloat(numOne) / parseFloat(numTwo);
  if (operator === "multiply") return parseFloat(numOne) * parseFloat(numTwo);
};
