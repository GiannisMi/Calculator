class Calculator {
  constructor(previousText, mainText) {
    this.previousText = previousText;
    this.mainText = mainText;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appepndNumber(number) {
    if (number === "." && this.currentOperand.includes(",")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(",")[0]);
    const decimalDigits = stringNumber.split(",")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("el", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.mainText.innerText = this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
      this.previousText.innerText = `${this.previousOperand} ${this.operation}`;
    } else {
      this.previousText.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-clean]");
const previousText = document.querySelector("[data-previous]");
const mainText = document.querySelector("[data-main]");
const theme = document.querySelector(".change-theme");
const circle = document.querySelector(".clipPath");
const buttons = document.querySelectorAll(".buttons > button");

const calculator = new Calculator(previousText, mainText);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appepndNumber(button.innerText);
    calculator.updateDisplay();
  });
});
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});
allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});
deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});

theme.addEventListener("click", () => {
  mainText.classList.toggle("text");
  previousText.classList.toggle("text");
  circle.classList.toggle("active");
  theme.classList.toggle("icon-change");
  buttons.forEach((button) => {
    button.classList.toggle("dark-mode");
  });
});
