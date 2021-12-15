(() => {
    /*---------- TRACKS FILTER ----------*/

    const events = document.querySelectorAll(`.event`);
    const submitBtn = document.querySelector(`.filters__tracks-btn--submit`);

    let showTracksBtn = document.querySelector(`.filters__tracks-show-button`); // кнопка открыть меню треков
    let submitTracksBtn = document.querySelector(`.filters__tracks-btn--submit`); // кнопка Применить
    let closeTracksMenu = document.querySelector(`.filters__tracks-btn--close`); //кнопка закрыть меню
    let tracksList = document.querySelector(`.filters__tracks`); // список треков
    let tracks = document.querySelectorAll(`.filters__track`); // треки

    let hideTracksBtnHandler = () => {
        tracksList.classList.add(`visually-hidden`);
        showTracksBtn.classList.remove(`filters__tracks-show-button--opened`);
    }

    let toggleTracksBtnHandler = () => { //открыть-закрыть меню выбора треков
        tracksList.classList.toggle(`visually-hidden`);
        showTracksBtn.classList.toggle(`filters__tracks-show-button--opened`);
    }

    showTracksBtn.addEventListener(`click`, toggleTracksBtnHandler);



    let checkFiltersHandler = (e) => { //поведение чекбоксов выбора треков
        if (e.target.value === 'all') {
            for (let index = 1; index < tracks.length; index++) {
                tracks[index].checked = e.target.checked;
                submitTracksBtn.classList.remove(`visually-hidden`);
                closeTracksMenu.classList.add(`visually-hidden`);
            }
            if (!e.target.checked) {
                submitTracksBtn.classList.add(`visually-hidden`);
                closeTracksMenu.classList.remove(`visually-hidden`);
            }
        } else {
            if (tracks[0].checked === true) {
                tracks[0].checked = false;
            } else {
                let isAllTracksChecked = true;
                let isAllTracksUnchecked = true;

                for (let index = 1; index < tracks.length; index++) {
                    if (tracks[index].checked === false) {
                        isAllTracksChecked = false;
                    } else {
                        isAllTracksUnchecked = false;
                    }
                }

                submitTracksBtn.classList.remove(`visually-hidden`);
                closeTracksMenu.classList.add(`visually-hidden`);

                if (isAllTracksChecked) {
                    tracks[0].checked = true;
                }

                if (isAllTracksUnchecked) {
                    submitTracksBtn.classList.add(`visually-hidden`);
                    closeTracksMenu.classList.remove(`visually-hidden`);
                }
            }
        }
    }

    let hideMenu = (e) => {
        e.preventDefault();
        toggleTracksBtnHandler();
    }

    for (let index = 0; index < tracks.length; index++) {
        tracks[index].addEventListener(`input`, checkFiltersHandler);
    }

    closeTracksMenu.addEventListener(`click`, hideMenu);

    let getTracks = () => {
        let chosenTracks = [];

        for (let index = 1; index < tracks.length; index++) {
            if (tracks[index].checked) {
                chosenTracks.push(tracks[index].value);
            }
        }

        return chosenTracks
    }

    let hideAllEvents = () => {
        for (let index = 0; index < events.length; index++) {
            events[index].classList.add(`visually-hidden`);
        }
    }

    let filterTracks = (e) => {
        e.preventDefault();

        let chosenTracks = getTracks();
        hideAllEvents();

        for (let index = 0; index < events.length; index++) {
            for (let i = 0; i < chosenTracks.length; i++) {
                if (events[index].dataset.stream === chosenTracks[i]) {
                    events[index].classList.remove(`visually-hidden`);
                }
            }
        }

        toggleTracksBtnHandler();
    }

    submitBtn.addEventListener(`click`, filterTracks);



    /*---------- DATE FILTER ----------*/

    let dates = document.querySelectorAll(`.schedule__timeline-wrapper`);
    let filtersDate = document.querySelectorAll(`.filters__date`);
    let schedule = document.querySelector(`.schedule`);

    let hideAllDates = () => {
        for (let index = 0; index < dates.length; index++) {
            dates[index].classList.add(`visually-hidden`);
        }
    }

    let filterDate = (e) => {
        if (e.target.value === 'all') {
            for (let index = 0; index < dates.length; index++) {
                dates[index].classList.remove(`visually-hidden`);
                dates[index].classList.remove(`visually-hidden`);
                $('.timeline').eq(index).slick('slickGoTo', $('.timeline').eq(index).slick('slickCurrentSlide'), true);
            }
        } else {
            hideAllDates();
            let indexDate;
            for (let index = 1; index < filtersDate.length; index++) {
                if (filtersDate[index].value === e.target.value) {
                    indexDate = index - 1;
                }
            }
            dates[indexDate].classList.remove(`visually-hidden`);
            $('.timeline').eq(indexDate).slick('slickGoTo', $('.timeline').eq(indexDate).slick('slickCurrentSlide'), true);
        }

        schedule.scrollTop = 0;
    }

    for (let index = 0; index < filtersDate.length; index++) {
        filtersDate[index].addEventListener(`input`, filterDate);
    }

    let ready = () => {
        document.querySelector(`.schedule`).scrollTop = 0;
    }

    document.addEventListener("DOMContentLoaded", ready);

})();