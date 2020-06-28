import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { delay, mergeMap, materialize, dematerialize } from "rxjs/operators";
import { hasLifecycleHook } from '@angular/compiler/src/lifecycle_reflector';



@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith("/log/") && method === "GET":
          return logdata();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function logdata() {
   
      let x=[];
      x.push({id:1,title:'hello',description:'سشیبلاتعنمکمنتالبیس'},{id:2,title:'hello',description:'یبلاتنمکمهعغفقثصضثقفغعه'},{id:3,title:'hello',description:'یبلاتنمکمهعغفقثصضثقفغعه'});
      return ok({
        status: 200,
        description: "get data successful",
        data: x,
      });
    }

   

    // helper functions

    function ok(content) {
      return of(new HttpResponse({ status: 200, body: content }));
    }

    function unauthorized() {
      return throwError({
        status: 401,
        body: { status: 401, description: "unauthorized", data: {} },
      });
    }

    function error(message) {
      return throwError({ status: 400, description: message });
    }

   

    function isEmpty(str) {
      return !str || 0 === str.length || str.length < 6;
    }

    function incorrect_given_item(content) {
      return of(new HttpResponse({ status: 417, body: content }));
    }

    function item_not_found(content) {
      return of(new HttpResponse({ status: 404, body: content }));
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
