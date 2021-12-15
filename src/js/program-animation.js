const days = document.querySelectorAll(`.schedule__timeline-wrapper`); //Дни в расписании
const timeline = document.querySelectorAll(`.timeline`);
const events = document.querySelectorAll(`.event`);


/*---------- Calculation of event's height ----------*/

const pxPerMin = 5;
const colon = `:`;
const topShift = 60;


let getMinutes = (start, end) => {
    let hours = end[0] - start[0];
    let minutes = end[1] - start[1] + hours * 60;
    return minutes
}

let getSessionStartTime = (session) => {
    return session.querySelector(`.event__time-start`).innerHTML.split(colon)
}

let getSessionEndTime = (session) => {
    return session.querySelector(`.event__time-end`).innerHTML.split(colon)
}

let getHeightEvent = (session) => {
    let start = getSessionStartTime(session);
    let end = getSessionEndTime(session);
    let minutes = getMinutes(start, end);

    return minutes * pxPerMin
};

let setHeightEvent = (session) => {
    let height = getHeightEvent(session);
    session.style.height = height + `px`;
}


/*---------- Get START and END of day and array of HOURS ----------*/

let getFirstEventStartTime = (events) => {
    let starts = [];
    let minIndex;

    for (let index = 0; index < events.length; index++) {
        starts.push(+getSessionStartTime(events[index])[0] + getSessionStartTime(events[index])[1])
    }

    let minValue = Math.min.apply(null, starts).toString();
    minIndex = starts.indexOf(minValue);

    return getSessionStartTime(events[minIndex]);
}

let getLastEventEndTime = (events) => {
    let ends = [];
    let maxIndex;

    for (let index = 0; index < events.length; index++) {
        ends.push(getSessionEndTime(events[index])[0] + getSessionEndTime(events[index])[1])
    }
    let maxValue = Math.max.apply(null, ends).toString();
    maxIndex = ends.indexOf(maxValue);

    return getSessionEndTime(events[maxIndex]);
}

let getTimelineHeight = (events) => {
    let firstEventStartTime = getFirstEventStartTime(events);
    firstEventStartTime[1] = "00";
    let lastEventEndTime = getLastEventEndTime(events);
    return getMinutes(firstEventStartTime, lastEventEndTime) * pxPerMin + "px"
}

let getStartHour = (events) => {
    let starts = [];
    for (let index = 0; index < events.length; index++) {
        starts.push(+getSessionStartTime(events[index])[0]);
    }
    return minHour = Math.min.apply(null, starts)
}

let getEndHour = (events) => {
    let ends = [];
    for (let index = 0; index < events.length; index++) {
        ends.push(+getSessionEndTime(events[index])[0]);
    }
    return Math.max.apply(null, ends)
}

let getHours = (events) => {
    let hours = [];
    let start = getStartHour(events);
    let end = getEndHour(events);
    let length = end - start + 1;

    for (let index = 0; index < length; index++) {
        hours.push(start + index);
    }

    return hours
}


/*---------- Set TIMELINE height ----------*/

let setDayHeight = (events, streams) => {
    let scheduleHeight = getTimelineHeight(events);

    for (let index = 0; index < streams.length; index++) {
        streams[index].style.height = scheduleHeight;
    }
}


/*---------- Render HOURS elements ----------*/

let getHourTop = (hour, events) => {
    let start = getStartHour(events);
    if (hour == start) {
        return topShift + "px"
    } else {
        return top = (hour - start) * 60 * pxPerMin + topShift + "px";
    }
}


/*---------- Create HOURS elements ----------*/

const fragment = document.createDocumentFragment();
const template = document.querySelector(`#templateHour`).content.querySelector(`.schedule__hour.hour`);


/*---------- Set EVENTS TOP ----------*/

let setEventsTop = (events) => {
    let firstEventStartTime = getFirstEventStartTime(events);

    firstEventStartTime[1] = '00';

    for (let index = 0; index < events.length; index++) {
        let eventStartTime = getSessionStartTime(events[index]);
        let top = getMinutes(firstEventStartTime, eventStartTime) * pxPerMin + "px";
        events[index].style.top = top;
    }
}


/*---------- Render Timeline ----------*/

let renderEvents = (events) => {
    for (let index = 0; index < events.length; index++) {
        setHeightEvent(events[index]);
    }
    setEventsTop(events);
}


let renderDay = (day) => {
    let streams = day.querySelectorAll(`.stream`);
    let events = day.querySelectorAll(`.event`);

    setDayHeight(events, streams); //Задаем высоту дня

    renderEvents(events);

    const fragment = document.createDocumentFragment();
    const template = document.querySelector(`#templateHour`).content.querySelector(`.schedule__hour.hour`);



    let hours = getHours(events);


    for (let index = 0; index < hours.length; index++) {
        const element = template.cloneNode(true);
        element.querySelector(`.hour__heading`).innerHTML = hours[index];
        element.style.top = getHourTop(hours[index], events);
        fragment.appendChild(element);
    }

    day.appendChild(fragment);


}


//Отрисовываем программу
let render = (days) => {
    for (let index = 0; index < days.length; index++) {
        renderDay(days[index]);
    }
}

render(days);



/*---------- Current Time Shift ----------*/

const schedule = document.querySelector(`.schedule`);
const headerChannels = document.querySelectorAll(`.header-channels__channel`);
const headerChannelCurrent = document.querySelector(`.header-channels__channel--current`);
const timelines = document.querySelectorAll(`.timeline`);

const scheduleShiftMarginTop = 30;
const dayShiftMarginTop = -114;


let now = new Date();


let getCurrentChannelNumber = () => {
    for (let index = 0; index < headerChannels.length; index++) {
        if (headerChannels[index].classList.contains('header-channels__channel--current')) {
            return index
        }
    }
}

let getDates = () => {
    const r = /\d+/;
    let dates = [];
    const datesHeadings = document.querySelectorAll('.schedule__heading-day');
    for (let index = 0; index < datesHeadings.length; index++) {
        dates.push(+datesHeadings[index].textContent.match(r));
    }

    return dates
}




let moveSchedule = (height) => {
    schedule.scrollTop = height;
}

const datesHeadings = document.querySelectorAll('.schedule__heading-day');

let getDayHeight = (numberOfDay) => {
    const dayMargin = 50;
    const dayHeadingHeight = 60;
    const dayPadding = 13;

    let stream = timelines[numberOfDay].querySelector(`.stream`);
    return dayMargin + dayHeadingHeight + dayPadding + stream.getBoundingClientRect().height
}

let getScrollHeight = (numberOfDay) => { // numberOfDay: from 0 to last
    let scrollHeight = 0;
    const scrollShift = 20;

    for (let index = 0; index < numberOfDay; index++) {
        scrollHeight += getDayHeight(index);
    }

    return scrollHeight + scrollShift
}

let dates = getDates();
let numberOfDay = dates.indexOf(now.getDate());

moveSchedule(getScrollHeight(numberOfDay));


/*---------- Horizontal Slide ---------- */




/*
//let now = new Date();
let now = new Date('May 19, 2021 12:24:00');

let moveSchedule = (height) => {
    schedule.scrollTop = height;
}

const scheduleShiftMarginTop = 30;
const dayShiftMarginTop = -114;

let getScheduleShift = () => {
    return parseInt(getHourTop(now.getHours() + getTimezoneOffsetHoursMSK())) + scheduleShiftMarginTop
}

let getTimezoneOffsetHoursMSK = () => {
    return now.getTimezoneOffset() / 60 + 3
}


if (getHours(events).indexOf(now.getHours()) >= 0) {
    moveSchedule(getScheduleShift());
}*/