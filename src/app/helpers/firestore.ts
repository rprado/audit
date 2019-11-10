import { AngularFirestoreCollection, AngularFirestore, QueryFn } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export abstract class Firestore<T extends {id: string}> {

    protected collection: AngularFirestoreCollection;

    constructor(
        protected db: AngularFirestore
    ) {}

    protected setCollection(path: string, queryFn?: QueryFn) {
        this.collection = path ? this.db.collection(path) : null;
    }

    getAll() {
        return this.collection.valueChanges();
    }

    get(id: string) {
        return this.collection.doc<T>(id).valueChanges();
    }

    private setItem(item: T, operation: string): Promise<T> {
        return this.collection.doc<T>(item.id)
        [operation](item).then(() => item);
    }

    create(item: T): Promise<T> {
        item.id = this.db.createId();
        return this.setItem(item, 'set');
    }

    update(item: T): Promise<T> {
        return this.setItem(item, 'update');
    }

    delete(item: T): Promise<void> {
        return this.collection.doc<T>(item.id).delete();
    }

}
