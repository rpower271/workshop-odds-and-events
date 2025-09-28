const bank = [];
const odds = [];
const evens = [];

function sortOne() {
  const numToMove = bank.shift();
  if (numToMove % 2 === 0) {
    evens.push(numToMove);
  } else {
    odds.push(numToMove);
  }
}

function sortAll() {
  while (bank.length) {
    sortOne();
  }
}

function addToBank(number) {
  bank.push(number);
}

function NumberForm() {
  const $numberForm = document.createElement("form");
  $numberForm.innerHTML = `
    <label>
    add a number to the bank
    <input type="number" name="number" />
    <input type="submit" value="Add number" data-action="add" />
    <input type="submit" value="Sort 1" data-action="sortOne" />
    <input type="submit" value="Sort All" data-action="sortAll"/>
    </label>
    `;
  $numberForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const action = e.submitter.dataset.action;
    if (action === "add") {
      const data = new FormData($numberForm);
      const number = data.get("number");
      if (number === null || number === "") {
        return;
      }
      addToBank(+number);
    } else if (action === "sortOne") {
      sortOne();
    } else if (action === "sortAll") {
      sortAll();
    }
    render();
  });

  return $numberForm;
}

function NumberInBank(number) {
  const $number = document.createElement("span");
  $number.textContent = number;
  return $number;
}

function NumberBank(label, numbers) {
  const $bank = document.createElement("section");
  $bank.classList.add("bank");
  $bank.innerHTML = `
    <h2>${label}</h2>
    <output></output>
    `;
  const $numbers = numbers.map(NumberInBank);
  $bank.querySelector("output").replaceChildren(...$numbers);
  return $bank;
}
render();

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1> Odds and Events <h1>
    <NumberForm></NumberForm>
    <NumberBank id="bank"></NumberBank>
    <NumberBank id="odds"></NumberBank>
    <NumberBank id="evens"></NumberBank>
    `;

  $app.querySelector("NumberForm").replaceWith(NumberForm());
  $app.querySelector("#bank").replaceWith(NumberBank("Bank", bank));
  $app.querySelector("#odds").replaceWith(NumberBank("Odds", odds));
  $app.querySelector("#evens").replaceWith(NumberBank("Evens", evens));
}
render();
