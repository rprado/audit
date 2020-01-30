import { Component } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { ObjectHelper } from 'src/app/helpers/object-helper';
import { OverlayService } from 'src/app/services/overlay.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage {

    code: string;

    constructor(
        private menuCtrl: MenuController,
        private overlay: OverlayService,
        private nav: NavController
    ) { }

    ionViewWillEnter() {
        this.menuCtrl.enable(false);
    }

    ionViewWillLeave() {
        this.menuCtrl.enable(false);
    }

    async login() {
        if (this.code.trim() === 'osmar') {
            const loading = await this.overlay.loading();
            const user = { re: 'Osmar Viviani', key: 'Consulimp', type: 1 };
            ObjectHelper.memorize('user', user); loading.dismiss();
            this.nav.navigateForward('home');
        } else {
            await this.overlay.toast({ message: 'Código de acesso incorreto' });
        }
    }

    send(code) {
        if (code === 13) {
            this.login();
        }
    }
}
