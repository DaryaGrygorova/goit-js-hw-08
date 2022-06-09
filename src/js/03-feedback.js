import throttle from 'lodash.throttle';

const FEEDBACK_MESSAGE = 'feedback-form-state';
let formInputValues = {};

const feedbackFormEl = document.querySelector('.feedback-form');
const emailInputEl = feedbackFormEl.querySelector('[name="email"]');
const messageInputEl = feedbackFormEl.querySelector('[name="message"]');

function initialFeedbackForm() {
  const localDataInputValue = localStorage.getItem(FEEDBACK_MESSAGE);
  if (localDataInputValue) {
    formInputValues = JSON.parse(localDataInputValue);
    emailInputEl.value = formInputValues.email;
    messageInputEl.value = formInputValues.message;
  }
}

initialFeedbackForm();

feedbackFormEl.addEventListener('input', throttle(fillingFormHandler, 500));
feedbackFormEl.addEventListener('submit', submitFormHandler);

function fillingFormHandler(e) {
  e.preventDefault();
  formInputValues[e.target.name] = e.target.value;
  localStorage.setItem(FEEDBACK_MESSAGE, JSON.stringify(formInputValues));
}

function submitFormHandler(event) {
  event.preventDefault();
  const {
    elements: { email, message },
  } = event.currentTarget;

  if (email.value === '' || message.value === '') {
    return alert('Please, fill in all the fields!');
  }

  console.log({ email: email.value, message: message.value });
  event.currentTarget.reset();

  removeInputValues();
}

function removeInputValues() {
  formInputValues = { email: '', message: '' };
  localStorage.removeItem(FEEDBACK_MESSAGE);
}
