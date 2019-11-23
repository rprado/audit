import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Firestore } from './firestore';

@Injectable({
    providedIn: 'root'
})
export class AvaliacaoNota extends Firestore<any> {

    constructor(
        db: AngularFirestore
    ) {
        super(db);
        this.setCollection('avaliacao_nota');
    }

}
