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
        db: AngularFirestore,
        private http: HttpClient
    ) {
        super(db);
        this.tables = ['menu', 'posto'];
    }

    download(collection: string) {
        this.setCollection(collection);
        this.getAll(true).subscribe(data => {
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
        this.setCollection('avaliacao');
        this.getData('avaliacao').subscribe(data => {
            this.upload(data);
        });
    }
}
