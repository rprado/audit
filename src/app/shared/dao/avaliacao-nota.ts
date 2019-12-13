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

    /**
     * Retorna a lista dos itens de avaliação de um posto já contendo notas
     * @param ida: string - O id da avaliacao
     */
    getById(ida: string) {
        return this.db.collection('avaliacao_nota', ref =>
        ref.where('id_avaliacao', '==', ida).orderBy('nome')).valueChanges();
    }
}
