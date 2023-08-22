/**
 * @name Datetime
 * @author SquEdgy
 * @description Supports quickly making Discord powered timestamps. Allowing for multi-timezone dates/times to be utilized easily
 * @version 0.0.1
 */

/**
 * Known discord formats
 * "" - Month DayOfMonth, Year Hour:Minute (A/P)M || DayOfMonth Month Year 24-Hour:Minute
 * "t" - Hour:Minute (A/P)M || 24-Hour:Minute
 * "T" - Hour:Minute:Second (A/P)M || 24-Hour:Minute:Second
 * "d" - MonthNumber/DayOfMonth/Year || DayOfMonth/Month/Year
 * "D" - Month DayOfMonth, Year || DayOfMonth Month Year
 * "f" - Month DayOfMonth, Year Hour:Minute (A/P)M || DayOfMonth Month Year 24-Hour:Minute
 * "F" - DayOfWeek, Month DayOfMonth, Year Hour:Minute (A/P)< || DayOfWeek, DayOfMonth Month Year, 24-Hour:Minute
 * "R" - Relative description something like "3 years ago" or "24 minute ago", etc.
 * 
 * the utilized format is related to your discord's language setting
 * https://gist.github.com/LeviSnoot/d9147767abeef2f770e9ddcd91eb85aa
 */

/**
 * @type {{}} BdApi
 */

function defaultSettings(settings = {}) {
    if(typeof settings.formatSelected === "string") {
        settings.formatSelected = ["o"];
    }
    
    const {formatSelected = ["o"]} = settings;
    return {formatSelected};
}

function saveSettings() {
    BdApi.Data.save("Datetime", "settings", settings);
}

const settings = defaultSettings(BdApi.Data.load("Datetime", "settings"));

/** */
function getSelectedText() {
    const selection = document.getSelection();
    if(!selection) return "";
    return selection.toString();
}

/** @param {RegExp | string} exp */
function source(exp) {
    if(!exp) return "";
    if(typeof exp === "string") return exp;

    return exp.source;
}

const regExps = {
    year: /[1-9][0-9]*/,
    month: /(1[0-2]|0?[1-9])/,
    date: /([012]?[0-9]|3[01])/,
    minutesOrSeconds: /[0-5]?[0-9]/, // I am IGNORING the existance of leap seconds
    hours: /(1[012]|0?[0-9])/,
    twentyFourHours: /([01]?[0-9]|2[0-3])/, // Technically it allows 24:00, but no. That would be annoying an overly complex
    eitherSeparator: /[-\/]/,
    weekDay: /((mon|tues|wednes|thurs|fri|satur|sun)day)/i,
    monthWord: /(January|February|March|April|May|June|July|August|September|October|November|December)/i,
    ampm: /( [ap]m)?/i,

    /** @param {(RegExp | string)[]} exps */
    join: (...exps) => new RegExp(exps.map(source).join(""), "i"),
}

/** @param {RegExpMatchArray} args */
function matchToTime(match) {
    let [hours, minutes, seconds] = match[0].split(":");

    let time = `${hours}:${minutes}`;
    if(seconds !== undefined) time += `:${seconds}`;

    const current = new Date();
    const [date] = current.toISOString().split("T");
    
    return new Date(`${date} ${time}`);
}

/** @param {RegExpMatchArray} args */
function matchToDate(match) {
    return new Date(match[0]);
}

/**
 * This should be in the order of most to least complex
 * @type {[RegExp | RegExp[], (result: RegExpExecArray) => Date, string][]} */
