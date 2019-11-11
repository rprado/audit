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

}
