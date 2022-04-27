const startBtnEl = document.querySelector('[data-start]');
const stopBtnEl = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');
let timerId = null;

stopBtnEl.disabled = true;
startBtnEl.addEventListener('click', () => {
  timerId = setInterval(() => {
      bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtnEl.disabled = true;
  stopBtnEl.disabled = false;
});

stopBtnEl.addEventListener('click', () => {
  clearInterval(timerId);
  startBtnEl.disabled = false;
  stopBtnEl.disabled = true;
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}