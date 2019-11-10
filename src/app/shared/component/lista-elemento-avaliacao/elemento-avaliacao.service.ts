import { AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { AlertInput, AlertOptions } from '@ionic/core';

@Injectable({
    providedIn: 'root'
})
export class ElementoAvaliacaoService {

    constructor(
        private alert: AlertController
    ) { }

    async criar(elemento, handler = null, campoExtra = '') {
        const inputList: AlertInput[] = [{ type: 'text', name: 'nome', placeholder: 'Nome' }];
        if (campoExtra) {
            inputList.push({ type: 'text', name: campoExtra, placeholder: 'Email' });
        }

        const options: AlertOptions = {
            header: 'Consulimp',
            message: 'Digite ' + this.label(elemento),
            inputs: inputList,
            buttons: [
                { text: 'Cancelar', role: 'cancel', cssClass: 'secondary' },
                { text: 'Criar', handler: (data) => handler(data) }
            ]
        };
        const dialog = await this.alert.create(options);
        dialog.present();
    }


    private label(index) {
        const v: any = {};
        v.item = ' o nome do item';
        v.email = ' nome e email do cliente';
        v.cliente = ' o nome do cliente';
        return v[index];
    }

}
