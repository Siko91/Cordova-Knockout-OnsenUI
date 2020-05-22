import mainPage from "./rootPage.js";

var counter = 0;

function initialize() {
    window.document.body.onload = onLoad;
}

function onLoad() {
    window.document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
    cordova.plugins.backgroundMode.enable();
    setInterval(() => sentTestNotification(counter++), 10000);
    ko.applyBindings();

    ons.disableDeviceBackButtonHandler();
    window.document.addEventListener("backbutton", onBackBtn, false);
}

function sentTestNotification(i) {
    if (cordova.plugins.notification)
        cordova.plugins.notification.local.schedule({
            id: Math.random(),
            title: "Count - " + i,
            text: "<description>",
            foreground: true,
        });
    else console.log("Local Notifications not available");
}

function onBackBtn(e) {
    e.preventDefault();
    e.stopPropagation();

    const state = window.location.hash;
    window.history.go(-1);

    setTimeout(() => {
        const newState = window.location.hash;

        if (state === newState) {
            var result = confirm("Do you want to exit?");
            if (result) {
                cordova.plugins.backgroundMode.moveToBackground();
            }
        }
    }, 300);
}

export default { initialize, onBackBtn };