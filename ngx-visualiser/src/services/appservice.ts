import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class AppService {
    constructor(private http: HttpClient){}
    serveraddress = "http://127.0.0.1:8000";
    url = "/log/";

   public dashboard(): any{
       return this.http.get(this.serveraddress + this.url)
   }
 
}