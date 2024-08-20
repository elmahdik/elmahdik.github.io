import { actions } from "astro:actions";
import emailjs from "@emailjs/browser";
// @ts-ignore
import confetti from "canvas-confetti";

emailjs.init(import.meta.env.PUBLIC_EMAIL_JS);
confetti();

let OPERATION_CHECK: any;
let answer = document.querySelector("#input-answer") as HTMLFormElement;

const getNewOperation = () => {
  const a: number = Math.floor(Math.random() * 10);
  const b: number = Math.floor(Math.random() * 10);
  const answer: number = a + b;
  return { a, b, answer };
};

const updateHTMLOperation = () => {
  OPERATION_CHECK = getNewOperation();
  answer.value = "";
  answer.placeholder = OPERATION_CHECK.a + "+" + OPERATION_CHECK.b + " ?";
};

updateHTMLOperation();

const form = document.querySelector("#form_contact") as HTMLFormElement;
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (OPERATION_CHECK.answer === parseInt(answer.value.trim())) {
    const formData = new FormData(form);
    const { data, error } = await actions.sendEmail(formData);
    if (data) {
      emailjs
        .send(
          import.meta.env.PUBLIC_SERVICE_ID,
          import.meta.env.PUBLIC_TEMPLATE_ID,
          data.success
        )
        .then(() => {
          form.reset();
          confetti();
          alert("Message sent.");
        })
        .catch((err: string) => console.log(err));
    }
    if (error) console.error(error);
  } else {
    alert(
      `The result of the operation was ${OPERATION_CHECK.answer}. Please try again.`
    );
    updateHTMLOperation();
  }
});
