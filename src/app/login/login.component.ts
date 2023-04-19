import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MyserviceService } from '../myservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userdata:any;
  
  constructor(private bulider: FormBuilder,private toastr:ToastrService,private service:MyserviceService,private router:Router) {
    sessionStorage.clear();
   }

  loginform=this.bulider.group({
    username:this.bulider.control('',Validators.required),
    password:this.bulider.control('',Validators.required),
    
  })

  proceedlogin(){

this.service.getbycode(this.loginform.value.username).subscribe((res)=>{
  this.userdata=res;
  console.log(this.userdata);
  if(this.userdata.password===this.loginform.value.password){
if(this.userdata.isactive){
  sessionStorage.setItem('username',this.userdata.id);
  sessionStorage.setItem('userrole',this.userdata.role);
  this.router.navigate(['detail'])


}else{
  this.toastr.error('PLease Contact Admin','IN Active User')
}


  }else{
    this.toastr.error('invalid credentials')
  }
})
}

}
