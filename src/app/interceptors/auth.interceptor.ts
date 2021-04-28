import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from "@angular/router";

import { SharedService } from '../services/shared.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor( public router: Router, private api : SharedService) { }
    
    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        if (err.status === 401) {
            this.api.logout();
            this.router.navigate(['Login']);
            return of(err.message);
        }
        return throwError(err);
    }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const idToken = localStorage.getItem("access_token");
        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + idToken)
            });
            return next.handle(cloned);
        }else{
            return next.handle(req)
            .pipe(
                catchError(x=> this.handleAuthError(x))
            );

        }
    }    
}
