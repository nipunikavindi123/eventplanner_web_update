import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private api: SharedService,  private router: Router) { }

  ngOnInit() {
  }

  onClickLogOut(){
    this.api.logout();
    this.router.navigate(['Login']);
  }


}
