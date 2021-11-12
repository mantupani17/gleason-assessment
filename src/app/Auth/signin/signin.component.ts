import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthgaurdService } from 'src/app/authgaurd.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  user:any = 1;
  constructor(private router : Router, private Authentication:AuthgaurdService) { }

  ngOnInit(): void {
    this.resetForm()
  }

  OnSubmit(form){
    console.log(form.value)
    // localStorage.setItem('SessionUser', this.user);
    this.Authentication.authenticateUser(form.value).subscribe((result)=>{
        if (result['status'] == true) {
            this.resetForm(form);
            localStorage.setItem('userToken',result['token']);
            this.router.navigate(['/dashboard']);
          }else{
            this.router.navigate(['/login']);
          }
    })
   
    // this.userService.userAuthentication(form.value).subscribe((result) => {
    //   // This code will be executed when the HTTP call returns successfully 
    //   if (result['status'] == true) {
    //     this.resetForm(form);
    //     this.toastr.success('User loggedin successful');
    //     localStorage.setItem('userToken',result['token']);
    //     this.router.navigate(['/home']);
    //   }else{
    //     this.toastr.error(result['message']);
    //   }
    // });
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();

    this.user = {
      password: '',
      email: ''
    }
  }

}
