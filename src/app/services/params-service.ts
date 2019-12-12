import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ParamsService {
    params = {};

    constructor(
        private route: ActivatedRoute
    ) { }

    set(key: string, value: any) {
        this.params[key] = value;
    }

    get(key: string) {
        return this.params[key];
    }

    uriSegment(key: string) {
        return this.route.snapshot.paramMap.get(key);
    }

}
