import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/services/appservice';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngx-visualiser';
  constructor( private appservice:AppService){

  }
  
  ngOnInit(): void {
    this.appservice.dashboard().subscribe((response)=>{
      console.log(response);
    })
  }

}
