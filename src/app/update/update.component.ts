import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MyserviceService } from '../myservice.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  rolelist: any
  constructor(private bulider: FormBuilder, private service: MyserviceService, @Inject(MAT_DIALOG_DATA) public data: any,private toastr:ToastrService,private Dialog:MatDialogRef<UpdateComponent>) { }

  editdata: any;
  ngOnInit(): void {

    this.service.GetAllrole().subscribe((res) => {
      this.rolelist = res;
    });
    if (this.data.usercode != null && this.data.usercode != '') {
      this.service.getbycode(this.data.usercode).subscribe((res) => {
        this.editdata = res;
    })

    }

  }

  registerform = this.bulider.group({
    id: this.bulider.control(''),
    name: this.bulider.control(''),
    password: this.bulider.control(''),
    email: this.bulider.control(''),
    gender: this.bulider.control('male'),
    role: this.bulider.control('', Validators.required),
    isactive: this.bulider.control(false),
  });

  updateregiter() {
if(this.registerform.valid){
  this.service.updateuser(this.registerform.value.id,this.registerform.value).subscribe((res)=>{
    this.toastr.success('updated successfully')
    this.Dialog.close();
  })

}else{
this.toastr.warning('Please Select Respective Role')
}
  }


}
