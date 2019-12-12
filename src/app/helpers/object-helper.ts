export class ObjectHelper {

    /**
     * Verifica se um objeto é valido
     * @param obj: any
     */
    static isValidObject(obj: any) {
        return obj != null && (typeof obj === 'object');
    }

    /**
     * Salva um objeto no localStorage
     * @param name: o nome para gravar o objeto
     * @param obj: objeto no formato json
     */
    static memorize(name: string, obj) {
        localStorage.setItem(name, JSON.stringify(obj));
    }

    /**
     * Recupera um objeto do localStorage
     * @param name: o nome para recuperar o objeto
     */
    static remember(name) {
        const obj = localStorage.getItem(name);
        return JSON.parse(obj);
    }

    /**
     * Gera, dinamicamente, e retorna um objeto da classe name
     * passando os argumentos args no seu construtor.
     * @param name: o nome da classe a ser instanciada
     * @param args: sua lista de argumentos
     */
    static getInstance<T>(name: string, ...args: any[]): T {
        const instance = Object.create(window[name].prototype);
        instance.constructor.apply(instance, args);
        return <T>instance;
    }
    // ref.: https://www.stevefenton.co.uk/2014/07/creating-typescript-classes-dynamically/

    /**
     * Note: Be careful about using this method as your source object must be JSON safe.
     * So it may need some sort of exception handling to keep it safe in cases in which
     * the source object is not convertible to JSON.
     * @param obj: javascript object
     */
    static copy(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
}
