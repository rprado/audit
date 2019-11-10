import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    exports: [
        ReactiveFormsModule,
        CommonModule,
        IonicModule,
        FormsModule
    ]
})
export class SharedModule { }
