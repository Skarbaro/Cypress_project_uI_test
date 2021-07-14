module.exports = {
    randomString: (mode, length) => {
        let text = '';
        let possible;
        switch (mode) {
            case 'alpha':
                possible = 'abcdefghijklmnopqrstuvwxyz';
                break;
            case 'numeric':
                possible = '0123456789';
                break;
            case 'alphanumeric':
                possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
                break;
            default:
        }

        for (let i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    },

    totalPay: (price_dev, numberDev) => {
        let month = 12;
        let total = '';
        total = (price_dev * numberDev) * month;

        return total;
    }
};