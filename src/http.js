async function getByProxy(url, headers) {
    var response = await fetch("https://cors-anywhere.herokuapp.com/" + url, {
        header: headers,
    });
    var text = await response.text();
    return text;
}
async function getByCordovaHttp(url, headers) {
    return new Promise((resolve, reject) => {
        cordova.plugin.http.get(
            url, {},
            headers,
            (r) => resolve(r.data),
            (r) => reject(r.error)
        );
    });
}

async function get(url, headers = {}) {
    if (!cordova || cordova.platformId === "browser") {
        return getByProxy(url, headers);
    } else {
        return getByCordovaHttp(url, headers);
    }
}

if (window) window._http = {get, getByProxy, getByCordovaHttp };
if (cordova) cordova._http = {get, getByProxy, getByCordovaHttp };

export default {get, getByProxy, getByCordovaHttp };