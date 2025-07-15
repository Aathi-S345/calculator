document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll(".btn");
  let currentInput = "";

  // Allowed characters pattern for validation
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
        if (value === "." && currentInput.slice(-1) === ".") return; // Prevent 2 dots consecutively
        currentInput += value;
        updateDisplay();
      } 
      else if (isOperator) {
        // Prevent multiple operators in a row
        if (currentInput === "") return; // Can't start with operator
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
    // Sanitize input before eval using regex (allow only numbers and operators)
    if (!validInputPattern.test(currentInput)) {
      display.value = "Error";
      currentInput = "";
      return;
    }
    try {
      // Evaluate expression
      let result = eval(currentInput);
      if (result === undefined) {
        display.value = "";
        currentInput = "";
      } else {
        // Fix floating point to max 10 decimals
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
