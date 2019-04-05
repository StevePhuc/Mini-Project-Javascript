const description = document.querySelector('#description');
const amount = document.querySelector('#amount');
const select = document.querySelector('select');
const income = document.querySelector('#income');
const expense = document.querySelector('#expense');
const add = document.querySelector('.add');
const form = document.querySelector('form');
const incomeWrapper = document.querySelector('.income-wrapper');
const expenseWrapper = document.querySelector('.expense-wrapper');
const result = document.querySelector('.result');
const reset = document.querySelector('.reset');

const displayDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    const dateMonthYear = `${date}.${month}.${year}`;
    const time = `${hours}:${minutes}`;
    const fullTime = `${dateMonthYear} ${time}`;
    return fullTime;
};

// localStorage.clear();

const createList = (id, title, num, time) => {
    const listItem = `<li>
    <span>${title}</span>
    <span>${num} €</span>
    <span>${time}</span>
  </li>
  `;
    if (id == 'Income') {
        incomeWrapper.insertAdjacentHTML('beforeend', listItem);
    } else if (id == 'Expense') {
        expenseWrapper.insertAdjacentHTML('beforeend', listItem);
    }
};

function getData() {
    const data = JSON.parse(localStorage.getItem('storedData'));
    if (data) {
        return data;
    }
    return [];
}

function generalData() {
    const data = getData();
    if (data) {
        data.forEach(storedData => createList(storedData.id, storedData.title, storedData.num, storedData.time));
    }
}

function saveDateAndCountBalance(data) {
    const storedData = getData();
    storedData.push(data);
    const storedDataStringify = JSON.stringify(storedData);
    localStorage.setItem('storedData', storedDataStringify);
    createList(data.id, data.title, data.num, data.time);
    countBalance();
}

function countBalance() {
    const storedData = getData();
    const getBalance = storedData.reduce(function(total, itemData) {
        if (itemData.id === 'Expense') {
            return total - parseFloat(itemData.num);
        }
        return total + parseFloat(itemData.num);
    }, 0);
    result.innerHTML = getBalance;
}

// get data first time run
generalData();
countBalance();

// when click
form.addEventListener('submit', function(event) {
    event.preventDefault();

    const data = {
        id: select.value,
        title: description.value,
        num: amount.value,
        time: displayDateTime(),
    };
    // Destructuring
    // const { title, num, time } = data;
    // create UI
    // Store to localStorage

    saveDateAndCountBalance(data);

    // Reset input UI
    description.value = '';
    amount.value = '';
    description.focus();
});

reset.addEventListener('click', function() {
    localStorage.clear();
    incomeWrapper.innerHTML = '';
    expenseWrapper.innerHTML = '';
    result.innerHTML = `My account balance: 0 €`;
});
