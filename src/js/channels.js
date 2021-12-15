let channelsProgram = document.querySelector(`.main`).querySelectorAll(`.channels__channel`);

let deactivateLinks = (evt) => {
    evt.preventDefault();
}

for (let index = 0; index < channelsProgram.length; index++) {
    channelsProgram[index].addEventListener(`click`, deactivateLinks);
}