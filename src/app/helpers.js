Object.filterByKeys = function(obj, keys) {
    let ret = {};

    for(let i = 0; i < keys.length; i ++)  {
        const key = keys[i];
        if(obj[key]) {
            ret[key] = obj[key];
        }
    }

    return ret;
};

Array.prototype.last = function () {
    return this[this.length - 1];
};

window.extractDomain = () => {
    const url = window.location.href;
    var domain;
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }

    domain = domain.split(':')[0];
    return domain;
};