const acceptedDateFormatsAndTransformations = [
    // not supporting "R" I don't have good way to parse that format and I'm not sure how I'd want to integrate it :shruggers:
    [
        [
            regExps.join(
                regExps.weekDay, ", ", regExps.monthWord, " ", regExps.date, ",? ", regExps.year, " ", regExps.hours, ":", regExps.minutesOrSeconds, regExps.ampm
            ),
            regExps.join(
                regExps.weekDay, ", ", regExps.date, " ", regExps.monthWord, " ", regExps.year, " ", regExps.hours, ":", regExps.minutesOrSeconds, regExps.ampm
            ),
        ],
        matchToDate,
        ":F"
    ],
    [
        [
            regExps.join(
                regExps.monthWord, " ", regExps.date, ",? ", regExps.year, " ", regExps.hours, ":", regExps.minutesOrSeconds, regExps.ampm
            ),
            regExps.join(
                regExps.date, " ", regExps.monthWord, " ", regExps.year, " ", regExps.hours, ":", regExps.minutesOrSeconds, regExps.ampm
            ),
        ],
        matchToDate,
        ":f"
    ],
    [
    [
        [
            regExps.join(
                regExps.monthWord, " ", regExps.date, ",? ", regExps.year, " ", regExps.hours, ":", regExps.minutesOrSeconds, regExps.ampm
            ),
            regExps.join(
                regExps.date, " ", regExps.monthWord, " ", regExps.year, " ", regExps.hours, ":", regExps.minutesOrSeconds, regExps.ampm
            ),
        ],
        matchToDate,
        ":f"
    ],
        [
            regExps.join(regExps.monthWord, " ", regExps.date, ",? ", regExps.year),
            regExps.join(regExps.date, " ", regExps.monthWord, " ", regExps.year),
        ],
        matchToDate,
        ":D"
    ],
    [
        [
            regExps.join(regExps.month, regExps.eitherSeparator, regExps.date, regExps.eitherSeparator, regExps.year),
            regExps.join(regExps.date, regExps.eitherSeparator, regExps.month, regExps.eitherSeparator, regExps.year),
        ],
        matchToDate,
        ":d"
    ],
    [
        regExps.join(regExps.hours, ":", regExps.minutesOrSeconds, ":", regExps.seconds, regExps.ampm),
        matchToTime,
        ":T"
    ],
    [
        regExps.join(regExps.hours, ":", regExps.minutesOrSeconds, regExps.ampm),
        matchToTime,
        ":t"
    ],
];

/** @returns {[string, Date, string]} */
function getDateFromSelection() {
    const selection = getSelectedText()?.trim();
    console.log({selection});
    const [exec, func, format] = acceptedDateFormatsAndTransformations.reduce((result, [regexp, func, format]) => {
        if(result[0]) return result;

        if(Array.isArray(regexp)) {
            return regexp.reduce((result, expression) => {
                if(result) return result;

                const ret = [new RegExp(expression).exec(selection), func, format];
                console.log(ret);
                return ret;
            }, null);
        }
        
        const ret = [new RegExp(regexp).exec(selection), func, format];
        console.log(ret);
        return ret;
    }, [null, null, null]);
    
    if(!exec) {
        console.log("no match");
        return [null, null, null];
    }

    const date = func(exec);
    console.log({date});
    if(date.toString().toLowerCase().includes("invalid")) {
        return [null, null, null];
    }

    return [selection, date, format];
}

/** @param {HTMLElement} element */
function findTextbox(element) {
    console.log("Starting textbox search from", element);
    let ele = element;
    let prev = null;
    while(ele !== null && ele !== undefined || prev === ele) {
        if(ele.role === "textbox") {
            console.log("found textbox", ele);
            return ele;
        }

        prev = ele;
        ele = ele.parentElement;
    }
}

let reactKey = null;

