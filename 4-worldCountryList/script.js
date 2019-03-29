/* eslint-disable no-undef */
// countriesObject;

const totalCountries = document.querySelector('header b');
const searchText = document.querySelector('.result__input');
const result = document.querySelector('.result__country');
const findName = document.querySelector('#findName');
const findCapital = document.querySelector('#findCapital');
const findLanguages = document.querySelector('#findLanguages');
const showTopBar = document.querySelector('.showTopBar');

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
  result.innerHTML = '';

  let divResult = '';
  listCountries.map(country => {
    const findCountry = changeTextSearch(country);
    let html = `<div class="wrapper-country"> 
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
  result.innerHTML = divResult;
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

function sumTopLanguages(listCountries) {
  const mapTop = new Map();

  listCountries.forEach(country => {
    country.languages.forEach(language => {
      if (mapTop.has(language)) {
        mapTop.set(language, mapTop.get(language) + 1);
      } else {
        mapTop.set(language, 1);
      }
    });
  });
  return Array.from(mapTop);
}

const topTotalLanguages = sumTopLanguages(countriesObject);

function percentTotalPopular(numberTop) {
  return `${(
    (100 * parseFloat(numberTop)) /
    parseFloat(topTotalCountry)
  ).toFixed(2)}%`;
}

function renderTopCountry(sortTopCountries, topSearchCountry, topType) {
  let html = `
    <p class="total__name" style="background: linear-gradient(-90deg, darkred 100%, black 0);">
      <span>Total ${topType} all:</span>
      <span>${formatNumber(topTotalCountry)}</span>
    </p> 
    <p class="total__name" 
        style="background: linear-gradient(-90deg, darkred ${percentTotalPopular(
          topSearchCountry
        )}, black 0);">
      <span>Total  ${topType} result:</span> 
      <span>${formatNumber(topSearchCountry)}</span>
    </p>       
  `;
  sortTopCountries.forEach((topCountry, index) => {
    html += `
    <p class="total__name"  style="background: linear-gradient(-90deg, darkred ${percentTotalPopular(
      parseFloat(topCountry.population)
    )}, black 0);">
      <span>${index + 1}. ${topCountry.name}:</span>
      <span>${formatNumber(topCountry.population)}</span> </p>
    </p>
  `;
  });
  showTopBar.innerHTML = html;
}

function percentLanguages(numberTop) {
  // eslint-disable-next-line prettier/prettier
  return `${((100 * numberTop) / parseFloat(topTotalLanguages.length)).toFixed(2)}%`;
}

function renderTopLanguages(arrTopLanguages) {
  const showTopBar = document.querySelector('.showTopBar');
  let html = `
  <p class="total__name" style="background: linear-gradient(-90deg, darkred 100%, black 0);">
    <span>Total languages all:</span>
    <span>${topTotalLanguages.length}</span>
  </p> 
  <p class="total__name" 
      style="background: linear-gradient(-90deg, darkred ${percentLanguages(
        arrTopLanguages.length
      )}, black 0);">
    <span>Total languages result:</span> 
    <span>${arrTopLanguages.length}</span>
  </p>       
`;

  const top10Languages = arrTopLanguages
    .sort((a, b) => {
      if (a[1] > b[1]) {
        return -1;
      }
      return 1;
    })
    .slice(0, 10);

  top10Languages.forEach((language, index) => {
    html += `
    <p class="total__name"  style="background: linear-gradient(-90deg, darkred ${percentLanguages(
      language[1]
    )}, black 0);">
      <span>${index + 1}. ${language[0]}:</span>
      <span>${language[1]}</span> </p>
    </p>
  `;
  });
  showTopBar.innerHTML = html;
}

function countTopCountries(listCountries, topType) {
  console.log('count top');
  if (topType == 'population') {
    const topSearchCountry = sumTotalPopulation(listCountries);
    // for when click sort by population
    const sortCheckPopulation = document
      .querySelector(`#population .fas`)
      .classList.contains('fa-sort-alpha-up');
    let sortTopCountries;
    if (sortCheckPopulation == false) {
      sortTopCountries = sortCountries(listCountries, topType)
        .reverse()
        .slice(0, 10);
    } else {
      sortTopCountries = sortCountries(listCountries, topType).slice(0, 10);
    }

    renderTopCountry(sortTopCountries, topSearchCountry, topType);
  }

  if (topType == 'languages') {
    renderTopLanguages(sumTopLanguages(listCountries));
  }
}

function topCountries(listCountries) {
  const btnTopCheck = document.querySelector('.top__check');
  if (btnTopCheck) {
    countTopCountries(listCountries, btnTopCheck.id);
  }
}

function showCountries() {
  const searchType = document.querySelector('.search--click').dataset.search;
  const sortBtnType = document.querySelector('.sort-up').id;

  let listCountries = findCountries(searchText.value, searchType);
  listCountries = sortCountries(listCountries, sortBtnType);
  topCountries(listCountries);
  renderCountries(listCountries);
}

searchText.addEventListener('keyup', showCountries);

// every time click button run showCountry
const searchFinds = document.querySelectorAll('.search--find');
const sortType = document.querySelectorAll('.sort__type');
const findType = document.querySelectorAll('.findType');
const topType = document.querySelectorAll('.top__type');

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

function bntTop() {
  if (this.classList.contains('top__check')) {
    this.classList.remove('top__check');
    showTopBar.style.display = 'none';
  } else {
    showTopBar.style.display = 'block';
    topType.forEach(btnTopType => btnTopType.classList.remove('top__check'));
    this.classList.add('top__check');
    showCountries();
  }
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

topType.forEach(btnTopType => {
  btnTopType.addEventListener('click', bntTop);
});
// user experience
const videoPlay = document.querySelector('.video-background');
searchText.addEventListener('focus', function() {
  if (searchText.value == '') {
    videoPlay.style.display = 'none';
    showCountries();
  }
});

searchText.addEventListener('blur', function() {
  if (searchText.value == '') {
    result.innerHTML = '';
    videoPlay.style.display = 'flex';
  }
});
