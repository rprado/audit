import { Component } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';

@Component({
    selector: 'app-config-popover',
    templateUrl: './config-popover.component.html',
    styleUrls: ['./config-popover.component.scss'],
})
export class ConfigPopoverComponent {

    constructor(
        private nav: NavController,
        private pop: PopoverController
    ) { }

    reset() {
        this.pop.dismiss();
        this.nav.navigateForward('reset');
    }

}
