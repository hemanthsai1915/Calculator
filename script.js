let buttons = document.getElementsByClassName("btn");
let screen = document.getElementById("screenContent");
let toggleBtn = document.getElementById("toggleTheme");
let lastExpression = document.getElementById("lastExpression");
let clickSound = document.getElementById("clickSound");


let text = "0";
const operators = ["+", "-", "*", "/", "."];

for (let btn of buttons) {
    btn.onclick = () => {
    // clickSound.currentTime = 0; // rewind sound
    // clickSound.play();   
    let value = btn.innerHTML;
    let lastChar = text[text.length - 1];

    if (!isNaN(value) || value === "00") {
      if (text === "0") {
        text = value;
      } else {
        text += value;
      }
    } 
    else if (operators.includes(value)) {
      if (text === "0" && value !== "-") return;
      if (operators.includes(lastChar)) {
        text = text.slice(0, -1) + value;
      } else {
        text += value;
      }
    } 
    else if (value === "C") {
      text = "0";
      lastExpression.innerHTML = "";
    } 
    else if (value === "CE") {
      text = text.slice(0, -1);
      if (text === "") text = "0";
    } 
    else if (value === "=") {
      try {
        lastExpression.innerHTML = text + " =";
        text = eval(text).toString();
      } catch {
        text = "Error";
      }
    }

    screen.innerHTML = text;
  };
}

// Copy to clipboard
screen.onclick = () => {
  navigator.clipboard.writeText(screen.innerHTML);
  alert("Copied: " + screen.innerHTML);
};

// Theme toggle
toggleBtn.onclick = () => {
  document.body.classList.toggle("light");
  toggleBtn.innerHTML = document.body.classList.contains("light") ? "🌙" : "☀️";
};

// Keyboard support
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (key === "Enter" || key === "=") {
    try {
      lastExpression.innerHTML = text + " =";
      text = eval(text).toString();
    } catch {
      text = "Error";
    }
    screen.innerHTML = text;
    return;
  }

  if (!isNaN(key) || key === "." || key === "00") {
    if (text === "0") text = key;
    else text += key;
  } 
  else if (operators.includes(key)) {
    const lastChar = text[text.length - 1];
    if (!operators.includes(lastChar)) {
      text += key;
    } else {
      text = text.slice(0, -1) + key;
    }
  } 
  else if (key === "Backspace") {
    text = text.slice(0, -1) || "0";
  } 
  else if (key === "Delete") {
    text = "0";
    lastExpression.innerHTML = "";
  }

  screen.innerHTML = text;
});

