// import { BaseDao } from './../../dao/table/base';
import { AlertController } from '@ionic/angular';
// import { DbProvider } from './../../dao/db';
import { Component, OnInit, Input, Output } from '@angular/core';
// import { ApiService } from 'src/app/services/api.service';
// import { Categoria } from 'src/app/dao/table/categoria';
// import { Item } from 'src/app/dao/table/item';
// import { Subcategoria } from 'src/app/dao/table/subcategoria';
import { AlertOptions, AlertInput } from '@ionic/core';
// import { Cliente } from 'src/app/dao/table/cliente';
// import { Setor } from 'src/app/dao/table/setor';
import { EventEmitter } from '@angular/core';
// import { Email } from 'src/app/dao/table/email';
import { ElementoAvaliacaoService } from './elemento-avaliacao.service';

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
    conditions: any = {};
    // subject: BaseDao;

    constructor(
        // private db: DbProvider,
        // private api: ApiService,
        private alert: AlertController,
        private service: ElementoAvaliacaoService
    ) {
        this.itemClicked = new EventEmitter();
    }

    ngOnInit() {
        this.conditions.deleted = this.onlyDeleted ? 1 : 0;

        if (this.elemento === 'item') {
            // this.subject = new Item(this.db, this.api);
        }
        if (this.elemento === 'setor') {
            // this.subject = new Setor(this.db, this.api);
        }
        if (this.elemento === 'email') {
            // this.subject = new Email(this.db, this.api);
            this.conditions.id_posto = this.idPosto ;
        }
        if (this.elemento === 'cliente') {
            // this.subject = new Cliente(this.db, this.api);
        }
        if (this.elemento === 'categoria') {
            // this.subject = new Categoria(this.db, this.api);
        }
        if (this.elemento === 'subcategoria') {
            // this.subject = new Subcategoria(this.db, this.api);
        }
        // this.subject.downSync('lista').
        // subscribe(x => {
        //     setTimeout(() => {
        //         this.loadList();
        //     }, 1000);
        // });
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
        if (this.idPosto) {
            data.id_posto = this.idPosto;
        }

        // await this.subject.save(data, 'insert', this.subject.to_string());
        this.loadList();
    }

    async editar(elemento) {
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
                        this.criaSubject(elemento);
                    }
                }
            ]
        };
        const dialog = await this.alert.create(options);
        dialog.present();
    }

    async remover(data) {
        data.deleted = 1;
        // await this.subject.save(data, 'insert', this.subject.to_string());
        this.loadList();
    }

    async reabilitar(data) {
        data.deleted = 0;
        // await this.subject.save(data, 'insert', this.subject.to_string());
        this.loadList();
    }

    loadList() {
        // this.subject.get_where(this.conditions, 'nome').subscribe(
        //     rs => {
        //         this.lista = rs;
        //         this.listaElementos = rs;
        //     }
        // );
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
