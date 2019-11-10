import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    CanActivateChild,
    CanLoad,
    Route,
    UrlSegment
} from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { Injectable } from '@angular/core';
import { tap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

    constructor(
        private service: AuthService,
        private router: Router
    ) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.checkAuthState(state.url);
    }

    canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.checkAuthState(state.url);
    }

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
        const url = segments.map(s => '/' + s).join('');
        return this.checkAuthState(url).pipe(take(1));
    }

    checkAuthState(redirect: string): Observable<boolean> {
        return this.service.isAuthenticated.pipe(
            tap(is => {
                if (!is) {
                    this.router.navigate(['/auth'], {
                        queryParams: { redirect }
                    });
                }
            })
        );
    }
}
