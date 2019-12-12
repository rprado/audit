import { OverlayService } from './../../services/overlay.service';
import { ModalController, NavController, IonItemSliding } from '@ionic/angular';
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
        private nav: NavController,
        private route: ActivatedRoute,
        private modal: ModalController,
        private overlay: OverlayService
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

    itensPosto(id: string) {
        this.nav.navigateForward('item-posto/' + id);
    }

    private async update(posto) {
        const loader = await this.overlay.loading();
        this.posto.update(posto).then(() => loader.dismiss());
    }

    async editar(posto, item: IonItemSliding) {
        const dialog = await this.modal.create({
            component: FormPostoPage,
            componentProps: { posto }
        });
        dialog.onDidDismiss().then(resp => {
            item.close();
            this.update(resp.data);
        });
        dialog.present();
    }

    remover(posto, item: IonItemSliding) {
        const msg = { title: 'Cuidado...', content: 'Deseja, realmente, remover este posto?' };
        this.overlay.confirmDelete(msg).then(del => {
            if (del) {
                this.posto.delete(posto).
                then(() => this.overlay.toast({ message: 'Posto removido com sucesso' }));
            }
            item.close();
        });
    }

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
