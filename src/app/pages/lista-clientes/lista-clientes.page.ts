import { Component, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ListaElementoAvaliacaoComponent } from 'src/app/shared/component/lista-elemento-avaliacao/lista-elemento-avaliacao.component';
import { ParamsService } from 'src/app/services/params-service';

@Component({
    selector: 'app-lista-clientes',
    templateUrl: './lista-clientes.page.html',
    styleUrls: ['./lista-clientes.page.scss'],
})
export class ListaClientesPage {

    @ViewChild(ListaElementoAvaliacaoComponent, null) lista: ListaElementoAvaliacaoComponent;

    constructor(
        private nav: NavController,
        private params: ParamsService
    ) {}

    novoCliente() {
        this.lista.criar();
    }

    exibePosto(clickedElement) {
        const id = clickedElement.id;
        this.params.set('cliente', clickedElement);
        this.nav.navigateForward('posto/' + id);
    }

    habilita(cliente) {
        this.lista.reabilitar(cliente);
    }
}
