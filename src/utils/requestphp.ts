export const getquantile = (value: number): string => {
    let price = 0
    if (value > 1000) {
        price = value.toFixed(value.toString().split(".")[1].length).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    } else {
        price = value
    }
    return price;
};
