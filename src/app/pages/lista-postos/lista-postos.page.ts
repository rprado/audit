import { ModalController } from '@ionic/angular';
import { Cliente } from './../../shared/dao/cliente';
import { Posto } from './../../shared/dao/posto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateHelper } from 'src/app/helpers/date-helper';
import { FormPostoPage } from 'src/app/modal/form-posto/form-posto.page';

@Component({
    selector: 'app-lista-postos',
    templateUrl: './lista-postos.page.html',
    styleUrls: ['./lista-postos.page.scss'],
})
export class ListaPostosPage implements OnInit {
    lista;
    inativos;
    clienteId;
    data: string;
    nomeEmpresa: string;

    constructor(
        private posto: Posto,
        private cliente: Cliente,
        private route: ActivatedRoute,
        private modal: ModalController
    ) { }

    ngOnInit() {
        this.data = DateHelper.hoje();
        this.dadosCliente();
        this.loadList();
    }

    private async loadList() {
        this.posto.getByClientId(this.clienteId)
        .subscribe(lista => {
            this.lista = lista;
        });
    }

    private async dadosCliente() {
        const id = this.route.snapshot.paramMap.get('id');
        this.clienteId = id;
        this.cliente.get(id).subscribe(cli => {
            this.nomeEmpresa = cli.nome;
        });
    }

    itensPosto(id: string) {}

    editar(posto) {}

    remover(posto) {}

    async criar() {
        const dialog = await this.modal.create({
            component: FormPostoPage
        });
        dialog.onDidDismiss().then(resp => this.novoCliente(resp.data));
        dialog.present();
    }

    private async novoCliente(data) {
        data.id_cliente = this.clienteId;
        this.posto.create(data);
    }

}
