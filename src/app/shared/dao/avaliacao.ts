import { ObjectHelper } from 'src/app/helpers/object-helper';
import { AngularFirestore, Query } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Firestore } from './firestore';

@Injectable({
    providedIn: 'root'
})
export class Avaliacao extends Firestore<any> {

    constructor(
        db: AngularFirestore
    ) {
        super(db);
        this.setCollection('avaliacao');
    }

    async lista(idCliente = null) {
        const data = [];
        const posto = await this.getAllAsArray('posto', ref => {
            let query: Query = ref;

            if (idCliente) {
                query = query.where('id_cliente', '==', idCliente);
            }

            return query;
        });

        const cliente = await this.getAllAsArray('cliente');
        const aval = await this.getAllAsArray('avaliacao', ref => ref.orderBy('data', 'desc'));

        aval.forEach(av => {
            const p = posto.find(x => x.id === av.id_posto);
            if ( p ) {
                p.id_avaliacao = av.id;
                p.data = av.data;
                p.sent = av.sent;

                const c = cliente.find(x => x.id === p.id_cliente);
                if ( c ) {
                    p.cliente = c.nome;
                    data.push(ObjectHelper.copy(p));
                }
            }
        });
        console.log(data);
        return data;
    }

    erase() {
        return this.db.collection('avaliacao', ref =>
        ref.where('data', '<', '2020-02-19')).valueChanges();
    }
}
