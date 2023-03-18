let mortgageAmount = document.querySelector(".mortgageAmount");
let downPayment = document.querySelector(".downPayment");
let interestRate = document.querySelector(".interestRate");
let termInYears = document.querySelector(".termInYears");
let inputArea = document.querySelectorAll("input");

let messageArea = document.querySelector("#message");
let messageArray = [];
//////////////////Sound on click////////////////////
function playSound() {
  const click = new Audio();
  click.src = "click_Sound/mixkit-clear-mouse-clicks-2997.wav";
  click.autoplay = true;
}

inputArea.forEach((input) => {
  input.addEventListener("click", () => {
    playSound();
  });
});

document.querySelector(".calculate-btn").addEventListener("click", () => {
  playSound();
});

///////////////////////Typewriter effect/////////////////////////
let textPosition = 0;
let speed = 100;

function hide() {
  messageArea.style.opacity = "0";
}

typewriter = () => {
  messageArea.innerHTML = messageArray[0].substring(0, textPosition);

  if (textPosition++ != messageArray[0].length) {
    setTimeout(typewriter, speed);
  }
  if (textPosition === messageArray[0].length) {
    setTimeout(hide, 7000);
  }
};

mortgageAmount.addEventListener("click", () => {
  messageArea.style.opacity = "1";
  messageArray = ["Original or expected balance for your mortgage."];
  textPosition = 0;
  typewriter();
  playSound();
});

downPayment.addEventListener("click", () => {
  messageArea.style.opacity = "1";
  messageArray = ["Your initial payment."];
  textPosition = 0;
  typewriter();
  playSound();
});

interestRate.addEventListener("click", () => {
  messageArea.style.opacity = "1";
  messageArray = ["Annual fixed interest rate for this mortgage"];
  textPosition = 0;
  typewriter();
  playSound();
});

termInYears.addEventListener("click", () => {
  messageArea.style.opacity = "1";
  messageArray = [
    "The number of years over which you will repay this loan. The most common mortgage terms are 15 years and 30 years",
  ];
  textPosition = 0;
  typewriter();
  playSound();
});

/////////////Move label///////////////////////
let costInp = document.getElementById("loan");
costInp.addEventListener("blur", (event) => {
  if (event.target.value == "") {
    document.querySelector(".loan-label").classList.remove("active");
  } else {
    document.querySelector(".loan-label").classList.add("active");
  }
});

let downPaymentInp = document.getElementById("downpayment");
downPaymentInp.addEventListener("blur", (event) => {
  if (event.target.value == "") {
    document.querySelector(".downpayment-label").classList.remove("active");
  } else {
    document.querySelector(".downpayment-label").classList.add("active");
  }
});

let interestInp = document.getElementById("interest");
interestInp.addEventListener("blur", (event) => {
  if (event.target.value == "") {
    document.querySelector(".interest-label").classList.remove("active");
  } else {
    document.querySelector(".interest-label").classList.add("active");
  }
});

let termInp = document.getElementById("years");
termInp.addEventListener("blur", (event) => {
  if (event.target.value == "") {
    document.querySelector(".years-label").classList.remove("active");
  } else {
    document.querySelector(".years-label").classList.add("active");
  }
});

///////////////////////////////Calc////////////////////////////////////
function calculateMortgage(p, r, n) {
  r = percentToDecimal(r);
  n = yearsToMonths(n);
  let pmt = (r * p) / (1 - Math.pow(1 + r, -n));
  return parseFloat(pmt.toFixed(2));
}

function percentToDecimal(percent) {
  return percent / 12 / 100;
}

function yearsToMonths(year) {
  return year * 12;
}

let output = document.querySelector(".output");

function postPayments(pmt) {
  output.innerHTML = `Monthly Payment: $${pmt}`;
}

let btn = document.querySelector(".calculate-btn");

btn.onclick = function () {
  let cost = document.getElementById("loan").value;
  let downPayment = document.getElementById("downpayment").value;
  let interest = document.getElementById("interest").value;
  let term = document.getElementById("years").value;

  if (cost == "" && downPayment == "" && interest == "" && term == "") {
    output.innerText = "Please fill out all fields.";
    return false;
  }
  if (cost < 0 || cost == "" || isNaN(cost)) {
    output.innerText = "Please enter a valid loan amount.";
    return false;
  }
  if (downPayment < 0 || downPayment == "" || isNaN(downPayment)) {
    output.innerText = "Please enter a valid down payment.";
    return false;
  }
  if (interest < 0 || interest == "" || isNaN(interest)) {
    output.innerText = "Please enter a valid interest rate.";
    return false;
  }
  if (term < 0 || term == "" || isNaN(term)) {
    output.innerText = "Please enter a valid length of loan.";
    return false;
  }
  let amountBorrowed = cost - downPayment;
  let pmt = calculateMortgage(amountBorrowed, interest, term);
  postPayments(pmt);
};

////////////Clear button///////////////////
document.querySelector(".clear-btn").addEventListener("click", () => {
  playSound();
  let inputs = document.querySelectorAll("input");
  inputs.forEach((inp) => {
    inp.value = "";
  });
  document.querySelector(".loan-label").classList.remove("active");
  document.querySelector(".downpayment-label").classList.remove("active");
  document.querySelector(".interest-label").classList.remove("active");
  document.querySelector(".years-label").classList.remove("active");
  output.innerText = "";
});
