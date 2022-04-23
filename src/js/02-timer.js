import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    inputEl: document.querySelector('#datetime-picker'),
    btnEl: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}
let selectedTime;
let timerId = null;
refs.btnEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0] < Date.now()) {
          Notiflix.Notify.failure('Please select date in future');
          refs.btnEl.disabled = true;
      }
      else {
          refs.btnEl.disabled = false;
      }
        selectedTime = selectedDates[0].getTime();
        clearInterval(timerId);
        markupEdit({ days:0, hours:0, minutes:0, seconds:0 })
    },
};

flatpickr(refs.inputEl, options);

refs.btnEl.addEventListener('click', onBtnClick);

function onBtnClick() {
    timerId = setInterval(() => {
    const restTime = convertMs(selectedTime - Date.now());
    markupEdit(restTime);
  }, 1000);
}
function markupEdit({ days, hours, minutes, seconds }) {
    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}