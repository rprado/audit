import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firestore } from './firestore';

@Injectable({
    providedIn: 'root'
})
export class DataTransfer extends Firestore<any> {
    private tables;

    constructor(
        protected db: AngularFirestore,
        private http: HttpClient
    ) {
        super(db);
        this.tables = ['avaliacao_nota', 'cliente', 'email', 'item', 'item_posto', 'menu', 'posto'];
    }

    // para usar alguma informação como argumento no getAll
    // é necessário sobrescrever o método na classe de interesse
    download(collection: string) {
        this.setCollection(collection);
        this.getAll().subscribe(data => {
            const s =  JSON.stringify(data);
            console.log(collection + ' - ' + s);
        });
    }

    getData(table: string) {
        const dataUrl = 'assets/transfer/' + table + '.json';
        return this.http.get(dataUrl);
    }

    down() {
        this.tables.forEach(table => {
            this.download(table);
        });
    }

    private upload(data: object) {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const element = data[key];
                console.log(element);
                this.create(element);
            }
        }
        console.log('done!');
    }

    up() {
        this.tables.forEach(table => {
            this.setCollection(table);
            this.getData(table).subscribe(data => {
                this.upload(data);
            });
        });
    }
}
