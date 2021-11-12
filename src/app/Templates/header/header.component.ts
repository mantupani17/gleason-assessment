import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  is_side_bar_enabled = true;
  is_login_route = true;
  constructor(private route:ActivatedRoute, private router: Router) {
    if ( window.location.href.endsWith('login') ) {
      this.is_login_route = false;
    }
  }
  ngOnInit(): void {
  }
  toggleSideBar(){
    this.is_side_bar_enabled = !this.is_side_bar_enabled;
  }

  logout() {
    let token = localStorage.getItem('userToken');
    if (token) {  
      localStorage.removeItem('userToken');
      location.reload()
      this.router.navigateByUrl("/login");  
    }  
  }
}
