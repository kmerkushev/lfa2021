let showSearchBtn = document.querySelector(`.menu__button-show-search`);
let searchBlock = document.querySelector(`.search`);
let searchInput = document.querySelector(`.search__input`);
let searchBtn = document.querySelector(`.search__button-search`);
let closeSearchBtn = document.querySelector(`.search__button-close`);

let showSearchBtnHandler = () => {
    searchBlock.classList.remove(`search--closed`);
    searchInput.focus();
}

let closeSearchBtnHandler = () => {
    searchBlock.classList.add(`search--closed`);
}

let formHandler = (evt) => {
    console.log(`submit_search`);
    evt.preventDefault();
}

showSearchBtn.addEventListener(`click`, showSearchBtnHandler);
closeSearchBtn.addEventListener(`click`, closeSearchBtnHandler);
searchBlock.addEventListener(`submit`, formHandler);