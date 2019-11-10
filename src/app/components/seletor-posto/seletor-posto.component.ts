// import { DbProvider } from 'src/app/dao/db';
import { Component, Output, EventEmitter } from '@angular/core';
// import { Posto } from 'src/app/dao/table/posto';

@Component({
    selector: 'seletor-posto',
    templateUrl: './seletor-posto.component.html',
    styleUrls: ['./seletor-posto.component.scss'],
})
export class SeletorPostoComponent {
    @Output() postoSelecionado;
    // posto: Posto;
    listaPosto;
    cliente;

    constructor(
        // private db: DbProvider
    ) {
        this.postoSelecionado = new EventEmitter();
        // this.posto = new Posto(db);
        this.load();
    }

    load() {
        // this.posto.get_nome_posto().
        // subscribe(res => {
        //     this.listaPosto = res;
        // });
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
