import { Posto } from './../../dao/posto';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'seletor-posto',
    templateUrl: './seletor-posto.component.html',
    styleUrls: ['./seletor-posto.component.scss'],
})
export class SeletorPostoComponent {
    @Output() postoSelecionado;
    listaCliente;
    cliente;

    constructor(
        private posto: Posto
    ) {
        this.postoSelecionado = new EventEmitter();
        this.load();
    }

    async load() {
        this.listaCliente = await this.posto.listWithClient();
    }

    itemSelected(idPosto) {
        const obj = {idPosto};
        this.postoSelecionado.emit(obj);
    }

    novoPosto(p) {
        if (this.cliente !== p) {
            this.cliente = p;
            return true;
        }
        return false;
    }

}
