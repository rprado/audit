import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Firestore } from './firestore';

@Injectable({
    providedIn: 'root'
})
export class Cliente extends Firestore<any> {

    constructor(
        db: AngularFirestore
    ) {
        super(db);
        this.setCollection('cliente', ref => ref.orderBy('nome', 'asc'));
    }

}
