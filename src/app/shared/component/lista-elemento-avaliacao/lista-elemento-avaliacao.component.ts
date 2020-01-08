import { AlertController, IonItemSliding } from '@ionic/angular';
import { Component, OnInit, Input, Output } from '@angular/core';
import { AlertOptions, AlertInput } from '@ionic/core';
import { ElementoAvaliacaoService } from './elemento-avaliacao.service';
import { Firestore } from '../../dao/firestore';
import { EventEmitter } from '@angular/core';

import { Item } from '../../dao/item';
import { Email } from '../../dao/email';
import { Cliente } from './../../dao/cliente';
import { OverlayService } from 'src/app/services/overlay.service';

@Component({
    selector: 'lista-elemento-avaliacao',
    templateUrl: './lista-elemento-avaliacao.component.html',
    styleUrls: ['./lista-elemento-avaliacao.component.scss'],
})
export class ListaElementoAvaliacaoComponent implements OnInit {
    @Input() icon: string;
    @Input() header: string;
    @Input() idPosto: number;
    @Input() elemento: string;
    @Input() campoExtra: string;
    @Input() onlyDeleted = false;
    @Input() useSearchBar = false;
    @Output() itemClicked;

    lista;
    listaElementos;
    subject: Firestore<any>;

    constructor(
        private item: Item,
        private email: Email,
        private cliente: Cliente,
        private alert: AlertController,
        private overlay: OverlayService,
        private service: ElementoAvaliacaoService
    ) {
        this.itemClicked = new EventEmitter();
    }

    ngOnInit() {
        if (this.elemento === 'item') {
            this.subject = this.item;
        }
        if (this.elemento === 'email') {
            this.subject = this.email;
        }
        if (this.elemento === 'cliente') {
            this.subject = this.cliente;
        }
        this.loadList();
    }

    async criar(id = 0) {
        this.idPosto = id;
        this.service.criar(
            this.elemento,
            (data) => this.criaSubject(data),
            this.campoExtra
        );
    }

    async criaSubject(data: any) {
        const loader = await this.overlay.loading();
        if (this.idPosto) {
            data.id_posto = this.idPosto;
        }
        this.subject.create(data).then(() => loader.dismiss());
    }

    async editar(elemento, ionItem: IonItemSliding) {
        ionItem.close();

        const inputList: AlertInput[] = [{
            type: 'text',
            name: 'nome',
            value: elemento.nome,
            placeholder: 'Nome'
        }];

        if (elemento.email) {
            inputList.push({ type: 'text', name: 'email', value: elemento.email, placeholder: 'Email' });
        }

        const options: AlertOptions = {
            header: 'Consulimp',
            message: 'Altere os dados e clique em Editar ', // + this.label(this.elemento),
            inputs: inputList,
            buttons: [
                { text: 'Cancelar', role: 'cancel', cssClass: 'secondary' },
                {
                    text: 'Editar', handler: (data) => {
                        elemento.nome = data.nome;
                        if (data.email) {
                            elemento.email = data.email;
                        }
                        this.update(elemento);
                    }
                }
            ]
        };
        const dialog = await this.alert.create(options);
        dialog.present();
    }

    private async update(item) {
        const loader = await this.overlay.loading();
        this.subject.update(item).then(() => loader.dismiss());
    }

    async remover(obj, item: IonItemSliding) {
        const msg = { title: 'Cuidado...', content: 'Deseja, realmente, remover este item?' };
        this.overlay.confirmDelete(msg).then(del => {
            if (del) {
                this.subject.delete(obj).
                    then(() => this.overlay.toast({ message: 'Item removido com sucesso' }));
            }
            item.close();
        });
    }

    async reabilitar(data) {
        data.deleted = 0;
        this.loadList();
    }

    async loadList() {
        const loader = await this.overlay.loading();
        this.subject.getAll(this.idPosto).subscribe(lista => {
            this.listaElementos = lista;
            this.lista = lista;
            loader.dismiss();
        });
    }

    elementClick(element) {
        this.itemClicked.emit(element);
    }

    filtrar(nome) {
        this.lista = this.listaElementos.filter((item) => {
            return (item.nome.toLowerCase().indexOf(nome.toLowerCase()) > -1);
        });
    }
}
