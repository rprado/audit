import { AvaliacaoNota } from './../../shared/dao/avaliacao-nota';
import { Component, OnInit } from '@angular/core';
import { Avaliacao } from 'src/app/shared/dao/avaliacao';

@Component({
    selector: 'app-eraser',
    templateUrl: './eraser.page.html',
    styleUrls: ['./eraser.page.scss'],
})
export class EraserPage implements OnInit {

    constructor(
        private avnota: AvaliacaoNota,
        private av: Avaliacao,
    ) { }

    ngOnInit() {
        // this.avnota.erase().subscribe(
        //     x => {
        //         x.forEach((item: any) => {
        //             this.avnota.delete(item);
        //         });
        //     }
        // );
    }

}
