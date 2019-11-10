import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TopComponent } from './top/top.component';



@NgModule({
    declarations: [
        TopComponent
    ],
    imports: [
        IonicModule,
        CommonModule
    ],
    exports: [
        TopComponent
    ]
})
export class RegisterModule { }
