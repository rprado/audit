
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SeletorPostoComponent } from './seletor-posto/seletor-posto.component';
import { ConfigPopoverComponent } from './config-popover/config-popover.component';

@NgModule({
  declarations: [
    SeletorPostoComponent,
    ConfigPopoverComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    SeletorPostoComponent
  ]
})
export class ComponentsModule { }
