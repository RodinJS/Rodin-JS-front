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