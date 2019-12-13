import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-lista-visitas',
    templateUrl: './lista-visitas.page.html',
    styleUrls: ['./lista-visitas.page.scss'],
})
export class ListaVisitasPage {

    constructor(
        private nav: NavController
    ) { }


    exibeVisitas(event) {
        const id = event.id;
        this.nav.navigateForward('lista-visitas/' + id);
    }

}
