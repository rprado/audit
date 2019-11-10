import { Component } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { ObjectHelper } from './helpers/object-helper';
import { Menu } from './shared/dao/menu';
import { VersionHelper } from './helpers/version-helper';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    categoria;
    paginas;
    versao;

    constructor(
        private menuCtrl: MenuController,
        private nav: NavController,
        private menu: Menu
    ) {
        this.initializeApp();
        this.versao = VersionHelper.getLast();
    }

    initializeApp() {
        if (this.firstAccess()) {
            this.nav.navigateRoot('login');
        } else {
            this.loadMenu();
        }
    }

    firstAccess(): boolean {
        const a = ObjectHelper.remember('user');
        return a === null;
    }

    async loadMenu() {
        this.paginas = await this.menu.menuList();
    }

    browseTo(link) {
        this.menuCtrl.toggle();
        this.nav.navigateForward(link);
    }

    verify(categoria) {
        if (this.categoria !== categoria) {
            this.categoria = categoria;
            return true;
        }
        return false;
    }

}
