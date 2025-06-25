const display = document.getElementById('display');
const themeToggle = document.getElementById('themeSwitch');
const historyBtn = document.getElementById('historyToggle');
const historyContainer = document.getElementById('historyContainer');
const historyList = document.getElementById('historyList');

let currentInput = '';
let historyVisible = false;

function appendToDisplay(value) {
  currentInput += value;
  display.value = currentInput;
}

function clearDisplay() {
  currentInput = '';
  display.value = '';
}

function deleteChar() {
  currentInput = currentInput.slice(0, -1);
  display.value = currentInput;
}

function calculateResult() {
  try {
    let expression = currentInput.replace(/×/g, '*').replace(/÷/g, '/').replace(/%/g, '/100');
    const result = eval(expression);
    addToHistory(`${currentInput} = ${result}`);
    display.value = result;
    currentInput = result.toString();
  } catch {
    display.value = 'Error';
    currentInput = '';
  }
}

themeToggle.addEventListener('change', () => {
  if (themeToggle.checked) {
    document.body.classList.remove('light'); // Use dark theme
    document.getElementById("modeLabel").textContent = "Dark Mode";
  } else {
    document.body.classList.add('light'); // Use light theme
    document.getElementById("modeLabel").textContent = "Light Mode";
  }
});


// Toggle history
historyBtn.addEventListener('click', () => {
  historyVisible = !historyVisible;
  historyContainer.style.display = historyVisible ? 'block' : 'none';

  if (!historyVisible) {
    historyList.innerHTML = ''; // Clear history on close
  }
});

// Add to history list
function addToHistory(entry) {
  const li = document.createElement('li');
  li.textContent = entry;
  historyList.appendChild(li);
}
