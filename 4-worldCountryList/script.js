/* eslint-disable no-undef */
// countriesObject;

const totalCountries = document.querySelector('header b');
const searchText = document.querySelector('.result__input');
const result = document.querySelector('.result__country');

totalCountries.textContent = countriesObject.length;

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

function findCountries(search, any) {
  let re = new RegExp(search, 'gi');
  let keyword = 'contain';
  if (any == 0) {
    re = new RegExp(`^${search}`, 'i');
    keyword = 'start with';
  }
  const countryFind = countriesObject.filter(country => {
    const sortName = document.querySelector('#sortName');
    const sortCapital = document.querySelector('#sortCapital');
    const sortLanguages = document.querySelector('#sortLanguages');

    const checkFind =
      (country.name.match(re) && sortName.checked) ||
      (country.capital.match(re) && sortCapital.checked) ||
      (country.languages.join(',').match(re) && sortLanguages.checked);

    if (checkFind) return country;
  });
  const searchResult = document.querySelector('.search__result');
  const sumCountryFind = countryFind.length;
  searchResult.innerHTML = '';
  if (sumCountryFind == 1 || sumCountryFind == 0) {
    searchResult.innerHTML = `Total ${keyword} <span class='result_search'>${search}</span> is  <span class='result_number'>${sumCountryFind}</span>`;
  } else if (countryFind.length < countriesObject.length) {
    searchResult.innerHTML = `Total ${keyword} <span class='result_search'>${search}</span> are  <span class='result_number'>${sumCountryFind}</span>`;
  }
  return countryFind;
}

function sortCountries(listCountries, sortBtnType) {
  const sortCheck = document
    .querySelector(`#${sortBtnType} .fas`)
    .classList.contains('fa-sort-alpha-up');

  if (sortCheck == true) {
    return listCountries.sort((a, b) =>
      a[sortBtnType] > b[sortBtnType] ? -1 : 1
    );
  }
  return listCountries.sort((a, b) =>
    a[sortBtnType] < b[sortBtnType] ? -1 : 1
  );
}

function showCountries() {
  result.innerHTML = '';

  const searchType = document.querySelector('.search--click').dataset.search;
  const sortBtnType = document.querySelector('.sort-up').id;

  let listCountries = findCountries(searchText.value, searchType);
  listCountries = sortCountries(listCountries, sortBtnType);

  listCountries.map(country => {
    const box = document.createElement('div');
    let findCountry = {};
    if (searchText.value != '') {
      const reSearch = new RegExp(searchText.value, 'gi');
      Object.keys(country).forEach(key => {
        if (key == 'name' || key == 'capital') {
          findCountry[key] = country[key].replace(
            reSearch,
            `<span class='text-search'>${searchText.value.toLowerCase()}</span>`
          );
        }
        if (key == 'languages') {
          const arrayLanguages = [];
          country[key].forEach((language, index) => {
            arrayLanguages.push(
              language.replace(
                reSearch,
                `<span class='text-search'>${searchText.value.toLowerCase()}</span>`
              )
            );
          });
          findCountry[key] = arrayLanguages;
        }
      });
    } else {
      findCountry = Object.assign({}, country);
    }

    let html = ` 
    <p class="flag"><img src=${country.flag}></p>
      <p class="name">${findCountry.name}</p>
      <p class="capital">${findCountry.capital}</p>
      <p class="languages">${findCountry.languages.join(', ')}</p> 
      <p class="population">${formatNumber(country.population)}</p>
    `;
    const reSort = new RegExp(sortBtnType);
    html = html.replace(reSort, `${sortBtnType} textUpperCase`);

    box.innerHTML = html;
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
  if (this.classList.contains('sort-up')) {
    this.querySelector('.fas').classList.toggle('fa-sort-alpha-up');
  } else {
    this.classList.add('sort-up');
  }
  showCountries();
}

sortType.forEach(sortItem => {
  sortItem.addEventListener('click', bntSort);
});

// change when click search type button
const sortSearch = document.querySelectorAll('.sortSearch');
sortSearch.forEach(searchItem => {
  console.log(searchItem);

  searchItem.addEventListener('click', showCountries);
});
