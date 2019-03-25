/* eslint-disable no-undef */
// countriesObject;

const totalCountries = document.querySelector('header b');
const searchText = document.querySelector('.result__input');
const result = document.querySelector('.result__country');

totalCountries.textContent = countriesObject.length;

function findCountries(search, any) {
  let re = new RegExp(search, 'gi');
  let keyword = 'contain';
  if (any == 0) {
    re = new RegExp(`^${search}`, 'i');
    keyword = 'start with';
  }
  const countryFind = countriesObject.filter(country => {
    let checkFind = country.name.match(re) || country.capital.match(re);
    country.languages.forEach(language => {
      if (language.match(re)) {
        checkFind = true;
      }
    });
    if (checkFind) return country;
  });
  const searchResult = document.querySelector('.search__result');
  const sumCountryFind = countryFind.length;
  if (sumCountryFind == 1 || sumCountryFind == 0) {
    searchResult.innerHTML = `Total ${keyword} <span class='result_search'>${search}</span> is  <span class='result_number'>${sumCountryFind}</span>`;
  } else if (countryFind.length < countriesObject.length) {
    searchResult.innerHTML = `Total ${keyword} <span class='result_search'>${search}</span> are  <span class='result_number'>${sumCountryFind}</span>`;
  } else {
    searchResult.innerHTML = '';
  }
  return countryFind;
}

function showCountries() {
  result.innerHTML = '';

  const searchType = document.querySelector('.search--click').dataset.search;
  // console.log(searchType);

  const listCountries = findCountries(searchText.value, searchType);

  const sortNameCheck = document
    .querySelector('#sortName .fas')
    .classList.contains('fa-sort-alpha-up');
  if (sortNameCheck == true) listCountries.reverse();

  listCountries.map(country => {
    const box = document.createElement('div');

    // const re = new RegExp(searchText.value, 'gi');
    // const boldFind = country.name.replace(
    //   re,
    //   `<b>${searchText.value.toLowerCase()}</b>`
    // );
    box.innerHTML = ` 
    <p class="flag"><img src=${country.flag}></p>
      <p class="name">${country.name}</p>
      <p class="capital">${country.capital}</p>
      <p class="languages">${country.languages.join(', ')}</p> 
      <p class="population">${country.population}</p>
    `;
    result.appendChild(box);
  });
}
showCountries();

searchText.addEventListener('keyup', showCountries);

// change when click SEARCH type button
const searchFinds = document.querySelectorAll('.search--find');
function bntSearch() {
  searchFinds.forEach(searchFind =>
    searchFind.classList.remove('search--click')
  );
  this.classList.add('search--click');
  showCountries();
}

searchFinds.forEach(searchFind => {
  searchFind.addEventListener('click', bntSearch);
});

// change when click SORT type button
const sortType = document.querySelectorAll('.sort__name');
function bntSort() {
  sortType.forEach(sortItem => {
    if (sortItem.id != this.id) {
      sortItem.classList.remove('sort-up');
      sortItem.querySelector('.fas').classList.remove('fa-sort-alpha-up');
    }
  });
  this.classList.toggle('sort-up');
  this.querySelector('.fas').classList.toggle('fa-sort-alpha-up');
  showCountries();
}

sortType.forEach(sortItem => {
  sortItem.addEventListener('click', bntSort);
});

// sort by name
const sortName = document.querySelector('#sortName');
const sortCapital = document.querySelector('#sortCapital');
const sortPopulation = document.querySelector('#sortPopulation');
