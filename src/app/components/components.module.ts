
import { ListaElementoAvaliacaoComponent } from './lista-elemento-avaliacao/lista-elemento-avaliacao.component';
import { DLToolbarComponent } from './dltoolbar/dltoolbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CopyrightFooterComponent } from './copyright-footer/copyright-footer.component';
import { SeletorPostoComponent } from './seletor-posto/seletor-posto.component';
import { ConfigPopoverComponent } from './config-popover/config-popover.component';

@NgModule({
  declarations: [
    DLToolbarComponent,
    SeletorPostoComponent,
    ConfigPopoverComponent,
    CopyrightFooterComponent,
    ListaElementoAvaliacaoComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    DLToolbarComponent,
    SeletorPostoComponent,
    CopyrightFooterComponent,
    ListaElementoAvaliacaoComponent
  ]
})
export class ComponentsModule { }
