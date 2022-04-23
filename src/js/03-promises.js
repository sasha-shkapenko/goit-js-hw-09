import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
  formEl: document.querySelector('.form'),
}

refs.formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  const values = {
  delay: parseInt(refs.delay.value),
  step: parseInt(refs.step.value),
  amount: parseInt(refs.amount.value),
}
  e.preventDefault();
  promiseDefine(values);
}

function promiseDefine({ delay, step, amount }) {
  let totalDelay = delay;
  for (let i = 1; i <= amount; i++) {
    createPromise(i, totalDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    totalDelay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  
  return new Promise((resolve, reject) => {
setTimeout(() => {
    if (shouldResolve) {
      resolve({ position: position, delay: delay });
    } else {
      reject({ position: position, delay: delay });
    }
  }, delay);
  })
}


