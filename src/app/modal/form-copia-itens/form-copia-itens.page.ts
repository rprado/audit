import { ModalController } from '@ionic/angular';
import { Component } from '@angular/core';

@Component({
    selector: 'app-form-copia-itens',
    templateUrl: './form-copia-itens.page.html',
    styleUrls: ['./form-copia-itens.page.scss'],
})
export class FormCopiaItensPage {
    private idPosto = 0;
    disableCopy = true;

    constructor(
        private modal: ModalController
    ) { }

    selecionaPosto(event) {
        this.disableCopy = false;
        this.idPosto = event.idPosto;
    }

    close() {
        const resp = { idPosto: this.idPosto };
        this.modal.dismiss(resp);
    }

    cancel() {
        const resp = { idPosto: 0 };
        this.modal.dismiss(resp);
    }
}
