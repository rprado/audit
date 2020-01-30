import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Firestore } from './firestore';
import { map } from 'rxjs/operators';

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
        return this.db.collection('posto', ref => {
            const aux = ref.where('id_cliente', '==', id);
            return aux.orderBy('nome', 'asc');
        }).valueChanges();
    }

    createItem(item, idPosto) {
        this.db.collection('posto/' + idPosto + '/itens').doc(item.id).set(item);
    }

    deleteItem(item, idPosto) {
        this.db.collection('posto/' + idPosto + '/itens').doc(item.id).delete();
    }

    itemList(idPosto) {
        const itemObs = this.db.collection('item', ref => ref.orderBy('nome')).valueChanges({idField: 'id'});
        return new Promise(resolve => {
            itemObs.subscribe(itemList => {
                const itemPostoObs = this.db.collection('posto/' + idPosto + '/itens').valueChanges();
                itemPostoObs.subscribe(itemPostoList => {
                    const v = itemList.map((item: any) => {
                        itemPostoList.forEach((itemPosto: any) => {
                            if (item.id === itemPosto.id) {
                                item.isChecked = true;
                            }
                        });
                        return item;
                    });
                    resolve(v);
                });
            });
        });
    }

    getItens(idPosto) {
        return this.db.collection('posto/' + idPosto + '/itens').valueChanges();
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
                    v.sort(this.compare);
                    resolve(this.groupByClient(v));
                });
            });
        });
    }

    private compare(a, b) {
        const nomeA = a.cli.toUpperCase();
        const nomeB = b.cli.toUpperCase();

        let comparison = 0;
        if (nomeA > nomeB) {
            comparison = 1;
        } else if (nomeA < nomeB) {
            comparison = -1;
        }
        return comparison;
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
