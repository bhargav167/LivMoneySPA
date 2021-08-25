import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';  
@Injectable({
    providedIn: 'root'
})
export class LoginGaurd implements CanActivate {
    constructor(private _router: Router) {
    }
    canActivate(
        next:  ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        if (!localStorage.getItem('AuthUser')) {
            return true;
        }
        else {
            this._router.navigate(['/admin/dashboard'])
            return false;
        }
    }
}