/**
 * @param {string} text
 * @param {Date} to
 * @param {string} format
*/
function transformSelection(text, to, format) {
    const selection = getSelection();
    /** @type {HTMLElement} */
    let node = selection.anchorNode;
    if(!node || !text || !to) return;

    let element = node;
    if(!(element instanceof HTMLElement)) element = element.parentElement;
    if(!reactKey) {
        const textbox = findTextbox(node.parentElement);
        Object.keys(textbox).forEach(key => {
            if(key.startsWith("__reactFiber$")) {
                if(reactKey) console.log("Overwriting ", reactKey, "with", key);
                reactKey = key;
            }
        });
    }

    while(node && (!(node instanceof HTMLElement) || node.tagName !== "FORM")) {
        node = node.parentElement;
    }

    const seenFibers = new Set();
    const states = new Map();
    let toCheck = new Set([node]);

    while(node.parentElement) {
        toCheck.add(node.parentElement);
        node = node.parentElement;
    }
    {
        let current = [node];
        while(current.some(node => node.children.length > 0)) {
            current = current.flatMap(item => {
                const ret = [];
                for(let i = 0 ; i < item.children.length; i++) {
                    const element = item.children.item(i);
                    ret.push(element);
                    toCheck.add(element);
                }

                return ret;
            })
        }
    }
    toCheck = [...toCheck].map(element => element[reactKey]);
    

    let checked = 0;
    let editor;
    while(toCheck.length > 0) {
        const internal = toCheck.shift();
        if(!internal || seenFibers.has(internal)) continue;
        checked += 1;
        seenFibers.add(internal);

        if(internal.memoizedState) {
            let state = internal.memoizedState;
            while(state) {
                const curVal = state.memoizedState;
                if(typeof curVal === "string" && curVal.includes(text)) {
                    states.set(state, internal);
                } else if(!editor && typeof curVal === "object" && curVal && "insertText" in curVal) {
                    editor = curVal;
                }
                state = state.next;
            }
        }

        toCheck.push(
            internal.alternate,
            internal.return,
        );
    }

    console.log(`checked ${checked} fibers and found ${states.size} potential states`);
    console.log(editor);
    
    const fullSelection = getSelectedText();
    const [before, ...rest] = fullSelection.split(text, 1);
    const replacement = `<t:${Math.floor(to.getTime() / 1000)}${format}>`;

    if(editor) {
        editor.insertText(`${before}${replacement}${rest.join("")}`);
    } else {
        console.log("No editor, trying to do dispatch stuff. Probably won't work :(");

        for(const [state, fiber] of states) {
            console.log("dispatching", fiber, state);
    
            BdApi.ReactDOM.flushSync(() => {
                if(fiber.pendingProps.text === state.memoizedState) {
                    const [before, ...rest] = state.memoizedState.split(text, 1);
                    fiber.pendingProps.text = `${before}${replacement}${rest.join("")}`;
                }
    
                state.queue.dispatch(prev => {
                    const [before, ...rest] = prev.split(text, 1);
    
                    return `${before}${replacement}${rest.join("")}`;
                });
            });
        }
    }
    
}


/** @param {KeyboardEvent} event */
function onKeydown(event) {
    if(!event.ctrlKey) return;

    if(settings.formatSelected.includes(event.key.toLowerCase())) {
        console.log("gathering stuff");
        try {
            const [selection, date, format] = getDateFromSelection();
            console.log({selection, date, format});
            transformSelection(selection, date, format);
        } catch(E) {
            console.log(E);
        }
    }
}

/**
 * @param {HTMLElement} element
 * @this {{elems: Set<Element>}} */
function listenTo(element) {
    if(listenTo.elems.has(element)) return;

    element.addEventListener("keydown", onKeydown);
    listenTo.elems.add(element);
}
listenTo.elems = new Set();

/** @param {HTMLElement} element */
function stopListeningTo(element) {
    if(listenTo.elems.delete(element)) {
        element.removeEventListener("keydown", onKeydown);
    }
}

const start = () => {
    console.log("listening to document!");
    document.addEventListener("keydown", onKeydown);
};

const stop = () => {
    console.log("stopped listening to document!")
    document.removeEventListener("keydown", onKeydown);

    listenTo.elems.forEach(stopListeningTo);
};

/**
 * 
 * @param {string} labelText 
 * @param {HTMLInputElement["type"]} type 
 * @param {string} value 
 * @param {keyof typeof settings} setting 
 * @param {(a: string) => any} map 
 * @returns 
 */
function setting(labelText, type, value, setting, map = a => a) {
    const wrapper = document.createElement("div");
    const label = document.createElement("span");
    const input = document.createElement("input");
    
    label.textContent = labelText;

    input.type = type;
    input.value = value;
    input.addEventListener("change", () => {
        settings[setting] = map(input.value);
        saveSettings();
    });
    

    wrapper.append(label, input);

    return wrapper;
}

const getSettingsPanel = () => {
    const div = document.createElement("div");
    div.id = "squedgy-datetime-settings";
    
    div.append(
        setting("Bind Characters", "text", settings.formatSelected.join(""), "formatSelected", a => a.split()),
    );

    return div;
};

module.exports = () => ({start, stop, getSettingsPanel});