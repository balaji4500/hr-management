import { Component } from '@angular/core';
import { MyserviceService } from '../myservice.service';
import {  MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog'
import { UpdateComponent } from '../update/update.component';



@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent {
  dataSource: any;

  constructor(private service: MyserviceService, private dialog:MatDialog) { 
    this.loaduser();
  }

  uselist: any;


  loaduser() {
    this.service.Getall().subscribe((res) => {
      this.uselist = res;
      this.dataSource= new MatTableDataSource(this.uselist);
    })
  }
  displayedColumns: string[] = ['username', 'name', 'email','role', 'status','action'];
 
  updateuser(code:any){
   const popup= this.dialog.open(UpdateComponent,{
      enterAnimationDuration:'1s',
      exitAnimationDuration:'500ms',
      width:'50%',
      data:{
        usercode:code
      }
    })
    popup.afterClosed().subscribe((res)=>{
      this.loaduser();
    })
   
  

}
opendialog(){

}
  }


