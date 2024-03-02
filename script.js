// Light - Dark theme
const toggelElement = document.querySelector(".themes__toggle");

const themeClass = "themes__toggle--isActive";
const toggelDarkTheme = () => {
  toggelElement.classList.toggle(themeClass);
};

const toggelDarkThemeWithEnter = (event) => {
  if (event.key === "Enter") toggelDarkTheme();
};

toggelElement.addEventListener("click", toggelDarkTheme);

toggelElement.addEventListener("keydown", toggelDarkThemeWithEnter);

// Logic for calculator

let storedNum = "";
let currentNum = "";
let operation = "";

const resultElement = document.querySelector(".calc__result");
const keyElement = document.querySelectorAll("[data-type]");

const updateScreen = (value) => {
  resultElement.innerText = !value ? "0" : value;
};

const numButonHandler = (element) => {
  // const value = element.dataset.value;
  if (element === "." && currentNum.includes(".")) return;
  if (element === "0" && !currentNum) return;
  currentNum += element;
  updateScreen(currentNum);
};

const excuteOperation = () => {
  if (currentNum && storedNum && operation) {
    switch (operation) {
      case "+":
        storedNum = parseFloat(storedNum) + parseFloat(currentNum);
        break;
      case "-":
        storedNum = parseFloat(storedNum) - parseFloat(currentNum);
        break;
      case "*":
        storedNum = parseFloat(storedNum) * parseFloat(currentNum);
        break;
      case "/":
        storedNum = parseFloat(storedNum) / parseFloat(currentNum);
        break;
    }
    currentNum = "";
    updateScreen(storedNum);
    console.log({ currentNum });
    console.log({ storedNum });
    console.log({ operation });
  }
};
const operationButtonHandler = (operationValue) => {
  if (!currentNum && !storedNum) return;

  if (currentNum && !storedNum) {
    storedNum = currentNum;
    currentNum = "";
    operation = operationValue;
  } else if (storedNum) {
    operation = operationValue;

    if (currentNum) excuteOperation();
  }
};

const operationsButtonHandler = (element) => {
  const value = element.dataset.value;
  switch (value) {
    case "c":
      resetButtonHandler();
      break;
    case "Backspace":
      deleteButtonHandler();
      break;
    case "Enter":
      excuteOperation();
      break;
    default:
      operationButtonHandler(value);
  }
};

const resetButtonHandler = () => {
  storedNum = "";
  currentNum = "";
  operation = "";
  updateScreen(currentNum);
};

const deleteButtonHandler = () => {
  if (!currentNum || currentNum === "0") return;
  else if (currentNum.length === 1) currentNum = "0";
  else currentNum = currentNum.slice(0, currentNum.length - 1);

  updateScreen(currentNum);
};

const keyElementsHandler = (element) => {
  element.addEventListener("click", () => {
    const type = element.dataset.type;
    if (type === "number") numButonHandler(element.dataset.value);
    else if (type === "operation") operationsButtonHandler(element);
  });
};

keyElement.forEach(keyElementsHandler);

// Use keyboard as input
const availableNumbers = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ".",
];
const availableOperations = ["+", "-", "*", "/"];
const availableKeys = [
  ...availableNumbers,
  ...availableOperations,
  "Backspace",
  "Enter",
  "c",
];

window.addEventListener("keydown", (event) => {
  // keyboardWithoutHover(event.key);
  keyboardWithHover(event.key);
});

const keyboardWithoutHover = (key) => {
  if (availableNumbers.includes(key)) numButonHandler(key);
  else if (availableOperations.includes(key)) operationButtonHandler(key);
  else if (key === "Backspace") deleteButtonHandler();
  else if (key === "Enter") excuteOperation();
  else if (key === "c") resetButtonHandler();
};

const keyboardWithHover = (key) => {
  if (availableKeys.includes(key)) {
    const element = document.querySelector(`[data-value="${key}"]`);

    element.classList.add("hover");
    element.click();
    setTimeout(() => {
      element.classList.remove("hover");
    }, 100);
  }
};
