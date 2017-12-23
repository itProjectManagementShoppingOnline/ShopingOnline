const currency = function(val) {
    let currency = '';

    if (!val || typeof val === 'object') {
        currency = '0';
    } else if (typeof val === 'number') {
        currency = val.toFixed(2).toString();
    } else if (typeof val === 'string') {
        currency = parseFloat(val).toFixed(2).toString();
    } else {
        currency = '0';
    }

    currency = '￥' + currency.replace(/(\d)(?=(\d{3})+(\.|$))/g, '$1,')

    return currency;
}

export default {
    currency,
};
