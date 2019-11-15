import { ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ListaElementoAvaliacaoComponent } from 'src/app/shared/component/lista-elemento-avaliacao/lista-elemento-avaliacao.component';

@Component({
    selector: 'app-form-email-cliente',
    templateUrl: './form-email-cliente.page.html',
    styleUrls: ['./form-email-cliente.page.scss'],
})
export class FormEmailClientePage implements OnInit {
    @ViewChild(ListaElementoAvaliacaoComponent, null) lista: ListaElementoAvaliacaoComponent;
    form_invalido = false;
    id_posto;

    constructor(
        private modal: ModalController,
        private navParams: NavParams
    ) { }

    ngOnInit() {
        this.id_posto = this.navParams.get('id_posto');
    }

    close() {
        this.modal.dismiss({});
    }

    novoEmail() {
        this.lista.criar(this.id_posto);
    }

}
