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

                const c = cliente.find(x => x.id === p.id_cliente);
                p.cliente = c.nome;
                data.push(ObjectHelper.copy(p));
            }
        });
        return data;
    }

}
