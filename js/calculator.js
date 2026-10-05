// ==========================================
// SMARTCALC - JAVASCRIPT
// Basic + Scientific Calculator
// ==========================================


// ==========================================
// 1. DOM ELEMENTS
// ==========================================

const display = document.querySelector(".current-value");
const previousDisplay = document.querySelector(".previous-value");

const buttons = document.querySelectorAll(".buttons button");
const scientificButtons = document.querySelectorAll(
    ".scientific-buttons button"
);

const scientificPanel = document.getElementById("scientific-buttons");

const basicMode = document.getElementById("basic-mode");
const scientificMode = document.getElementById("scientific-mode");

const degreeMode = document.getElementById("degree-mode");
const radianMode = document.getElementById("radian-mode");


// ==========================================
// 2. CALCULATOR VARIABLES
// ==========================================

let currentValue = "0";
let previousValue = "";
let operator = null;
let waitingForNewValue = false;

let angleMode = "DEG";


// ==========================================
// 3. UPDATE DISPLAY
// ==========================================

function updateDisplay() {

    display.textContent = currentValue;

    previousDisplay.textContent = previousValue;
}


// ==========================================
// 4. CLEAR CALCULATOR
// ==========================================

function clearCalculator() {

    currentValue = "0";
    previousValue = "";
    operator = null;
    waitingForNewValue = false;

    updateDisplay();
}


// ==========================================
// 5. DELETE LAST CHARACTER
// ==========================================

function deleteLast() {

    if (currentValue.length === 1) {
        currentValue = "0";
    } else {
        currentValue = currentValue.slice(0, -1);
    }

    updateDisplay();
}


// ==========================================
// 6. ENTER NUMBER
// ==========================================

function enterNumber(number) {

    if (waitingForNewValue) {

        currentValue = number;
        waitingForNewValue = false;

    } else {

        if (currentValue === "0") {
            currentValue = number;
        } else {
            currentValue += number;
        }
    }

    updateDisplay();
}


// ==========================================
// 7. DECIMAL
// ==========================================

function enterDecimal() {

    if (waitingForNewValue) {

        currentValue = "0.";
        waitingForNewValue = false;

        updateDisplay();
        return;
    }

    if (!currentValue.includes(".")) {
        currentValue += ".";
    }

    updateDisplay();
}


// ==========================================
// 8. CHOOSE OPERATOR
// ==========================================

function chooseOperator(selectedOperator) {

    if (operator !== null && !waitingForNewValue) {
        calculate();
    }

    previousValue = `${currentValue} ${selectedOperator}`;

    operator = selectedOperator;

    waitingForNewValue = true;

    updateDisplay();
}


// ==========================================
// 9. BASIC CALCULATION
// ==========================================

function calculate() {

    if (operator === null) {
        return;
    }

    const firstNumber = parseFloat(
        previousValue.split(" ")[0]
    );

    const secondNumber = parseFloat(currentValue);

    let result;

    switch (operator) {

        case "+":
            result = firstNumber + secondNumber;
            break;

        case "−":
        case "-":
            result = firstNumber - secondNumber;
            break;

        case "×":
        case "*":
            result = firstNumber * secondNumber;
            break;

        case "÷":
        case "/":

            if (secondNumber === 0) {
                currentValue = "Error";
                previousValue = "";
                operator = null;

                updateDisplay();
                return;
            }

            result = firstNumber / secondNumber;
            break;

        default:
            return;
    }

    currentValue = formatResult(result);

    previousValue = "";

    operator = null;

    waitingForNewValue = true;

    updateDisplay();
}


// ==========================================
// 10. FORMAT RESULT
// ==========================================

function formatResult(number) {

    if (!Number.isFinite(number)) {
        return "Error";
    }

    return parseFloat(number.toFixed(10)).toString();
}


// ==========================================
// 11. PERCENTAGE
// ==========================================

function percentage() {

    const value = parseFloat(currentValue);

    currentValue = formatResult(value / 100);

    updateDisplay();
}


// ==========================================
// 12. SIGN (+/-)
// ==========================================

