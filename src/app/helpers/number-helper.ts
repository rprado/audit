export class NumberHelper {

    static isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    static randInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    static bigInt(digits = 17) {
        const first = Math.floor(Math.random() * 10) + 1;
        return first + Math.random().toString().substr(2, digits - 1);
    }

    /**
     * Arredonda num, para cima, na enésima casa decimal.
     * @param num: number o número a ser arredondado
     * @param n: number - a quantidade de casas decimais
     */
    static round(num, n) {
        return !isNaN(+num) ? (+num).toFixed(n || 2) : num;
    }

}
