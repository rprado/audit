import { Injectable } from '@angular/core';
import { ObjectHelper } from '../helpers/object-helper';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    constructor() { }

    log(re, key): Promise<boolean> {
        return new Promise(resolve => {
            resolve(false);
        });
    }

    created(): boolean {
        const a = ObjectHelper.remember('user');
        return a !== null;
    }
}
