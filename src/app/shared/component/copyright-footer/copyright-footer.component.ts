import { VersionHelper } from '../../../helpers/version-helper';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'copyright-footer',
    templateUrl: './copyright-footer.component.html',
    styleUrls: ['./copyright-footer.component.scss'],
})
export class CopyrightFooterComponent {
    version: string;
    year: number;

    constructor() {
        this.version = VersionHelper.getLast();
        const date = new Date();
        this.year = date.getFullYear();
    }

}
