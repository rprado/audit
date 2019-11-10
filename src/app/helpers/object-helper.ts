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
        return <T> instance;
    }
    // ref.: https://www.stevefenton.co.uk/2014/07/creating-typescript-classes-dynamically/

    /**
     * Registra no localStorage um objeto que não pôde ser enviado ao servidor.
     * Esse objeto deverá ser recuperado e enviado ao servidor quando o sistema
     * voltar a ter acesso à rede.
     * @param key: terna da forma: sync_<tablename>_<mysql-datetime>
     * @param obj: objeto contendo os dados de sincronização
     */
    static saveToSync(key, obj) {
        // TODO: implementar saveToSync
    }

    /**
     * Retorna a lista de objetos que estão aguardando por sincronização
     */
    static loadToSync() {
        // TODO: implementar loadToSync
    }
}
