const radioOptions = document.getElementsByName("query");
const form = document.querySelector("#contact-form");
const toastMsg = document.querySelector("#toast-msg");

radioOptions.forEach((option) => {
  option.addEventListener("change", updateOption);
});

function updateOption() {
  radioOptions.forEach((option) => {
    const div = option.closest(".radio-option");
    if (option.checked) {
      div.classList.add("checked");
    } else {
      div.classList.remove("checked");
    }
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const errorMsgs = document.querySelectorAll(".error-msg");
  errorMsgs.forEach((err) => (err.style.display = "none"));

  let isValid = true;

  const firstName = document.querySelector("#first-name").value.trim();
  const lastName = document.querySelector("#last-name").value.trim();
  const email = document.querySelector("#email").value.trim();
  const queryType = document.querySelector("input[name='query']:checked");
  const message = document.querySelector("#message-txt-area").value.trim();
  const consent = document.querySelector("#consent-checkbox").checked;

  if (!firstName) {
    showError("first-name", "This field is required");
    isValid = false;
  }
  if (!lastName) {
    showError("last-name", "This field is required");
    isValid = false;
  }
  if (!email || !validateEmail(email)) {
    showError("email", "Please enter a valid email address");
    isValid = false;
  }
  if (!queryType) {
    showError("query-group", "Please select a query type");
    isValid = false;
  }
  if (!message) {
    showError("message-txt-area", "This field is required");
    isValid = false;
  }
  if (!consent) {
    showError(
      "consent-label",
      "To submit this form, please consent to being contacted"
    );
    isValid = false;
  }

  if (isValid) {
    showToast();
  }

  function showError(id, message) {
    const element = document.getElementById(id);
    const errorElement = element.nextElementSibling;
    if (errorElement && errorElement.classList.contains("error-msg")) {
      errorElement.textContent = message;
      errorElement.style.display = "block";
    }
  }

  function validateEmail(email) {
    const re = /^[^@]+@[^@]+\.[^@]+$/;
    return re.test(email);
  }

  function showToast() {
    toastMsg.style.display = "block";
    setTimeout(function () {
      toastMsg.classList.add("show");
    }, 10); //Delay to allow display change to take effect

    setTimeout(function () {
      toastMsg.classList.remove("show");
      setTimeout(function () {
        toastMsg.style.display = "none"; //Hide it again after fading out
      }, 500); //Wait for the fade-out transition to complete
    }, 3000); //Show for 3 seconds
  }
});
