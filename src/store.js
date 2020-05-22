if (!ko) throw new ReferenceError("KnockoutJS not loaded");

var answer = tryLoad("answer") || 42;

function DataStore() {
    const self = this;

    this.state = {};

    this.state.variable1 = observableWithSaving(
        "variable1",
        42,
        "number",
        parseFloat
    );

    /* Just a demonstration. Not used anywhere. */
    this.state.answers = observableArray([this.state.variable1], null, (arr) =>
        console.log("Answers Array: " + JSON.stringify(arr))
    );
}

/** UTILITY FUNCTIONS */

function observableWithSaving(name, defaultVal, type, parser) {
    var observableVal = observable(defaultVal, () => tryLoad(name, parser));
    observableVal.subscribe((val) => {
        if (typeof val !== type) observableVal(parser(val));
        else save(val, name);
    });
    return observableVal;
}

function observableWithParsing(defaultVal, type, parser) {
    var observableVal = observable(defaultVal);
    observableVal.subscribe((val) => {
        if (typeof val !== type) observableVal(parser(val));
    });
    return observableVal;
}

function observable(
    defaultVal,
    valLoader = () => undefined,
    onChange = (newValue) => {}
) {
    var val = valLoader ? valLoader() || defaultVal : defaultVal;
    var observableVal = ko.observable(val);
    if (onChange) observableVal.subscribe(onChange);
    return observableVal;
}

function observableArray(
    defaultArray,
    arrayLoader = () => undefined,
    onChange = (newValue) => {}
) {
    var val = arrayLoader ? arrayLoader() || defaultArray : defaultArray;
    var observableArray = ko.observableArray(val);
    observableArray.subscribe(onChange);
    return observableArray;
}

function tryLoad(nameInStorage, parser = JSON.parse) {
    var loaded = localStorage.getItem(nameInStorage);
    try {
        loaded = parser(loaded);
    } catch (error) {
        loaded = undefined;
    }
    return loaded;
}

function save(val, nameInStorage) {
    localStorage.setItem(nameInStorage, val);
}

const store = new DataStore();

window.store = store;
export default store;