import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DLToolbarComponent } from './component/dltoolbar/dltoolbar.component';
import { SeletorPostoComponent } from './component/seletor-posto/seletor-posto.component';
import { CopyrightFooterComponent } from './component/copyright-footer/copyright-footer.component';
import { ListaElementoAvaliacaoComponent } from './component/lista-elemento-avaliacao/lista-elemento-avaliacao.component';

@NgModule({
    declarations: [
        ListaElementoAvaliacaoComponent,
        CopyrightFooterComponent,
        SeletorPostoComponent,
        DLToolbarComponent,
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        ListaElementoAvaliacaoComponent,
        CopyrightFooterComponent,
        SeletorPostoComponent,
        ReactiveFormsModule,
        DLToolbarComponent,
        CommonModule,
        IonicModule,
        FormsModule
    ]
})
export class SharedModule { }