function changeSign() {

    if (currentValue === "0") {
        return;
    }

    currentValue = currentValue.startsWith("-")
        ? currentValue.slice(1)
        : "-" + currentValue;

    updateDisplay();
}


// ==========================================
// 13. DEGREE → RADIAN
// ==========================================

function toRadians(value) {

    return value * (Math.PI / 180);
}


// ==========================================
// 14. GET ANGLE
// ==========================================

function getAngle(value) {

    if (angleMode === "DEG") {
        return toRadians(value);
    }

    return value;
}


// ==========================================
// 15. TRIGONOMETRIC FUNCTIONS
// ==========================================

function calculateTrig(functionName) {

    const value = parseFloat(currentValue);

    if (isNaN(value)) {
        currentValue = "Error";
        updateDisplay();
        return;
    }

    const angle = getAngle(value);

    let result;

    switch (functionName) {

        case "sin":
            result = Math.sin(angle);
            break;

        case "cos":
            result = Math.cos(angle);
            break;

        case "tan":

            // Avoid very large results around 90° and 270°
            if (
                angleMode === "DEG" &&
                Math.abs(
                    Math.cos(angle)
                ) < 1e-10
            ) {
                currentValue = "Undefined";
                updateDisplay();
                return;
            }

            result = Math.tan(angle);
            break;

        default:
            return;
    }

    currentValue = formatResult(result);

    waitingForNewValue = true;

    updateDisplay();
}


// ==========================================
// 16. INVERSE TRIGONOMETRY
// ==========================================

function calculateInverseTrig(functionName) {

    const value = parseFloat(currentValue);

    if (isNaN(value)) {
        currentValue = "Error";
        updateDisplay();
        return;
    }

    let result;

    switch (functionName) {

        case "asin":

            if (value < -1 || value > 1) {
                currentValue = "Error";
                updateDisplay();
                return;
            }

            result = Math.asin(value);
            break;


        case "acos":

            if (value < -1 || value > 1) {
                currentValue = "Error";
                updateDisplay();
                return;
            }

            result = Math.acos(value);
            break;


        case "atan":

            result = Math.atan(value);
            break;

        default:
            return;
    }


    // Convert radians back to degrees
    if (angleMode === "DEG") {

        result = result * (180 / Math.PI);
    }


    currentValue = formatResult(result);

    waitingForNewValue = true;

    updateDisplay();
}


// ==========================================
// 17. LOGARITHMS
// ==========================================

function calculateLog(functionName) {

    const value = parseFloat(currentValue);

    if (value <= 0 || isNaN(value)) {

        currentValue = "Error";

        updateDisplay();

        return;
    }

    let result;

    switch (functionName) {

        case "log":
            result = Math.log10(value);
            break;

        case "ln":
            result = Math.log(value);
            break;

        default:
            return;
    }

    currentValue = formatResult(result);

    waitingForNewValue = true;

    updateDisplay();
}


// ==========================================
// 18. SQUARE ROOT
// ==========================================

function squareRoot() {

    const value = parseFloat(currentValue);

    if (value < 0 || isNaN(value)) {

        currentValue = "Error";

        updateDisplay();

        return;
    }

    currentValue = formatResult(
        Math.sqrt(value)
    );

    waitingForNewValue = true;

    updateDisplay();
}


// ==========================================
// 19. SQUARE
// ==========================================

function square() {

    const value = parseFloat(currentValue);

    currentValue = formatResult(
        value ** 2
    );

    waitingForNewValue = true;

    updateDisplay();
}


// ==========================================
// 20. POWER
// ==========================================

function power() {

    const value = parseFloat(currentValue);

    previousValue = `${value} ^`;

    operator = "^";

    waitingForNewValue = true;

    updateDisplay();
}


// ==========================================
// 21. FACTORIAL
// ==========================================

function factorial() {

    const value = parseInt(currentValue);

    if (
        value < 0 ||
        !Number.isInteger(value) ||
        value > 170
    ) {

        currentValue = "Error";

        updateDisplay();

        return;
    }

    let result = 1;

    for (let i = 2; i <= value; i++) {

        result *= i;
    }

    currentValue = result.toString();

    waitingForNewValue = true;

    updateDisplay();
}


