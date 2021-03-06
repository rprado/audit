import { AngularFirestoreCollection, AngularFirestore, QueryFn } from '@angular/fire/firestore';

export abstract class Firestore<T extends {id: string}> {

    protected collection: AngularFirestoreCollection;
    path = '';

    constructor(
        protected db: AngularFirestore
    ) {}

    protected setCollection(path: string, queryFn?: QueryFn) {
        this.collection = path ? this.db.collection(path, queryFn) : null;
        this.path = path;
    }

    getAll(id = null, status = null) {
        if (status) {
            return this.db.collection(this.path, ref => ref.where('ativo', '==', 1)).valueChanges();
        } else {
            return this.collection.valueChanges();
        }
    }

    get(id: string) {
        return this.collection.doc<T>(id).valueChanges();
    }

    private setItem(item: T, operation: string): Promise<T> {
        return this.collection.doc<T>(item.id)
        [operation](item).then(() => item);
    }

    create(item: T): Promise<T> {
        item.id = item.id ? item.id : this.db.createId();
        return this.setItem(item, 'set');
    }

    update(item: T): Promise<T> {
        return this.setItem(item, 'update');
    }

    delete(item: T): Promise<void> {
        return this.collection.doc<T>(item.id).delete();
    }

    protected getAllAsArray(col: string, queryFn?: QueryFn): Promise<any[]> {
        return new Promise(resolve => { this.db.collection(col, queryFn).valueChanges().subscribe((x: any[]) => resolve(x)); });
    }
}
