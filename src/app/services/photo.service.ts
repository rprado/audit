import { OverlayService } from 'src/app/services/overlay.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

export interface MyData {
    name: string;
    filepath: string;
    size: number;
}

export interface FileData {
    fileName: string;
    fileRef: any;
}

@Injectable({
    providedIn: 'root'
})
export class PhotoService {

    // Upload Task
    task: AngularFireUploadTask;

    // Progress in percentage
    percentage: Observable<number>;

    // Uploaded File URL
    UploadedFileURL: Observable<string>;

    // Uploaded Image List
    images: Observable<MyData[]>;

    // File details
    fileSize = 0;
    loader;

    private imageCollection: AngularFirestoreCollection<MyData>;

    constructor(
        private storage: AngularFireStorage,
        private database: AngularFirestore,
        private overlay: OverlayService
    ) { }

    init(collectionName: string) {
        this.imageCollection = this.database.collection<MyData>(collectionName);
    }

    uploadedImages() {
        return this.imageCollection.valueChanges();
    }

     uploadFile(fileList: FileList, folder: string): Promise<FileData> {
        const file = fileList.item(0);
        const fileName = new Date().getTime() + '_' + file.name;

        const path = `${folder}/${fileName}`;
        this.task = this.storage.upload(path, file);
        this.percentage = this.task.percentageChanges();

        return new Promise(resolve => {
            this.percentage.subscribe(x => {
                if (x === 100) {
                    const fileRef = this.storage.ref(path);
                    resolve({fileName, fileRef});
                }
            });
        });
    }

    private saveStorageFileURL(fileRef, file: string) {
        this.UploadedFileURL = fileRef.getDownloadURL();
        this.UploadedFileURL.subscribe(resp => {
            this.addImagetoDB({
                name: file,
                filepath: resp,
                size: this.fileSize
            });
        }, error => {
            console.error(error);
        });
    }

    addImagetoDB(image: MyData) {
        const id = this.database.createId();
        this.imageCollection.doc(id).set(image).then(resp => {
            this.loader.dismiss();
            this.overlay.toast({ message: 'Imagem enviada com sucesso' });
        }).catch(error => {
            console.log('error ' + error);
        });
    }


}
