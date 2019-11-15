import { Posto } from './../../shared/dao/posto';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-avaliacao-posto',
    templateUrl: './avaliacao-posto.page.html',
    styleUrls: ['./avaliacao-posto.page.scss'],
})
export class AvaliacaoPostoPage implements OnInit {
    listaCliente;

    constructor(
        private posto: Posto
    ) { }

    ngOnInit() {
        this.load();
    }

    private async load() {
        this.listaCliente = await this.posto.listWithClient();
    }

    novoPosto(cliente) {

    }

    go(postoId) {

    }
}
