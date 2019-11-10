import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Firestore } from './firestore';

@Injectable({
    providedIn: 'root'
})
export class Menu extends Firestore<any> {

    constructor(
        db: AngularFirestore
    ) {
        super(db);
    }

    async menuList() {
        const menu = this.db.collection('menu', res => res).valueChanges({idField: 'id'});
        return new Promise(resolve => {
            menu.subscribe(lista => {
                const menuItem = this.db.collection('menu_item', res => res).valueChanges();
                menuItem.subscribe(itens => {
                    const v = itens.map( (item: any) => {
                        lista.forEach((el: any) => {
                            if (el.id === item.menu_id) {
                                item.categoria = el.categoria;
                                item.ordem = el.ordem;
                            }
                        });
                        return item;
                    });

                    v.sort((a, b) => {
                        return a.ordem - b.ordem || a.menu_order - b.menu_order ;
                    });
                    resolve(v);
                });
            });
        });
    }

}
