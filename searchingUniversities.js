const UNIVERSITIES_URL = 'http://universities.hipolabs.com';

const searchForm = document.querySelector('form');
const searchInputElement = searchForm.querySelector('input[type=text]');
const buttonElement = searchForm.querySelector('input[type=submit]');

const tableElement = document.querySelector(".table_container_element");

buttonElement.disabled = true;

searchInputElement.addEventListener('input', (event) => {
  if (event.target.value === '') {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
})

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.target);

  const requestURL = `${UNIVERSITIES_URL}/search?name=${encodeURI(data.get('university_name'))}`;

  buttonElement.disabled = true;
  searchInputElement.value = '';
  tableElement.innerHTML = 'Loading...';

  requestUniversitiesData(requestURL).then(universities => {
    tableElement.innerHTML = '<h1>tabel de vacă</h1>'
    console.log(universities);
  })
});

function requestUniversitiesData(URL) {
  return new Promise((resolve, reject) => {
    fetch(URL).then(response => {
      response.json().then(data => {
        setTimeout(() => {
          resolve(formatUniversitiesData(data));
        }, 3000);
      })
    }).catch(err => reject(err))
  })
}

function formatUniversitiesData(universitiesData) {
  return universitiesData.map(university => {
    const {
      name,
      country,
      web_pages,
    } = university;
    return {
      name: name,
      country: country,
      web_pages: web_pages,
      // also correct:
      // name,
      // country,
      // web_pages,
    }
  })
}
