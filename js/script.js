/* eslint-disable prefer-destructuring */
const inputValue = document.querySelectorAll('.userInput input');
const buttonCalculate = document.querySelector('.userInput button ');
const output = document.querySelectorAll('.output>div');
function BMI(weigh, height) {
  return weigh / height ** 2;
}

const BMI_Result = [
  {
    text: 'Underweight: BMI is less than 18.5',
    imageUrl: './BMI/img/underweight.jpg',
    color: 'orange',
  },
  {
    text: 'Normal weight: BMI is 18.5 to 24.9',
    imageUrl: './BMI/img/normal.jpg',
    color: 'green',
  },
  {
    text: 'Overweight: BMI is 25 to 29.9',
    imageUrl: './BMI/img/overweight.jpg',
    color: 'brown',
  },
  {
    text: 'Obese: BMI is 30 or more',
    imageUrl: './BMI/img/obese.jpg',
    color: 'red',
  },
];

const outputText = BMI_Result.map(
  item => `<li style="color:${item.color}">${item.text}</li>`
).join('');

output[0].innerHTML = `<ul>${outputText}</ul>`;

buttonCalculate.addEventListener('click', function() {
  const userBMI = BMI(inputValue[0].value, inputValue[1].value);
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
      break;
  }
  // console.log(yourBMI);
  output[1].querySelector('img ').setAttribute('src', yourBMI.imageUrl);
  output[2].textContent = `Your BMI is ${userBMI.toFixed(1)}, ${yourBMI.text}`;
  output[2].style.backgroundColor = yourBMI.color;
});
