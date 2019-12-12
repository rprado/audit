import { ModalController, NavController } from '@ionic/angular';
import { AvaliacaoNota } from './../../shared/dao/avaliacao-nota';
import { ArrayHelper } from './../../helpers/array-helper';
import { Avaliacao } from './../../shared/dao/avaliacao';
import { Posto } from './../../shared/dao/posto';
import { Component, OnInit } from '@angular/core';
import { ItemPosto } from 'src/app/shared/dao/item-posto';
import { ActivatedRoute } from '@angular/router';
import { DateHelper } from 'src/app/helpers/date-helper';
import { FormAvaliacaoPage } from 'src/app/modal/form-avaliacao/form-avaliacao.page';

@Component({
    selector: 'app-avaliacao',
    templateUrl: './avaliacao.page.html',
    styleUrls: ['./avaliacao.page.scss'],
})
export class AvaliacaoPage implements OnInit {
    selectedElement;
    elementList = [];
    nomePosto;
    contato;
    media;
    data;
    ida;
    id;

    constructor(
        private avalNota: AvaliacaoNota,
        private modal: ModalController,
        private route: ActivatedRoute,
        private itemPosto: ItemPosto,
        private nav: NavController,
        private aval: Avaliacao,
        private posto: Posto
    ) { }

    ngOnInit() {
        const data = this.route.snapshot.paramMap.get('data');
        this.data = data ? data : DateHelper.today();

        this.id = this.route.snapshot.paramMap.get('id_posto');
        this.ida = this.route.snapshot.paramMap.get('id_avaliacao');
        this.loadList(this.id, this.ida);
        this.setNome(this.id);
    }

    private loadList(id, ida = null) {
        if (ida) {
            this.avalNota.getById(ida).subscribe(itens => {
                this.elementList = itens;
            });
        } else {
            this.itemPosto.getById(id).subscribe(itens => {
                this.elementList = itens;
            });
        }
    }

    private async setNome(id) {
        this.posto.get(id).subscribe(pst => {
            this.contato = pst.contato;
            this.nomePosto = pst.nome;
        });
    }

    async openForm(element) {
        this.selectedElement = element;
        const dialog = await this.modal.create({
            component: FormAvaliacaoPage,
            componentProps: { element, posto: this.nomePosto, id_posto: this.id, avaliacao: this.ida }
        });
        dialog.onDidDismiss().then(resp => this.novaAvaliacao(resp.data));
        dialog.present();
    }

    novaAvaliacao(data) {
        if (!data) { return; }
        this.selectedElement.nota = data.nota;
        this.selectedElement.image = data.image;
        this.selectedElement.observacao = data.observacao;
        this.selectedElement.recomendacao = data.recomendacao;
    }

    salvar() {
        const lista = ArrayHelper.clone(this.elementList);

        if (this.ida) {
            this.update(lista);
        } else {
            this.create(lista);
        }
    }

    private update(lista) {
        lista.forEach(item => {
            this.avalNota.update(item);
        });
    }

    private create(lista: any[]) {
        const aval: any = {id_posto: this.id, data: DateHelper.now(), sent: 0};
        const insertTime = DateHelper.now();
        this.aval.create(aval);

        lista.forEach(item => {
            item.id_avaliacao  = aval.id;
            item.observacao    = item.observacao ? item.observacao : '';
            item.recomendacao  = item.recomendacao ? item.recomendacao : '';
            item.last_modified = insertTime;
            this.avalNota.create(item);
        });
        this.nav.navigateForward('avaliacao');
    }

    randGrades() {
        this.elementList.forEach(item => {
            item.nota = Math.floor(Math.random() * 4) + 1;
        });
    }

}
