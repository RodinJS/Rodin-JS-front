function bytesFilter () {
    return function (bytes, currentUnit) {
        if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
        const units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'];

        const index = units.indexOf(currentUnit);
        for (let i = 0; i < index; i++) {
            bytes = bytes * 1024;
        }

        const number = Math.floor(Math.log(bytes) / Math.log(1024));
        return (bytes / Math.pow(1024, Math.floor(number))).toFixed(2) + ' ' + units[number];
    }
}

export default bytesFilter;