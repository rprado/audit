import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Firestore } from './firestore';

@Injectable({
    providedIn: 'root'
})
export class ItemPosto extends Firestore<any> {

    constructor(
        db: AngularFirestore
    ) {
        super(db);
        this.setCollection('item_posto');
    }

    itemList(idPosto) {
        const itemObs = this.db.collection('item', ref => ref.orderBy('nome')).valueChanges({idField: 'id'});
        return new Promise(resolve => {
            itemObs.subscribe(itemList => {
                const itemPostoObs = this.db.collection('item_posto', ref => ref.where('id_posto', '==', idPosto)).valueChanges();
                itemPostoObs.subscribe(itemPostoList => {
                    const v = itemList.map((item: any) => {
                        itemPostoList.forEach((itemPosto: any) => {
                            if (item.id === itemPosto.id_item) {
                                item.isChecked = true;
                                item.id = itemPosto.id;
                            }
                        });
                        return item;
                    });
                    resolve(v);
                });
            });
        });
    }

    /**
     * Retorna a lista dos itens de avaliação de um posto
     * @param id: string - O id do posto
     */
    getById(id: string) {
        return this.db.collection('item_posto', ref => ref.where('id_posto', '==', id)).valueChanges();
    }
}
