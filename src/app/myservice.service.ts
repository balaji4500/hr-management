import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {

  constructor(private http:HttpClient) { }
apiurl="http://localhost:3000/user"

  Getall(){
   return this.http.get(this.apiurl);
  }
  getbycode(code:any){
    return this.http.get(this.apiurl+'/'+code);
   }

   GetAllrole(){
    return this.http.get("http://localhost:3000/role");
   }

   proceedregister(inputdata:any){
return this.http.post(this.apiurl,inputdata);
   }
   updateuser(code:any,inputdata:any){
    return this.http.put(this.apiurl+'/'+code,inputdata);
       }
IsloggedIn(){
  return sessionStorage.getItem('username')!=null;
}
GetUserrole(){
  return sessionStorage.getItem('userrole')!=null?sessionStorage.getItem('userrole')?.toString():'';
}
}
