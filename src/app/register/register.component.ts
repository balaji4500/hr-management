import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import{ToastrService} from 'ngx-toastr';
import { MyserviceService } from '../myservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private bulider: FormBuilder,private toastr:ToastrService,private service:MyserviceService,private router:Router) { }


  registerform=this.bulider.group({
    id:this.bulider.control('',Validators.compose([Validators.required,Validators.minLength(5)])),
    name:this.bulider.control('',Validators.required),
    password:this.bulider.control('',Validators.compose([Validators.required])),
    email:this.bulider.control('',Validators.compose([Validators.required,Validators.email])),
    gender:this.bulider.control('male',Validators.required),
    role:this.bulider.control(''),
    isactive:this.bulider.control(false),
  });

  proceedregistration(){
    if(this.registerform.valid){
      this.service.proceedregister(this.registerform.value).subscribe(res=>{
        this.toastr.success('please contact admin for enabe access','Registered success fully');
        this.router.navigate(['home'])
      })  
  }
  else{
this.toastr.warning('Please enter valid data');
  }
}
}
