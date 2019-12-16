import { environment } from './../../../environments/environment';
import { Avaliacao } from './../../shared/dao/avaliacao';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-lista-relatorios',
    templateUrl: './lista-relatorios.page.html',
    styleUrls: ['./lista-relatorios.page.scss'],
})
export class ListaRelatoriosPage {
    listaAvaliacao;

    constructor(
        private route: ActivatedRoute,
        private avaliacao: Avaliacao
    ) { }

    ionViewWillEnter() {
        const id = this.route.snapshot.paramMap.get('id_cliente');
        this.load(id);
    }

    async load(id) {
        this.listaAvaliacao = await this.avaliacao.lista(id);
    }

    visualizaRelatorio(item) {
        const base = environment.server_url;
        window.open(base + 'report/firestore/' + item.id_avaliacao);
    }

    enviaRelatorio(item) {

    }

}
