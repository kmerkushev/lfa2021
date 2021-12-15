let showTracksBtn = document.querySelector(`.filters__tracks-show-button`);
let tracksList = document.querySelector(`.filters__tracks`);

let showTracksBtnHandler = () => {
    tracksList.classList.toggle(`visually-hidden`);
    showTracksBtn.classList.toggle(`filters__tracks-show-button--opened`);
}

showTracksBtn.addEventListener(`click`, showTracksBtnHandler);




/*---------- FREE ONLY FILTER ----------*/

let sessions = document.querySelectorAll(`.event`);

let freeOnlyFilter = document.querySelector(`.filters__free-label`);
let freeOnlyFilterInput = document.querySelector(`.filters__free`);

let filterFree = (evt) => {

}

freeOnlyFilterInput.addEventListener(`click`, filterFree);