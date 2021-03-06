const basicCalculator = document.querySelector('.calculator');
const keys = basicCalculator.querySelector('.calculator__keys');
const display = document.querySelector('.calculator__display');
const clear = document.querySelector('.clear');
const buttonKeys = document.querySelectorAll('.key');

const targetEvent = e => {

  const key = e.target;
  const action = key.dataset.action;
  const keyContent = key.textContent;
  const displayedNum = display.textContent.substring(0, 11);
  const previousKeyType = basicCalculator.dataset.previousKeyType;
  const basicCalculate = (n1, operator, n2) => {
    const firstNum = parseFloat(n1);
    const secondNum = parseFloat(n2);
    if (operator === 'add') { return firstNum + secondNum; }
    if (operator === 'substract') { return firstNum - secondNum; }
    if (operator === 'multiply') { return firstNum * secondNum; }
    if (operator === 'divide') { return firstNum / secondNum; }
  };
  const keyPress = document.querySelector(`button[data-key="${e.keyCode}"]`);

  if (key.matches('button')) {

    Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));

    if (!action) {
      if (
        displayedNum === "0" ||
        previousKeyType === 'operator' ||
        previousKeyType === 'calculate'
      ) {
        display.textContent = keyContent;
      } else if (displayedNum.length === 11) {
        display.textContent = displayedNum;
      } else {
        display.textContent = displayedNum + keyContent;
      }
      basicCalculator.dataset.previousKeyType = 'number';
    }

    if (action === 'add' || action === 'substract' || action === 'multiply' || action === 'divide') {
      const firstValue = basicCalculator.dataset.firstValue;
      const operator = basicCalculator.dataset.operator;
      const secondValue = displayedNum;
      if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
        const calcValue = basicCalculate(firstValue, operator, secondValue);
        display.textContent = calcValue;
        basicCalculator.dataset.firstValue = calcValue;
      } else {
        basicCalculator.dataset.firstValue = displayedNum;
      }

      key.classList.add('is-depressed');
      basicCalculator.dataset.previousKeyType = 'operator';
      basicCalculator.dataset.operator = action;
    }

    if (action === 'decimal') {
      if (!displayedNum.includes('.') && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
        display.textContent = displayedNum + '.';
      } else {
        display.textContent = '0.';
      }
      basicCalculator.dataset.previousKeyType = 'decimal';
    }

    if (action === 'clear') {
      const previousOperator = basicCalculator.dataset.operator;
      const previousOperatorKey = basicCalculator.querySelector(`[data-action='${previousOperator}']`)
      if (key.textContent === 'AC') {
        basicCalculator.dataset.firstValue = '';
        basicCalculator.dataset.operator = '';
        basicCalculator.dataset.modValue = '';
        basicCalculator.dataset.previousKeyType = '';
      } else if (previousOperator) {
        key.textContent = 'AC';
        previousOperatorKey.classList.add('is-depressed');
      } else {
        key.textContent = 'AC';
      }
      display.textContent = '0';
      basicCalculator.dataset.previousKeyType = 'clear';
    }

    if (action !== 'clear') {
      const clearButton = basicCalculator.querySelector('[data-action=clear]');
      clearButton.textContent = 'CE';
    }

    if (action === 'calculate') {
      let firstValue = basicCalculator.dataset.firstValue;
      const operator = basicCalculator.dataset.operator;
      let secondValue = displayedNum;
      if (firstValue) {
        if (previousKeyType === 'calculate') {
          firstValue = displayedNum;
          secondValue = basicCalculator.dataset.modValue;
        }
        display.textContent = basicCalculate(firstValue, operator, secondValue);
      }
      basicCalculator.dataset.modValue = secondValue;
      basicCalculator.dataset.previousKeyType = 'calculate';
    }

  }
  if (keyPress) {
    const pressContent = keyPress.textContent;
    const keyAction = keyPress.dataset.action;
    keyPress.classList.add('is-pressed');
    Array.from(keyPress.parentNode.children).forEach(k => k.classList.remove('is-depressed'));
    function removeTransition(e) {
      if (e.propertyName !== "opacity") return;
      this.classList.remove('is-pressed');
    }
    buttonKeys.forEach(b => b.addEventListener('transitionend', removeTransition));

    if (!keyAction) {
      if (displayedNum === "0" || previousKeyType === 'operator' || previousKeyType === 'calculate') {
        display.textContent = pressContent;
      } else if (displayedNum.length === 11) {
        display.textContent = displayedNum;
      } else {
        display.textContent = displayedNum + pressContent;
      }
      basicCalculator.dataset.previousKeyType = 'number';
    }

    if (keyAction === 'add' || keyAction === 'substract' || keyAction === 'multiply' || keyAction === 'divide') {
      const firstValue = basicCalculator.dataset.firstValue;
      const operator = basicCalculator.dataset.operator;
      const secondValue = displayedNum;
      if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
        const calcValue = basicCalculate(firstValue, operator, secondValue);
        display.textContent = calcValue;
        basicCalculator.dataset.firstValue = calcValue;
      } else {
        basicCalculator.dataset.firstValue = displayedNum;
      }

      keyPress.classList.add('is-depressed');
      basicCalculator.dataset.previousKeyType = 'operator';
      basicCalculator.dataset.operator = keyAction;
    }
    if (keyAction === 'decimal') {
      if (!displayedNum.includes('.') && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
        display.textContent = displayedNum + '.';
      } else {
        display.textContent = '0.';
      }
      basicCalculator.dataset.previousKeyType = 'decimal';
    }

    if (keyAction === 'clear') {
      const previousOperator = basicCalculator.dataset.operator;
      const previousOperatorKey = basicCalculator.querySelector(`[data-action='${previousOperator}']`)
      if (keyPress.textContent === 'AC') {
        basicCalculator.dataset.firstValue = '';
        basicCalculator.dataset.operator = '';
        basicCalculator.dataset.modValue = '';
        basicCalculator.dataset.previousKeyType = '';
      } else {
        keyPress.textContent = 'AC';
        previousOperatorKey.classList.add('is-depressed');
      }
      display.textContent = '0';
      basicCalculator.dataset.previousKeyType = 'clear';
    }

    if (keyAction !== 'clear') {
      const clearButton = basicCalculator.querySelector('[data-action=clear]');
      clearButton.textContent = 'CE';
    }

    if (keyAction === 'calculate') {
      let firstValue = basicCalculator.dataset.firstValue;
      const operator = basicCalculator.dataset.operator;
      let secondValue = displayedNum;
      if (firstValue) {
        if (previousKeyType === 'calculate') {
          firstValue = displayedNum;
          secondValue = basicCalculator.dataset.modValue;
        }
        display.textContent = basicCalculate(firstValue, operator, secondValue);
      }
      basicCalculator.dataset.modValue = secondValue;
      basicCalculator.dataset.previousKeyType = 'calculate';
    }
  };

}
keys.addEventListener('click', targetEvent, false);
document.addEventListener('keydown', targetEvent, false);
