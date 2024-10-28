const UNIVERSITIES_URL = 'http://universities.hipolabs.com';

const searchForm = document.querySelector('form');
const searchInputElement = searchForm.querySelector('input[type=text]');
const buttonElement = searchForm.querySelector('input[type=submit]');

const tableContainerElement = document.querySelector(".table_container_element");


buttonElement.disabled = true;

searchInputElement.addEventListener('input', (event) => {
  tableContainerElement.innerHTML = "";
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
  const loadingElement = document.createElement('span');
  tableContainerElement.append(loadingElement);
  
  requestUniversitiesData(requestURL).then(universities => {
    tableContainerElement.innerHTML = "";
    const completeTable = createTable(universities);
    tableContainerElement.append(completeTable);
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

function createTable(universities) {
  const tableElement = document.createElement("table");
  const tableHeadElement = document.createElement("thead");
  const tableBodyElement = document.createElement("tbody");
  const tableRowHeadElement = document.createElement("tr");
  const tableHeaderNameElement = document.createElement('th');
  const tableHeaderCountryElement = document.createElement('th');
  const tableHeaderWebPageElement = document.createElement('th');
  
  tableHeaderNameElement.append('University name');
  tableHeaderCountryElement.append('University country');
  tableHeaderWebPageElement.append('University web-pages');
  
  tableRowHeadElement.append(tableHeaderNameElement, tableHeaderCountryElement, tableHeaderWebPageElement);
  tableHeadElement.append(tableRowHeadElement);
  
  
  let universities_infos_elements = universities.map(university => {
    const tableDivisionNameElement = document.createElement("td");
    tableDivisionNameElement.append(`${university.name}`);
    const tableDivisionCountryElement = document.createElement("td");
    tableDivisionCountryElement.append(`${university.country}`);
    const tableDivisionWebPagesElement = document.createElement("td");

    const anchors_web_pages = university.web_pages.map(web_page => {
      const anchor = document.createElement("a");
      anchor.href = web_page;
      anchor.setAttribute("target", "_blank");
      anchor.append(web_page);
      return anchor;
    })
    tableDivisionWebPagesElement.append(...anchors_web_pages);
    
    const tableRowBodyElement = document.createElement("tr");
    tableRowBodyElement.append(tableDivisionNameElement, tableDivisionCountryElement, tableDivisionWebPagesElement);
    return tableRowBodyElement;
  })
  
  
  tableBodyElement.append(...universities_infos_elements);
  tableElement.append(tableHeadElement, tableBodyElement);

  return tableElement;
}