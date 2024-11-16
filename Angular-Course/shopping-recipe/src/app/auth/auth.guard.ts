import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
class PermissionsClass{
    constructor(private authService: AuthService, private router:Router){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authService.user.pipe(take(1), map(user => {
            const isAuth = !!user;
            if(isAuth)
                return true;
        
            return this.router.createUrlTree(['/auth']);
        }));
    }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {
    return inject(PermissionsClass).canActivate(next, state);
}