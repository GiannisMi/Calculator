const display = document.getElementById("display");
const displayBefore = document.getElementById("display-after");
const theme = document.querySelector(".change-theme");
const buttons = Array.from(document.getElementsByClassName("button"));
const container = document.querySelector(".container");

buttons.map((button) => {
  button.addEventListener("click", (e) => {
    switch (e.target.innerText) {
      case "C":
        (display.innerText = ""), (displayBefore.innerText = "");
        break;
      case "←":
        if (display.innerText) {
          display.innerText = display.innerText.slice(0, -1);
        }
        break;
      case "=":
        display.innerText = eval(display.innerText);
        break;
      case "/":
        if (display.innerText.slice(-1) == "/") {
          break;
        }
        display.innerText += e.target.innerText;
        break;
      case "*":
        if (display.innerText.slice(-1) == "*" ) {
          break;
        }
        display.innerText += e.target.innerText;
        break;
      default:
        display.innerText += e.target.innerText;
    }
  });
});

theme.addEventListener("click", ChangeTheme);

function ChangeTheme() {
  container.classList.toggle("change");
  theme.classList.toggle("icon-change");
  theme.classList.toggle("change-theme");
}
