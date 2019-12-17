import { Component, OnInit } from '@angular/core';
import { DataTransfer } from 'src/app/shared/dao/data-transfer';

@Component({
    selector: 'app-helper',
    templateUrl: './helper.page.html'
})
export class HelperPage implements OnInit {

    constructor(
        private transfer: DataTransfer
    ) { }

    ngOnInit() {
        // this.transfer.down();
        this.transfer.up();
    }

}
