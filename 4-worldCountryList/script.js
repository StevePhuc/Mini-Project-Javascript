/* eslint-disable no-undef */
// countriesObject;

const totalCountries = document.querySelector('header b');
const searchText = document.querySelector('.result__input');
const result = document.querySelector('.result__country');
const findName = document.querySelector('#findName');
const findCapital = document.querySelector('#findCapital');
const findLanguages = document.querySelector('#findLanguages');

totalCountries.textContent = countriesObject.length;

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

function showTotalCountries(countryFind, keyword, search) {
  // show search result how many countries there are
  const searchResult = document.querySelector('.search__result');
  const sumCountryFind = countryFind.length;
  let tobe = 'are';
  if (sumCountryFind == 1 || sumCountryFind == 0) {
    tobe = 'is';
  }
  searchResult.innerHTML = `Total ${keyword} <span class='result_search'>${search}</span> ${tobe}  <span class='result_number'>${sumCountryFind}</span>`;
  if (countryFind.length == countriesObject.length) {
    searchResult.innerHTML = '';
  }
}

function findCountries(search, any) {
  // check search type start with or any contain
  let re = new RegExp(search, 'gi');
  let keyword = 'contain';
  if (any == 0) {
    re = new RegExp(`^${search}`, 'i');
    keyword = 'start with';
  }
  // check type Search with Name or Capital or Languages or all..
  const countryFind = countriesObject.filter(country => {
    const checkFind =
      (country.name.match(re) && findName.checked) ||
      (country.capital.match(re) && findCapital.checked) ||
      (country.languages.join(',').match(re) && findLanguages.checked);

    if (checkFind) return country;
  });
  showTotalCountries(countryFind, keyword, search);
  return countryFind;
}

function sortCountries(listCountries, sortBtnType) {
  const arrSort = [...listCountries];
  const sortCheck = document
    .querySelector(`#${sortBtnType} .fas`)
    .classList.contains('fa-sort-alpha-up');

  if (sortCheck == true) {
    return arrSort.sort((a, b) => (a[sortBtnType] > b[sortBtnType] ? -1 : 1));
  }
  return arrSort.sort((a, b) => (a[sortBtnType] < b[sortBtnType] ? -1 : 1));
}

function changeTextSearch(country) {
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
        findCountry[key] = country[key]
          .join(', ')
          .replace(
            reSearch,
            `<span class='text-search'>${searchText.value.toLowerCase()}</span>`
          );
      }
    });
  } else {
    findCountry = country;
  }

  return findCountry;
}

function renderCountries(listCountries) {
  let divResult = '';
  listCountries.map(country => {
    const findCountry = changeTextSearch(country);
    let html = `<div> 
    <p class="flag"><img src=${country.flag}></p>
      <p class="name">${findCountry.name}</p>
      <p class="capital">${findCountry.capital}</p>
      <p class="languages">${findCountry.languages}</p> 
      <p class="population">${formatNumber(country.population)}</p>
      </div>`;
    const sortBtnType = document.querySelector('.sort-up').id;
    const reSort = new RegExp(sortBtnType);
    html = html.replace(reSort, `${sortBtnType} textUpperCase`);

    divResult += html;
  });
  return divResult;
}

/* FUNCTION FOR SHOW TOP10  */

function sumTotalPopulation(listCountries) {
  const mapTop = new Map();
  mapTop.set('total', 0);

  listCountries.forEach(country => {
    mapTop.set('total', mapTop.get('total') + country.population);
  });
  return mapTop.get('total');
}

const topTotalCountry = sumTotalPopulation(countriesObject);

function percentTotalPopular(numberTop) {
  return `${(
    (100 * parseFloat(numberTop)) /
    parseFloat(topTotalCountry)
  ).toFixed(2)}%`;
}

function renderTopCountry(sortTopCountries, topSearchCountry, topType) {
  const showTopBar = document.querySelector('.showTopBar');

  let html = `
    <p class="total__name">Total ${topType}: </p><p class="total__number"><span>${formatNumber(
    topTotalCountry
  )}</span></p>
        <p class="total__background" style="width:100%"></p>
    <p class="total__name">Total Search: </p><p class="total__number"><span>${formatNumber(
      topSearchCountry
    )}</span></p>
        <p class="total__background" style="width:${percentTotalPopular(
          topSearchCountry
        )}"></p>
  `;
  sortTopCountries.forEach((topCountry, index) => {
    html += `
    <p class="total__name">${index + 1}. ${
      topCountry.name
    }: </p><p class="total__number"><span>${formatNumber(
      topCountry.population
    )}</span></p><p class="total__background" style="width:${percentTotalPopular(
      parseFloat(topCountry.population)
    )}"></p>
  `;
  });
  showTopBar.innerHTML = html;
}

function countTopCountries(listCountries, topType) {
  if (topType == 'population') {
    const topSearchCountry = sumTotalPopulation(listCountries);
    const sortTopCountries = sortCountries(listCountries, topType)
      .reverse()
      .slice(0, 10);

    renderTopCountry(sortTopCountries, topSearchCountry, topType);
  }
}

function topCountries(listCountries) {
  const btnTopCheck = document.querySelectorAll('.top__type');
  btnTopCheck.forEach(btnTop => {
    if (btnTop.classList.contains('top__check')) {
      countTopCountries(listCountries, btnTop.id);
    }
  });
}

function showCountries() {
  result.innerHTML = '';

  const searchType = document.querySelector('.search--click').dataset.search;
  const sortBtnType = document.querySelector('.sort-up').id;

  let listCountries = findCountries(searchText.value, searchType);
  listCountries = sortCountries(listCountries, sortBtnType);
  topCountries(listCountries);
  result.innerHTML = renderCountries(listCountries);
}
showCountries();

searchText.addEventListener('keyup', showCountries);

// every time click button run showCountry
const searchFinds = document.querySelectorAll('.search--find');
const sortType = document.querySelectorAll('.sort__type');
const findType = document.querySelectorAll('.findType');

// change when click on button type button
function bntSearch() {
  searchFinds.forEach(searchFind =>
    searchFind.classList.remove('search--click')
  );
  this.classList.add('search--click');
  showCountries();
}

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

// add evemt to every sort and find button

searchFinds.forEach(searchFind => {
  searchFind.addEventListener('click', bntSearch);
});

sortType.forEach(sortItem => {
  sortItem.addEventListener('click', bntSort);
});

findType.forEach(searchItem => {
  searchItem.addEventListener('click', showCountries);
});
