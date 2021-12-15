/*---------- Calculation of event's height ----------*/
let timeline = document.querySelectorAll(`.timeline`);
let events = document.querySelectorAll(`.event`);


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

/*for (let index = 0; index < events.length; index++) {
    setHeightEvent(events[index]);
}*/


/*---------- Get START and END of day and array of HOURS ----------*/

let getFirstEventStartTime = (events) => {
    let starts = [];
    let minIndex;

    for (let index = 0; index < events.length; index++) {
        starts.push(getSessionStartTime(events[index])[0] + getSessionStartTime(events[index])[1])
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

let setScheduleHeight = (events, streams) => {
    let scheduleHeight = getTimelineHeight(events);

    for (let index = 0; index < streams.length; index++) {
        streams[index].style.height = scheduleHeight;
    }
}

//setScheduleHeight(events);



/*---------- Render HOURS elements ----------*/

let getHourTop = (hour) => {
    let start = getStartHour(events);
    if (hour == start) {
        return topShift + "px"
    } else {
        return top = (hour - start) * 60 * pxPerMin + topShift + "px";
    }
}


/*---------- Create HOURS elements ----------*/

const fragment = document.createDocumentFragment();
const timelineWrapper = document.querySelector(`.schedule__timeline-wrapper`);
const template = document.querySelector(`#templateHour`).content.querySelector(`.schedule__hour.hour`);
/*
let hours = getHours(events);

for (let index = 0; index < hours.length; index++) {
    const element = template.cloneNode(true);
    element.querySelector(`.hour__heading`).innerHTML = hours[index];
    element.style.top = getHourTop(hours[index]);
    fragment.appendChild(element);
}
*/

/*---------- Set EVENTS TOP ----------*/

let setEventsTop = (events) => {
    let firstEventStartTime = getFirstEventStartTime(events);

    for (let index = 0; index < events.length; index++) {
        let eventStartTime = getSessionStartTime(events[index]);
        let top = getMinutes(firstEventStartTime, eventStartTime) * pxPerMin + "px";
        events[index].style.top = top;
    }
}

//setEventsTop(events);


/*---------- Render Timeline ----------*/

let renderTimeline = (timeline) => {
    let streams = timeline.querySelectorAll(`.stream`);
    const fragment = document.createDocumentFragment();
    const template = document.querySelector(`#templateHour`).content.querySelector(`.schedule__hour.hour`);

    let events = timeline.querySelectorAll(`.event`);

    for (let index = 0; index < events.length; index++) {
        setHeightEvent(events[index]);
    }

    setScheduleHeight(events, streams);

    let hours = getHours(events);

    for (let index = 0; index < hours.length; index++) {
        const element = template.cloneNode(true);
        element.querySelector(`.hour__heading`).innerHTML = hours[index];
        element.style.top = getHourTop(hours[index]);
        fragment.appendChild(element);
    }

    timeline.parentElement.appendChild(fragment);

    setEventsTop(events);
}

for (let index = 0; index < timeline.length; index++) {
    renderTimeline(timeline[index]);
}


/*---------- Current Time Shift ----------*/
let moveProgram = () => {

}