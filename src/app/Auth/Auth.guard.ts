import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';  
@Injectable({
    providedIn: 'root'
})
export class AuthGaurd implements CanActivate {
    constructor(private _router: Router) {
    }
    canActivate(
        next:  ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        if (localStorage.getItem('AuthUser') != null) {
            return true;
        }
        else {
            this._router.navigate(['/auth/login'])
            return false;
        }
    }
}
