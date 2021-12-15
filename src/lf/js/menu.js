let hamburger = document.querySelector(`.hamburger`);
let menu = document.querySelector(`.menu__list`);
let overlay = document.querySelector(`.overlay`);
let overlayTransparent = document.querySelector(`.overlay--transparent`);
let menuElementParent = document.querySelector(`.menu__element--parent`);

let hamburgerHandler = () => {
    hamburger.classList.toggle(`hamburger--open`);
    hamburger.classList.toggle(`hamburger--close`);
    overlay.classList.toggle(`visually-hidden`);
    overlayTransparent.classList.toggle(`visually-hidden`);
    menu.classList.toggle(`menu__list--hidden`);
}

let menuElementParentHandler = () => {
    menuElementParent.querySelector(`.menu__link`).classList.toggle(`menu__link--closed`);
}

hamburger.addEventListener(`click`, hamburgerHandler);
overlayTransparent.addEventListener(`click`, hamburgerHandler);
menuElementParent.addEventListener(`click`, menuElementParentHandler);