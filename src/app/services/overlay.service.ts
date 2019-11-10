import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AlertOptions, LoadingOptions, ToastOptions } from '@ionic/core';

@Injectable({
    providedIn: 'root'
})
export class OverlayService {

    constructor(
        private alertCtrl: AlertController,
        private toaster: ToastController,
        private loader: LoadingController
    ) { }

    async alert(options?: AlertOptions) {
        const alert = await this.alertCtrl.create(options);
        alert.present();
        return alert;
    }

    async loading(options?: LoadingOptions) {
        const loader = await this.loader.create({
            message: 'Carregando...',
            ...options
        });
        loader.present();
        return loader;
    }

    async toast(options?: ToastOptions) {
        const toast = await this.toaster.create({
            position: 'bottom',
            duration: 3000,
            showCloseButton: true,
            closeButtonText: 'Ok!',
            ...options
        });
        toast.present();
        return toast;
    }
}
