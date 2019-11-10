import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ParamsService {
    params = {};

    constructor() { }

    set(key: string, value: any) {
        this.params[key] = value;
    }

    get(key: string) {
        return this.params[key];
    }

}
