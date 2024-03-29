const billInput = document.querySelector("#bill");
const numbOfPeople = document.querySelector("#numberOfPeople");
const customTipInput = document.querySelector("#customTipInput");

const billError = document.querySelector("#billError");
const noOfPeopleError = document.querySelector("#noOfPeopleError");

const tipAmountText = document.querySelector("#tipAmount");
const totalAmountText = document.querySelector("#totalAmount");

const buttons = document.querySelectorAll(".span-style");

const resetBtn = document.querySelector("#reset-btn");

function toggleActiveButton(clickedButton) {
  buttons.forEach((button) => {
    if (button !== clickedButton) {
      button.classList.remove("active-state");
    }
  });

  clickedButton.classList.add("active-state");
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    toggleActiveButton(button);
    buttonClicked(button);
  });
});

function buttonClicked(clickedButton) {
  buttonValue = clickedButton.textContent;
  tipPercentage = buttonValue.substr(0, buttonValue.length - 1);

  billAmount = billInput.value.trim();
  noOfPeopleInvolved = numbOfPeople.value.trim();

  // Hide all error messages initially
  billError.style.display = "none";
  noOfPeopleError.style.display = "none";

  // create if-else statements here for when input is empty
  if (billInput.value === "" && numbOfPeople.value === "") {
    billError.style.display = "block";
    noOfPeopleError.style.display = "block";
    billInput.style.outlineStyle = "solid";
    billInput.style.outlineColor = "red";
    numbOfPeople.style.outlineStyle = "solid";
    numbOfPeople.style.outlineColor = "red";
  } else if (billInput.value === "") {
    billError.style.display = "block";
    billInput.style.outlineStyle = "solid";
    billInput.style.outlineColor = "red";
  } else if (numbOfPeople.value === "") {
    noOfPeopleError.style.display = "block";
    numbOfPeople.style.outlineStyle = "solid";
    numbOfPeople.style.outlineColor = "red";
  } else {
    billInput.style.outlineStyle = "none";
    billInput.style.outlineColor = "";

    numbOfPeople.style.outlineStyle = "none";
    numbOfPeople.style.outlineColor = "";

    calculateTipAndTotal(billAmount, noOfPeopleInvolved, tipPercentage);
    resetBtn.style.backgroundColor = "#26c0ab";
  }
}

billInput.addEventListener("input", () => {
  if (billInput.value.trim() !== "") {
    billError.style.display = "none";
    billInput.style.outlineStyle = "none";
    billInput.style.outlineColor = "none";
  }
});

numbOfPeople.addEventListener("input", () => {
  if (numbOfPeople.value.trim() !== "") {
    noOfPeopleError.style.display = "none";
    numbOfPeople.style.outlineStyle = "none";
    numbOfPeople.style.outlineColor = "";
  }
});

customTipInput.addEventListener("change", () => {
  buttons.forEach((button) => {
    button.classList.remove("active-state");
  });
});

customTipInput.addEventListener("input", () => {
  const customTipValue = customTipInput.value.trim();
  if (customTipValue !== "") {
    const tipPercentage = parseFloat(customTipValue) / 100;
    buttonClicked({ textContent: customTipValue + "%" });
  }
});

function calculateTipAndTotal(billAmount, noOfPeopleInvolved, tipPercentage) {
  // To calculate tip per person
  tipAmount = billAmount * (tipPercentage / 100);
  tipAmountPerPerson = (tipAmount / noOfPeopleInvolved).toFixed(2);
  tipAmountText.innerHTML = `$${tipAmountPerPerson}`;

  // To calculate total amount per person
  totalPerPerson = (
    (Number(billAmount) + tipAmount) /
    noOfPeopleInvolved
  ).toFixed(2);

  totalAmountText.innerHTML = `$${totalPerPerson}`;
}

// Reset Button
resetBtn.addEventListener("click", () => {
  tipAmountText.innerHTML = "$0.00";
  totalAmountText.innerHTML = "$0.00";
  billInput.value = "";
  numbOfPeople.value = "";
  customTipInput.value = "";

  billError.style.display = "none";
  noOfPeopleError.style.display = "none";

  resetBtn.style.backgroundColor = "#0d686d";

  toggleActiveButton(button);
});
