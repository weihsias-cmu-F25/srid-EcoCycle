(() => {
  "use strict";
  const experience = document.querySelector("#main");
  const form = document.querySelector("#early-access-form");
  const email = document.querySelector("#email");
  const submit = document.querySelector("#submit-button");
  const buttonLabel = document.querySelector("#button-label");
  const error = document.querySelector("#email-error");
  const success = document.querySelector("#success");
  const reset = document.querySelector("#reset-button");
  const status = document.querySelector("#repair-status");
  const scene = document.querySelector("#phone-scene");
  const caption = document.querySelector("#phone-caption");
  let repairTimer;

  function clearError() {
    email.removeAttribute("aria-invalid");
    error.hidden = true;
    error.textContent = "";
  }

  function finishRepair() {
    experience.dataset.state = "repaired";
    form.hidden = true;
    success.hidden = false;
    caption.textContent = "READY FOR ANOTHER CHAPTER.";
    scene.setAttribute("aria-label", "The phone is repaired: the cracks are gone and its green screen says Back to life.");
    status.textContent = "Phone repaired! Demo complete. Your email was not sent or saved.";
    reset.focus({ preventScroll: true });
  }

  // Frontend-only callback. No request, logging, or persistence of the email.
  function handleEarlyAccess() {
    experience.dataset.state = "repairing";
    form.reset();
    email.disabled = true;
    submit.disabled = true;
    buttonLabel.textContent = "Repairing…";
    form.setAttribute("aria-busy", "true");
    caption.textContent = "A LITTLE REPAIR IN PROGRESS…";
    status.textContent = "Repairing the phone.";
    scene.setAttribute("aria-label", "The phone is being repaired.");
    // Bring the animation into view on small screens, after dismissing the keyboard.
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    if (matchMedia("(max-width: 760px)").matches) {
      scene.scrollIntoView({ block: "center", behavior: "instant" });
    }
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) finishRepair();
    else repairTimer = setTimeout(finishRepair, 2900);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (experience.dataset.state !== "broken") return;
    clearError();
    email.value = email.value.trim();
    if (!email.value || !email.validity.valid || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      error.textContent = email.value ? "Enter a valid email, like you@example.com." : "Add your email to bring this phone back to life.";
      error.hidden = false;
      email.setAttribute("aria-invalid", "true");
      email.focus();
      return;
    }
    handleEarlyAccess();
  });

  reset.addEventListener("click", () => {
    clearTimeout(repairTimer);
    experience.dataset.state = "broken";
    success.hidden = true;
    form.hidden = false;
    form.removeAttribute("aria-busy");
    email.disabled = false;
    submit.disabled = false;
    buttonLabel.textContent = "Get early access";
    caption.textContent = "NOT THE END OF THE STORY.";
    scene.setAttribute("aria-label", "A phone with a cracked, dark screen. Submit the email form to watch it repair.");
    status.textContent = "Phone reset. Enter an email to try the repair again.";
    clearError();
    email.focus({ preventScroll: true });
  });

  email.addEventListener("input", clearError);
  // Prevent native form submission if JavaScript is unavailable.
  email.disabled = false;
  submit.disabled = false;
})();
