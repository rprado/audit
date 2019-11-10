import { Component, ViewChild } from '@angular/core';
import { ListaElementoAvaliacaoComponent } from 'src/app/shared/component/lista-elemento-avaliacao/lista-elemento-avaliacao.component';

@Component({
    selector: 'app-itens-avalicao',
    templateUrl: './itens-avalicao.page.html',
    styleUrls: ['./itens-avalicao.page.scss'],
})
export class ItensAvalicaoPage {

    @ViewChild(ListaElementoAvaliacaoComponent, null) lista: ListaElementoAvaliacaoComponent;

    criaElemento() {
        this.lista.criar();
    }

}
