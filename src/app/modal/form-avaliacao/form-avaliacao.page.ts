import { OverlayService } from './../../services/overlay.service';
import { PhotoService } from './../../services/photo.service';
import { DateHelper } from 'src/app/helpers/date-helper';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { ModalController, NavParams, IonContent } from '@ionic/angular';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

const { Camera } = Plugins;


@Component({
    selector: 'app-form-avaliacao',
    templateUrl: './form-avaliacao.page.html',
    styleUrls: ['./form-avaliacao.page.scss'],
})
export class FormAvaliacaoPage implements OnInit {
    @ViewChild(IonContent, null) content: IonContent;
    @ViewChild('uploadBtn', null) uploadBtn: ElementRef;

    displayImage = false;
    formInvalido = false;
    recomendacao;
    observacao;
    avaliacao;
    photoName;
    novaFoto;
    idPosto;
    idItem;
    element;
    image;
    posto;
    setor;
    item;
    nota;
    data;
    base;

    constructor(
        private sanitizer: DomSanitizer,
        private overlay: OverlayService,
        private modal: ModalController,
        private navParams: NavParams,
        private photo: PhotoService,
    ) { photo.init('evidencia'); }

    ngOnInit() {
        this.element = this.navParams.get('element');
        this.avaliacao = this.navParams.get('avaliacao');
        this.idPosto = this.navParams.get('id_posto');
        this.posto = this.navParams.get('posto');
        this.idItem = this.element.id_item;

        this.recomendacao = this.element.recomendacao;
        this.observacao = this.element.observacao;
        this.data = this.element.data ? this.element.data : DateHelper.today();
        this.item = this.element.nome;
        this.nota = this.element.nota;
        this.exibeImagem();
    }

    exibeImagem() {
        if (this.element.image && this.element.image.length > 0) {
            this.image = this.element.image;
            this.base = this.element.image;
            this.displayImage = true;
        }
    }

    close() {
        const resp: any = { nota: this.nota };
        resp.recomendacao = this.recomendacao;
        resp.observacao = this.observacao;
        if (this.image && this.image.length > 0) {
            resp.image = this.image;
        }
        this.modal.dismiss(resp);
    }

    async tirarFoto() {
        const result = await Camera.getPhoto({
            resultType: CameraResultType.Uri
        });

        // if (result) {
        //     this.base = result.base64String;
        //     this.image = 'data:image/jpeg;base64,' + this.base;
        //     this.displayImage = true;
        //     this.novaFoto = true;
        //     setTimeout(() => {
        //         this.scrollToBottom();
        //     }, 300);
        // }
    }

    // https://stackoverflow.com/questions/27980612/converting-base64-to-blob-in-javascript
    // https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
    private convertBase64ToBlob(Base64Image: any) {
        const parts = Base64Image.split(';base64,');
        const imageType = parts[0].split(':')[1];
        const decodedData = window.atob(parts[1]);
        const uInt8Array = new Uint8Array(decodedData.length);
        for (let i = 0; i < decodedData.length; ++i) {
            uInt8Array[i] = decodedData.charCodeAt(i);
        }
        return new Blob([uInt8Array], { type: imageType });
    }

    scrollToBottom() {
        this.content.scrollToBottom(500);
    }

    selecionaFoto() {
        if (this.uploadBtn !== null) {
            this.uploadBtn.nativeElement.click();
        }
    }

    async uploadFile(fileList: FileList) {
        if (fileList.length) {
            const loader = await this.overlay.loading();
            this.novaFoto = true;
            this.photo.uploadFile(fileList, 'evidencia')
            .then(resp => {
                const uploadedFileUrl = resp.fileRef.getDownloadURL();
                uploadedFileUrl.subscribe(url => {
                    this.displayImage = true;
                    this.image = url;
                    this.base = url;

                    setTimeout(() => {
                        this.scrollToBottom();
                        loader.dismiss();
                    }, 1500);
                });
            });
        }
    }

}
