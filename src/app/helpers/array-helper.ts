export class ArrayHelper {

    /**
     * Gera uma cópia de v
     * @param v: um array de objetos
     * @return array: cópia por valor de v
     */
    static clone(v: any[]): any[] {
        return JSON.parse(JSON.stringify(v));
    }

}
