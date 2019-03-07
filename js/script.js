/* eslint-disable prefer-destructuring */
const inputSelect = document.querySelectorAll('.userInput input');
const buttonCalculate = document.querySelector('.userInput button ');
const output = document.querySelectorAll('.output>div');
function BMI(weigh, height) {
  return weigh / height ** 2;
}

function showError() {
  const textError = `<b style="color:red">Please check the input. Only number. Mass in Kg. Height in meter</b>`;

  const text = document.createElement('span');
  text.innerHTML = textError;
  // console.log(text);

  document.querySelector('.userInput').appendChild(text);
  inputSelect.forEach(input => (input.style.borderColor = 'red'));

  output[2].style.backgroundColor = 'white';
  output[2].querySelector('p').innerHTML = textError;
}

function hideError() {
  const hideSpan = document.querySelector('.userInput span');
  // console.log(hideSpan);

  if (hideSpan) {
    inputSelect.forEach(input => (input.style.borderColor = 'black'));
    hideSpan.parentNode.removeChild(hideSpan);
  }
}

const BMI_Result = [
  {
    text: 'Underweight: BMI is less than 18.5',
    imageUrl: './BMI/img/underweight.jpg',
    color: 'rgba(255, 165, 1)',
    colorBackground: 'rgba(255, 165, 1,0.5)',
  },
  {
    text: 'Normal weight: BMI is 18.5 to 24.9',
    imageUrl: './BMI/img/normal.jpg',
    color: 'rgba(0, 128, 0)',
    colorBackground: 'rgba(0, 128, 0,0.5)',
  },
  {
    text: 'Overweight: BMI is 25 to 29.9',
    imageUrl: './BMI/img/overweight.jpg',
    color: 'rgba(165, 42, 42,0.5)',
    colorBackground: 'rgba(165, 42, 42,0.5)',
  },
  {
    text: 'Obese: BMI is 30 or more',
    imageUrl: './BMI/img/obese.jpg',
    color: 'rgba(255, 0, 0)',
    colorBackground: 'rgba(255, 0, 0,0.5)',
  },
];

const outputText = BMI_Result.map(
  item => `<li style="color:${item.color}">${item.text}</li>`
).join('');

output[0].innerHTML = `<ul>${outputText}</ul>`;

buttonCalculate.addEventListener('click', function() {
  const userBMI = BMI(inputSelect[0].value, inputSelect[1].value);
  // console.log(userBMI);
  // console.log(output);
  let yourBMI;
  switch (true) {
    case userBMI < 18.5:
      yourBMI = BMI_Result[0];
      break;
    case userBMI < 24.9:
      yourBMI = BMI_Result[1];
      break;
    case userBMI < 29.9:
      yourBMI = BMI_Result[2];
      break;
    case userBMI >= 30:
      yourBMI = BMI_Result[3];
      break;
    default:
      yourBMI = 0;
      break;
  }
  // console.log(yourBMI);
  if (yourBMI != 0) {
    hideError();
    output[1].querySelector('img ').setAttribute('src', yourBMI.imageUrl);
    // eslint-disable-next-line prettier/prettier
    output[2].querySelector('p').innerHTML = `<b>Your BMI is ${userBMI.toFixed(1)}, ${yourBMI.text}</b>`;
    output[2].style.backgroundColor = yourBMI.colorBackground;
  } else {
    hideError();
    showError();
  }
});
