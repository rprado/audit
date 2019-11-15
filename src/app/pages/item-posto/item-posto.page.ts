import { FormEmailClientePage } from './../../modal/form-email-cliente/form-email-cliente.page';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Posto } from 'src/app/shared/dao/posto';
import { ActivatedRoute } from '@angular/router';
import { ItemPosto } from 'src/app/shared/dao/item-posto';
import { ElementoAvaliacaoService } from 'src/app/shared/component/lista-elemento-avaliacao/elemento-avaliacao.service';
import { Item } from 'src/app/shared/dao/item';
import { FormCopiaItensPage } from 'src/app/modal/form-copia-itens/form-copia-itens.page';

@Component({
    selector: 'app-item-posto',
    templateUrl: './item-posto.page.html',
    styleUrls: ['./item-posto.page.scss'],
})
export class ItemPostoPage implements OnInit {
    setor = '';
    contato;
    idPosto;
    itemList;
    nomePosto;
    elementList;
    itemCount = 0;

    constructor(
        private item: Item,
        private posto: Posto,
        private itemPosto: ItemPosto,
        private route: ActivatedRoute,
        private modal: ModalController,
        private service: ElementoAvaliacaoService
    ) { }

    ngOnInit() {
        this.idPosto = this.route.snapshot.paramMap.get('id');
        this.setNomePosto();
        this.loadList();
    }

    async mailForm() {
        const dialog = await this.modal.create({
            component: FormEmailClientePage,
            componentProps: {id_posto: this.idPosto}
        });
        dialog.present();
    }

    filtrar(nome) {
        this.elementList = this.itemList.filter((item) => {
            return (item.nome.toLowerCase().indexOf(nome.toLowerCase()) > -1);
        });
    }

    async copiaItensPosto() {
        const dialog = await this.modal.create({
            component: FormCopiaItensPage
        });
        dialog.present();
        dialog.onDidDismiss().
        then(data => this.marcaItensCopiados(data));
    }

    async marcaItensCopiados(obj) {
        this.itemPosto.getById(obj.data.idPosto).subscribe(itens => {
            itens.forEach((item: any) => {
                item.id_posto = this.idPosto;
                delete item.id;
                this.itemPosto.create(item);
            });
        });
    }

    setItem(item) {
        item.id_item = item.id;
        item.id_posto = this.idPosto;

        if (item.isChecked) {
            this.itemPosto.create(item);
        } else {
            this.itemPosto.delete(item);
        }
    }

    private inListByObjId(item) {
        return this.elementList.filter(
            x => x.id === item.id
        ).length;
    }

    criaItem() {
        this.service.criar(
            'item',
            (data) => this.novoItem(data)
        );
    }

    novoItem(data) {
        this.item.create(data);
        this.loadList();
    }

    setNomePosto() {
        this.posto.get(this.idPosto).subscribe(pst => {
            this.contato = pst.contato;
            this.nomePosto = pst.nome;
        });
    }

    private loadList() {
        this.itemPosto.itemList(this.idPosto).then((itens: any[]) => {
            this.itemList = itens; this.elementList = itens;
            this.itemCount = itens.filter((x: any) => x.isChecked).length;
        });
    }
}
