const radioOptions = document.getElementsByName("query");

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
