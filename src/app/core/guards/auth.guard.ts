import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account/account.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private accountService: AccountService) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {
        return this.accountService.currentUser$.pipe(
            map(auth => {
                // lấy ra listValue 
                const source: any = this.accountService.currentUser$.source;
                const event = source._events;
                const check = event && event.length ? event[event.length - 1] : null;
                if (check) {
                    if (!check.Token) {
                        if (state.url.includes('account')) {
                            return true;
                        } else {
                            this.router.navigateByUrl('account');
                            return false;
                        }
                    }
                    
                    if (state.url.includes('account')) {
                        this.router.navigateByUrl('overview');
                    }
                    return true;
                }
                // this.router.navigate(['account/login'], { queryParams: { returnUrl: state.url } });
                return true;
            })
        )
    }
}
