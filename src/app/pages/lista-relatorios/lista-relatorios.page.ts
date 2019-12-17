import { NavController } from '@ionic/angular';
import { OverlayService } from './../../services/overlay.service';
import { ObjectHelper } from 'src/app/helpers/object-helper';
import { environment, api } from './../../../environments/environment';
import { Avaliacao } from './../../shared/dao/avaliacao';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-lista-relatorios',
    templateUrl: './lista-relatorios.page.html',
    styleUrls: ['./lista-relatorios.page.scss'],
})
export class ListaRelatoriosPage {
    listaAvaliacao;

    constructor(
        private overlay: OverlayService,
        private route: ActivatedRoute,
        private avaliacao: Avaliacao,
        private nav: NavController,
        private http: HttpClient
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
        window.open(base + 'report/index/' + item.id_avaliacao);
    }

    async enviaRelatorio(item) {
        const loader = await this.overlay.loading();
        const data = { id_avaliacao: item.id_avaliacao };
        this.http.post(api('email', 'enviar'), ObjectHelper.encodeObject(data), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            observe: 'response'
        }).subscribe(() => {
            loader.dismiss();
            this.nav.navigateForward('home');
        },
            err => console.log(err));
    }

}
