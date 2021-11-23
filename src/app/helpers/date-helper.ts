export class DateHelper {


    /**
     * Retorna a data atual no formato dd/mm/aaaa
     */
    static hoje(shortYear?) {
        const dataArray = new Date().toISOString().slice(0, 10).split('-').reverse();
        if (shortYear) {
            dataArray.push(dataArray.pop().substr(2));
        }
        return dataArray.join('/');
    }

    static today() {
        const d = new Date();
        return d.toISOString().substr(0, 10);
    }

    static hora() {
        const d = new Date();
        return d.toLocaleTimeString();
    }

    static now() {
        return this.today() + ' ' + this.hora();
    }

    /**
     * Converte a data d para o formato aaaa-mm-dd
     * @param d: string data em dd/mm/aa
     */
    static dataToDate(d, short) {
        const prefix = short === 1 ? '20' : '';
        return prefix + d.split('/').reverse().join('-');
    }

    /**
     * Converte a data d para o formato dd/mm/aaaa
     * @param d: string data em yyyy-mm-dd
     */
    static dateToData(d) {
        return d.split('-').reverse().join('/');
    }

    /**
     * Converte a data d para o formato dd/mm/aa
     * @param d: data em yyyy-mm-dd hh:mm:ss
     */
    static shortYearDate(d) {
        const h = d.substring(0, 10).split('-');
        return h[2] + '/' + h[1] + '/' + h[0].substr(2);
    }
}
