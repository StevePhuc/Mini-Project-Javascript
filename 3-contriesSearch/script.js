const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombi",
  "Comoros",
  "Congo (Brazzaville)",
  "Congo",
  "Costa Rica",
  "Cote d'Ivoire",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "East Timor (Timor Timur)",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia, The",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea, North",
  "Korea, South",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia and Montenegro",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe"
];

const totalCountries = document.querySelector("header b");
const searchText = document.querySelector(".result__input");
const result = document.querySelector(".result__country");

totalCountries.textContent = countries.length;

const rgbGenerator = () => {
  const red = `0${Math.floor(Math.random() * 256).toString(16)}`.slice(-2);
  const green = `0${Math.floor(Math.random() * 256).toString(16)}`.slice(-2);
  const blue = `0${Math.floor(Math.random() * 256).toString(16)}`.slice(-2);
  return `#${red}${green}${blue}`;
};

function findCountries(search, any) {
  let re = new RegExp(search, "gi");
  let keyword = "contain";
  if (any == 0) {
    // countryFind = countries.filter(country =>
    //   country.toUpperCase().startsWith(search.toUpperCase())
    //   );
    re = new RegExp("^" + search, "i");
    keyword = "start with";
  }
  const countryFind = countries.filter(country => country.match(re));
  const searchResult = document.querySelector(".search__result");
  const sumCountryFind = countryFind.length;
  if (sumCountryFind == 1 || sumCountryFind == 0) {
    searchResult.innerHTML = `Country ${keyword} <span class='result_search'>${search}</span> is  <span class='result_number'>${sumCountryFind}</span>`;
  } else if (countryFind.length < countries.length) {
    searchResult.innerHTML = `Countries ${keyword} <span class='result_search'>${search}</span> are  <span class='result_number'>${sumCountryFind}</span>`;
  } else {
    searchResult.innerHTML = "";
  }
  return countryFind;
}

function showCountries() {
  result.innerHTML = "";

  const searchType = document.querySelector(".search--click").dataset.search;
  const listCountries = findCountries(searchText.value, searchType);

  const sortType = document
    .querySelector(".search__AZ .fas")
    .classList.contains("fa-sort-alpha-up");
  if (sortType == true) listCountries.reverse();

  listCountries.map(country => {
    const color = rgbGenerator();
    const box = document.createElement("div");
    box.style.backgroundColor = color;
    const re = new RegExp(searchText.value, "gi");
    const boldFind = country.replace(
      re,
      `<b>${searchText.value.toLowerCase()}</b>`
    );
    box.innerHTML = `<span class="country-text">${boldFind}</span>`;
    result.appendChild(box);
  });
}
showCountries();

searchText.addEventListener("keyup", showCountries);

// change when click search type button
const searchFinds = document.querySelectorAll(".search--find");
function bntSearch() {
  searchFinds.forEach(searchFind =>
    searchFind.classList.remove("search--click")
  );
  this.classList.add("search--click");
  showCountries();
}

searchFinds.forEach(searchFind => {
  searchFind.addEventListener("click", bntSearch);
});

// sort button

const btnSort = document.querySelector(".search__AZ");
btnSort.addEventListener("click", function() {
  btnSort.classList.toggle("sort-up");
  document
    .querySelector(".search__AZ .fas")
    .classList.toggle("fa-sort-alpha-up");
  showCountries();
});
