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
    fileName: string;
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

    async uploadFile(fileList: FileList, folder: string) {
        this.loader = await this.overlay.loading();
        const file = fileList.item(0);
        this.fileName = new Date().getTime() + '_' + file.name;

        // The storage path
        const path = `${folder}/${this.fileName}`;

        // Totally optional metadata
        const customMetadata = { app: 'Audit Image Upload' };

        // The main task
        this.task = this.storage.upload(path, file, { customMetadata });

        // Get file progress percentage
        this.percentage = this.task.percentageChanges();
        this.percentage.subscribe(x => {
            if (x === 100) {
                const fileRef = this.storage.ref(path);
                this.saveStorageFileURL(fileRef, this.fileName);
            }
        });
        return this.fileName;
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
