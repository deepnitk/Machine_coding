import "./styles.css";
import {getSuggestions, debounce} from "./utils";

// getSuggestions("app").then((res) => console.log(res));

const inputBox = document.getElementById("search-input");
const suggestionBox = document.getElementById("suggestions-wrapper");

const resetState = () => {
  suggestionBox.classList.remove("suggestions-visible");
}
const renderDropdownItems = (list) => {
  const suggFragment = document.createDocumentFragment();
  list.forEach((item) => {
    const el = document.createElement('div');
    el.innerHTML = item;
    el.classList.add("dropdown-item");
    el.setAttribute('data-key', item);
    suggFragment.appendChild(el);
  })
  suggestionBox.innerHTML = "";
  suggestionBox.appendChild(suggFragment);
};

const handleSerach = async (keyword) => {
  const result = await getSuggestions(keyword);

  console.log(result);

  if (result.length) {
    suggestionBox.classList.add("suggestions-visible");
    renderDropdownItems(result);
  } 
};

const handleInputChange = (event) => {
  const value = event.target.value;
  if (value) {
    handleSerach(value);
  } else {
    resetState();
  }
  
}

const handleSelect = (event) => {
  const {key} = event.target.dataset;
  if (key) {
    inputBox.value = key
    resetState();
  }
}

(() => {
  inputBox.addEventListener("input", debounce(handleInputChange, 500));
  suggestionBox.addEventListener("click", handleSelect);
})();