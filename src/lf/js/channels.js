let channelsProgram = document.querySelector(`.channels--program`).querySelectorAll(`.channels__channel`);

let deactivateLinks = (evt) => {
    if (document.documentElement.clientWidth <= 480) {
        evt.preventDefault();
    }
}

for (let index = 0; index < channelsProgram.length; index++) {
    channelsProgram[index].addEventListener(`click`, deactivateLinks);
}