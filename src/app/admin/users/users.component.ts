import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @Input('customer_count') customer_count: number;

  @Input('supplier_count') supplier_count: number;

  @Input('admin_count') admin_count: number;

  @Input('user_list') user_list: string[];

  delete_success:boolean = false;
  
  constructor(private api: SharedService, private router: Router) { }

  ngOnInit(){
    this.api.get_admin_users().subscribe(
      async(response) => {
        const responsedata   = response.body;
        this.customer_count  =  responsedata['message'].customer_count;
        this.supplier_count  =  responsedata['message'].supplier_count;
        this.admin_count     =  responsedata['message'].admin_count;
        this.user_list       =  responsedata['message'].user_list;
      },
      async (error) => {
        if(error.status == 401){
          this.router.navigate(['Login']);
        }
      }
    )
  }

  onClickConfirm(user_id){
    this.api.delete_user(user_id).subscribe(
      async(response) => {
        const responsedata   = response.body;
        if(responsedata['type'] == 'success'){
          this.delete_success = true;
          this.ngOnInit();
        }
      },
      async (error) => {
        if(error.status == 401){
          this.router.navigate(['Login']);
        }
      }
    )
  }

}
