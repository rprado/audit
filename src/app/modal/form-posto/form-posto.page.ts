// import { ApiService } from 'src/app/services/api.service';
// import { DbProvider } from 'src/app/dao/db';
import { ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-form-posto',
    templateUrl: './form-posto.page.html',
    styleUrls: ['./form-posto.page.scss'],
})
export class FormPostoPage implements OnInit {
    id = 0;
    nome = '';
    cidade = '';
    contato = '';
    categorias;
    id_cliente = 0;
    form_invalido = true;

    constructor(
        private modal: ModalController,
        private navParams: NavParams
    ) {}

    ngOnInit() {
        const posto = this.navParams.get('posto');
        if (posto) {
            this.id = posto.id;
            this.nome = posto.nome;
            this.cidade = posto.cidade;
            this.contato = posto.contato;
            this.id_cliente = posto.id_cliente;
        }
    }

    validate() {
        let b = this.nome.length > 3;
        b = b && this.cidade.length > 3;
        b = b && this.contato.length > 2;
        this.form_invalido = !b;
    }

    save() {
        const resp: any = {nome : this.nome};
        resp.id = this.id;
        resp.cidade = this.cidade;
        resp.contato = this.contato;
        resp.id_cliente = this.id_cliente;
        resp.valid = !this.form_invalido;
        this.modal.dismiss(resp);
    }

    close() {
        this.modal.dismiss();
    }

}
