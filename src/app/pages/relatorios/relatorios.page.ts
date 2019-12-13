import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-relatorios',
    templateUrl: './relatorios.page.html',
    styleUrls: ['./relatorios.page.scss'],
})
export class RelatoriosPage {

    constructor(
        private nav: NavController
    ) { }

    formRelatorio(cliente) {
        this.nav.navigateForward('lista-relatorios/' + cliente.id);
    }

}
