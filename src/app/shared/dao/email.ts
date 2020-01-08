import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Firestore } from './firestore';

@Injectable({
    providedIn: 'root'
})
export class Email extends Firestore<any> {

    constructor(
        db: AngularFirestore
    ) {
        super(db);
        this.setCollection('email', ref => ref.orderBy('nome', 'asc'));
    }

    getAll(idPosto = null) {
        return this.db.collection('email',
        ref => ref.orderBy('nome', 'asc').
        where('id_posto', '==', idPosto)).
        valueChanges();
    }

}
