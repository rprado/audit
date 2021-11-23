import { Posto } from './../../shared/dao/posto';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
    selector: 'app-avaliacao-posto',
    templateUrl: './avaliacao-posto.page.html',
    styleUrls: ['./avaliacao-posto.page.scss'],
})
export class AvaliacaoPostoPage {
    listaCliente;

    constructor(
        private posto: Posto,
        private nav: NavController
    ) { }

    ionViewWillEnter() {
        this.load();
    }

    private async load() {
        this.listaCliente = await this.posto.listWithClient(1);
    }

    go(postoId) {
        this.nav.navigateForward('avaliacao/' + postoId);
    }
}
