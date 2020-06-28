import { Component, OnInit } from '@angular/core';
import { LogModel } from 'src/models/log.model';
import { AppService } from 'src/services/appservice';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngx-visualiser';
  public logmodel: LogModel[]=[];
  constructor( private appservice:AppService){
    //  this.logmodel.push(new LogModel(1,"hello","Azsxdfgthjklmnhbgvfdcsderfty"));
    //  this.logmodel.push(new LogModel(2,"hello","Azsxdfgthjklmnhbgvfdcsderfty"));
    //  this.logmodel.push(new LogModel(3,"hello","Azsxdfgthjklmnhbgvfdcsderfty"));
    //  this.logmodel.push(new LogModel(4,"hello","Azsxdfgthjklmnhbgvfdcsderfty"));
    //  this.logmodel.push(new LogModel(5,"hello","Azsxdfgthjklmnhbgvfdcsderfty"));
    //  this.logmodel.push(new LogModel(6,"hello","Azsxdfgthjklmnhbgvfdcsderfty"));
    //  this.logmodel.push(new LogModel(7,"hello","Azsxdfgthjklmnhbgvfdcsderfty"));
    //  this.logmodel.push(new LogModel(8,"hello","Azsxdfgthjklmnhbgvfdcsderfty"));
    //  this.logmodel.push(new LogModel(9,"hello","Azsxdfgthjklmnhbgvfdcsderfty"));
    //  this.logmodel.push(new LogModel(10,"hello","Azsxdfgthjklmnhbgvfdcsderfty"));
    //  this.logmodel.push(new LogModel(11,"hello","Azsxdfgthjklmnhbgvfdcsderfty"));
    //  this.logmodel.push(new LogModel(12,"hello","Azsxdfgthjklmnhbgvfdcsderfty"));
    //  this.logmodel.push(new LogModel(13,"hello","Azsxdfgthjklmnhbgvfdcsderfty"));

  }
  
  ngOnInit(): void {
    this.appservice.dashboard().subscribe((response)=>{
      console.log(response);
      if(response.status ===201){
      this.logmodel =response.data;
    }
    console.log(this.logmodel);
    })
  }

}
