import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalUsers = 0;
  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.service.getUserCount().subscribe((result)=>{
      console.log(result)
      if (result['status']) {
        this.totalUsers = result['count'];
      }
    })
  }



}
