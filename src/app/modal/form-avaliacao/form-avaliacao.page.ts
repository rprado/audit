import { DateHelper } from 'src/app/helpers/date-helper';
// import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { ModalController, NavParams, IonContent } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// import { ApiService } from 'src/app/services/api.service';

// const { Camera } = Plugins;


@Component({
    selector: 'app-form-avaliacao',
    templateUrl: './form-avaliacao.page.html',
    styleUrls: ['./form-avaliacao.page.scss'],
})
export class FormAvaliacaoPage implements OnInit {
    @ViewChild(IonContent, null) content: IonContent;
    display_image = false;
    form_invalido = false;
    recomendacao;
    observacao;
    avaliacao;
    nova_foto;
    id_posto;
    id_item;
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
        private modal: ModalController,
        private navParams: NavParams,
        // private api: ApiService
    ) { }

    ngOnInit() {
        this.element = this.navParams.get('element');
        this.avaliacao = this.navParams.get('avaliacao');
        this.id_posto = this.navParams.get('id_posto');
        this.posto = this.navParams.get('posto');
        this.id_item = this.element.id_item;

        this.recomendacao = this.element.recomendacao;
        this.observacao = this.element.observacao;
        this.data = this.element.data ? this.element.data : DateHelper.today();
        this.item = this.element.nome;
        this.nota = this.element.nota;
        this.exibeImagem();
    }

    exibeImagem() {
        if (this.avaliacao) {
            this.display_image = true;
            let arq = this.id_posto + '_';
            arq += this.avaliacao + '_';
            arq += this.id_item;
            // const image_path = this.api.base_url(`assets/img/grades/${arq}.jpg`);
            // this.image = this.sanitizer.bypassSecurityTrustUrl(image_path);
        }
    }

    close() {
        const resp: any = { nota: this.nota };
        resp.recomendacao = this.recomendacao;
        resp.observacao = this.observacao;
        if (this.nova_foto) {
            resp.image = this.base;
        }
        this.modal.dismiss(resp);
    }

    async tirarFoto() {
        // const result = await Camera.getPhoto({
        //     quality: 80,
        //     correctOrientation: true,
        //     source: CameraSource.Camera,
        //     resultType: CameraResultType.Base64
        // });

        // if (result) {
        //     this.base = result.base64String;
        //     this.image = 'data:image/jpeg;base64,' + this.base;
        //     this.display_image = true;
        //     this.nova_foto = true;
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

}
