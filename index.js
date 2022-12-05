const display = document.getElementById("display");
const displayBefore = document.getElementById("display-after");
const theme = document.getElementsByClassName("change-theme");
const buttons = Array.from(document.getElementsByClassName("button"));
const container = document.getElementsByClassName("container");

console.log(theme);

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
      default:
        display.innerText += e.target.innerText;
    }
  });
});
