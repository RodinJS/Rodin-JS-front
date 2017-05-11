Object.filterByKeys = function (obj, keys) {
    let ret = {};

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (obj.hasOwnProperty(key)) {
            ret[key] = obj[key];
        }
    }

    return ret;
};

window.extractDomain = () => {
    return document.domain.split('.').reverse().splice(0, 2).reverse().join(".");
};