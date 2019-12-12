import { Avaliacao } from './../../shared/dao/avaliacao';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    id;
    showFab = false;
    tituloPagina;
    listaAvaliacao = [];

    constructor(
        private route: ActivatedRoute,
        private avaliacao: Avaliacao,
        private nav: NavController
    ) { }

    ionViewWillEnter() {
        this.id = parseInt(this.route.snapshot.paramMap.get('id_cliente'), 10);
        this.tituloPagina = this.id > 0 ? 'Histórico de Visitas' : 'Avaliações Recentes';
        this.id = this.id ? this.id : 0; this.showFab = this.id === 0;
        this.load();
    }

    private async load() {
        this.listaAvaliacao = await this.avaliacao.lista();
    }

    editaAvaliacao(item) {
        const ip = item.id;
        const ia = item.id_avaliacao;
        const dt = item.data.substr(0, 10);
        this.nav.navigateForward('avaliacao/' + ip + '/' + ia + '/' + dt);
    }

    listaRelatorio(item) {

    }

    novaAvaliacao() {
        this.nav.navigateForward('avaliacao');
    }
}
