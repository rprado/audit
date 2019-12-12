import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AlertOptions, LoadingOptions, ToastOptions } from '@ionic/core';
import { resolve } from 'url';

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

    confirmDelete(msg) {
        return new Promise(async resolve => {
            const alert = await this.alertCtrl.create({
                header: msg.title,
                message: msg.content,
                buttons: [
                    {
                        text: 'Cancelar',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: (blah) => resolve(false)
                    }, {
                        text: 'Deletar',
                        handler: () => resolve(true)
                    }
                ]
            });
            await alert.present();
        });
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
