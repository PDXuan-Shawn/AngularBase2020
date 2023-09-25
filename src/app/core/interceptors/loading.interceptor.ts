import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { delay, finalize } from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    constructor(private loadingSV: LoadingService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.url.includes('emailexists')) {
            this.loadingSV.busy();
        }
        return next.handle(req).pipe(
            finalize(() => {
                this.loadingSV.hidden();
            })
        );
    }
}
