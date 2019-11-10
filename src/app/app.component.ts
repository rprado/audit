import { Component } from '@angular/core';
import { RegisterService } from './services/register.service';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    public appPages = [
        {
            title: 'Home',
            url: '/home',
            icon: 'home'
        },
        {
            title: 'List',
            url: '/list',
            icon: 'list'
        }
    ];

    constructor(
        private register: RegisterService,
        private nav: NavController
    ) {
        this.initializeApp();
    }

    initializeApp() {
        if (!this.register.created()) {
            this.nav.navigateRoot('login');
        } else {
            this.loadMenu();
        }
    }

    loadMenu() {}
}