// ==========================================
// 22. RECIPROCAL
// ==========================================

function reciprocal() {

    const value = parseFloat(currentValue);

    if (value === 0) {

        currentValue = "Error";

        updateDisplay();

        return;
    }

    currentValue = formatResult(
        1 / value
    );

    waitingForNewValue = true;

    updateDisplay();
}


// ==========================================
// 23. CONSTANTS
// ==========================================

function insertConstant(constant) {

    if (constant === "pi") {

        currentValue = Math.PI.toString();

    } else if (constant === "e") {

        currentValue = Math.E.toString();
    }

    updateDisplay();
}


// ==========================================
// 24. BASIC / SCIENTIFIC MODE
// ==========================================

scientificMode.addEventListener(
    "click",
    () => {

        scientificPanel.style.display = "grid";

        scientificMode.classList.add("active");

        basicMode.classList.remove("active");
    }
);


basicMode.addEventListener(
    "click",
    () => {

        scientificPanel.style.display = "none";

        basicMode.classList.add("active");

        scientificMode.classList.remove("active");
    }
);


// ==========================================
// 25. DEG / RAD MODE
// ==========================================

degreeMode.addEventListener(
    "click",
    () => {

        angleMode = "DEG";

        degreeMode.classList.add("active");

        radianMode.classList.remove("active");
    }
);


radianMode.addEventListener(
    "click",
    () => {

        angleMode = "RAD";

        radianMode.classList.add("active");

        degreeMode.classList.remove("active");
    }
);


// ==========================================
// 26. BASIC BUTTON EVENTS
// ==========================================

buttons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const value = button.textContent.trim();

            // Numbers
            if (/^[0-9]$/.test(value)) {

                enterNumber(value);

            }

            // Decimal
            else if (value === ".") {

                enterDecimal();

            }

            // Clear
            else if (value === "AC") {

                clearCalculator();

            }

            // Delete
            else if (value === "DEL") {

                deleteLast();

            }

            // Percentage
            else if (value === "%") {

                percentage();

            }

            // Equals
            else if (value === "=") {

                calculate();

            }

            // Operators
            else if (
                value === "+" ||
                value === "−" ||
                value === "×" ||
                value === "÷"
            ) {

                chooseOperator(value);
            }
        }
    );
});


// ==========================================
// 27. SCIENTIFIC BUTTON EVENTS
// ==========================================

scientificButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const action = button.dataset.action;

            switch (action) {

                // Trigonometry
                case "sin":
                case "cos":
                case "tan":

                    calculateTrig(action);

                    break;


                // Inverse trigonometry
                case "asin":
                case "acos":
                case "atan":

                    calculateInverseTrig(action);

                    break;


                // Logarithms
                case "log":
                case "ln":

                    calculateLog(action);

                    break;


                // Square root
                case "sqrt":

                    squareRoot();

                    break;


                // Square
                case "square":

                    square();

                    break;


                // Power
                case "power":

                    power();

                    break;


                // Factorial
                case "factorial":

                    factorial();

                    break;


                // Constants
                case "pi":
                case "e":

                    insertConstant(action);

                    break;


                // Reciprocal
                case "inverse":

                    reciprocal();

                    break;


                // Positive / negative
                case "sign":

                    changeSign();

                    break;
            }
        }
    );
});


// ==========================================
// 28. KEYBOARD SUPPORT
// ==========================================

document.addEventListener(
    "keydown",
    event => {

        const key = event.key;


        // Numbers
        if (/^[0-9]$/.test(key)) {

            enterNumber(key);

        }


        // Decimal
        else if (key === ".") {

            enterDecimal();

        }


        // Operators
        else if (
            key === "+" ||
            key === "-" ||
            key === "*" ||
            key === "/"
        ) {

            chooseOperator(key);

        }


        // Enter
        else if (
            key === "Enter" ||
            key === "="
        ) {

            calculate();

        }


        // Backspace
        else if (key === "Backspace") {

            deleteLast();

        }


        // Escape
        else if (key === "Escape") {

            clearCalculator();
        }
    }
);


// ==========================================
// 29. START CALCULATOR
// ==========================================

updateDisplay();