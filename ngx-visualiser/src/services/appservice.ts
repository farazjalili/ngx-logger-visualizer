import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class AppService {
    constructor(private http: HttpClient){}
    serveraddress = "http://116.203.235.98:1100";
    url = "/log/";

   public dashboard(): any{
       return this.http.get(this.serveraddress + this.url);
   }

}
