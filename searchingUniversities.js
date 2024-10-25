let inputElement = document.getElementById("univ_search_input");
let searchButtonElement = document.querySelector("button");
let tableElement = document.querySelector(".table_container_element");


function getSearchInput() {
  inputElement.addEventListener("change", (event) => {
    if (event.target.value === "") {
      searchButtonElement.disabled = true;
    }

    tableElement.innerHTML = "";
    tableElement.innerHTML = event.target.value;
    event.target.value = "";
  })
  
}

getSearchInput();