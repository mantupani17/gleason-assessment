import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  is_login_route = true;
  constructor(private route:ActivatedRoute) {
    if ( window.location.href.endsWith('login') ) {
      this.is_login_route = false;
    }
  }

  getClass(is_login:Boolean) {
    if (is_login) {
      return 'gl-content';
    } 
  }
}
