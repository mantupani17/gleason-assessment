import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  customers = [
    "TCS",
    "WIPRO",
    "Tech Mahindra"
  ]
  roles = [
    'Global Gleason Admin',
    'User',
    'Customer Admin',
    'Gleason Regional Sales Manager (RSM)',
    'Gleason Internal Sales',
    'Gleason Engineer/Service Engineer'
  ]
  user = {
    customer: "",
    roles : []
  }
  userList = [];
  isSaveTabSelected = false;
  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(): void{
    let fields = 'first_name,last_name,customer';
    
    this.userService.getUserDetails({fields: fields}).subscribe((result)=>{
      if(result['status']) {
        this.userList = result['data'];
      }
    })
  }

  selectChange($event) {
    //In my case $event come with a id value
    this.user.customer = $event;
  }

  OnSubmit(form) {
    let queryData = form.value;
    queryData['roles'] = this.user.roles.toString();
    this.userService.saveUser(queryData).subscribe((result)=>{
      form.reset();
    })
  }

  selectRoles(index) {
    this.user.roles.push(this.roles[index])
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
  }

  toggleTab(tab) {
    if (tab == 'create_user') {
      this.isSaveTabSelected = true;
    } else {
      this.isSaveTabSelected = false;
    }
  }

  deleteUsere(_id) {
    this.userService.removeUser(_id).subscribe((result)=>{
      if(result['status']) {
        this.getUserDetails();
      }
    })
  }

}
