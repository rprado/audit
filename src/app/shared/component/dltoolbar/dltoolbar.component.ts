import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'dl-toolbar',
    templateUrl: './dltoolbar.component.html',
    styleUrls: ['./dltoolbar.component.scss'],
})
export class DLToolbarComponent {

    @Output() logoClicked;
    @Input() titulo: string;
    @Input() subtitulo: string;
    @Input() hideMenu = false;
    @Input() hideLogo = false;
    @Input() back = false;

    constructor() {
      this.logoClicked = new EventEmitter();
    }

    sendClick(event) {
      this.logoClicked.emit(event);
    }

}
