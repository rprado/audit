import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'top',
    templateUrl: './top.component.html',
    styleUrls: ['./top.component.scss'],
})
export class TopComponent {
    @Output() logoClicked;

    @Input() title: string;
    @Input() color: string;
    contador = 1;

    constructor() {
        this.logoClicked = new EventEmitter();
    }

    imgClicked() {
        this.logoClicked.emit(this.contador++);
    }
}
