import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Firestore } from './firestore';

@Injectable({
    providedIn: 'root'
})
export class Posto extends Firestore<any> {

    constructor(
        db: AngularFirestore
    ) {
        super(db);
        this.setCollection('posto', ref => ref.orderBy('nome', 'asc'));
    }

    getByClientId(id: string) {
        this.setCollection('posto', ref => {
            const aux = ref.where('id_cliente', '==', id);
            aux.orderBy('nome', 'asc');
            return aux;
        });
        return this.getAll();
    }

    listWithClient() {
        const postos = this.db.collection('posto', ref => ref.orderBy('nome', 'asc')).valueChanges();

        return new Promise(resolve => {
            postos.subscribe(pst => {
                const clientes = this.db.collection('cliente').valueChanges();
                clientes.subscribe(cli => {
                    const v = pst.map((item: any) => {
                        cli.forEach((elem: any) => {
                            if (item.id_cliente === elem.id) {
                                item.cli = elem.nome;
                            }
                        });
                        return item;
                    });
                    resolve(this.groupByClient(v));
                });
            });
        });
    }

    private groupByClient(v) {
        let nome;
        let lista = [];
        const postos = [];

        v.forEach(item => {
            if (item.cli !== nome) {
                nome = item.cli;

                const cli = {
                    nome,
                    postos: []
                };

                lista = cli.postos;
                postos.push(cli);
            }

            lista.push(item);
        });
        return postos;
    }

}
