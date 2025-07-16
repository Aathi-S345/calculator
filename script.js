document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll(".btn");
  let currentInput = "";


  const validInputPattern = /^[0-9+\-*/.]*$/;

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const value = button.getAttribute("data-value");
      const isOperator = button.classList.contains("operator");
      const isNumber = button.classList.contains("number");
      const isEqual = button.classList.contains("equal");
      const isClear = button.id === "clear";
      const isBackspace = button.id === "backspace";

      if (isNumber || (value === ".")) {
        if (value === "." && currentInput.slice(-1) === ".") return;
        currentInput += value;
        updateDisplay();
      } 
      else if (isOperator) {
        
        if (currentInput === "") return;
        if (/[+\-*/.]$/.test(currentInput)) {
          currentInput = currentInput.slice(0, -1);
        }
        currentInput += value;
        updateDisplay();
      }
      else if (isEqual) {
        calculateResult();
      }
      else if (isClear) {
        clearDisplay();
      }
      else if (isBackspace) {
        if (currentInput.length > 0) {
          currentInput = currentInput.slice(0, -1);
          updateDisplay();
        }
      }
    });
  });

  function updateDisplay() {
    display.value = currentInput;
  }

  function clearDisplay() {
    currentInput = "";
    updateDisplay();
  }

  function calculateResult() {

    if (!validInputPattern.test(currentInput)) {
      display.value = "Error";
      currentInput = "";
      return;
    }
    try {
 
      let result = eval(currentInput);
      if (result === undefined) {
        display.value = "";
        currentInput = "";
      } else {
      
        if (typeof result === "number") {
          result = +result.toFixed(10);
        }
        display.value = result;
        currentInput = result.toString();
      }
    } catch (err) {
      display.value = "Error";
      currentInput = "";
    }
  }
});
