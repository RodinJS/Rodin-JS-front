function objLimitTo(){
    return (obj, limit) => {
        const keys = Object.keys(obj);
        if(keys.length < 1){
            return [];
        }

        let ret = new Object;
        let count = 0;
        angular.forEach(keys, function(key, arrayIndex){
            if(count >= limit){
                return false;
            }
            ret[key] = obj[key];
            count++;
        });
        return ret;
    };
}

export default objLimitTo;
