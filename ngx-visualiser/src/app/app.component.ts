import { Component, OnInit } from '@angular/core';
import { LogModel } from 'src/models/log.model';
import { AppService } from 'src/services/appservice';
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngx-visualiser';
  public logmodel: LogModel[]=[];
  constructor( private appservice:AppService){

  }

  ngOnInit(): void {
    const source = timer(1000, 2000);
    const abc = source.subscribe(val => {
      this.appservice.dashboard().subscribe((response) => {
        if (response.status === 201 ) {
          this.logmodel = response.data;
        }
      });
    });


  }

}
