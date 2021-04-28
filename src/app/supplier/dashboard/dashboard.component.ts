import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Input('pending_count') pending_count: number;

  @Input('accept_count') accept_count: number;

  @Input('cancel_count') cancel_count: number;

  @Input('request_list') request_list: string[];
  
  update_success:boolean = false;

  constructor(private api: SharedService, private router: Router) { }

  ngOnInit(){
    this.api.get_supplier_order_count().subscribe(
      async(response) => {
        const responsedata = response.body;
        this.pending_count =  responsedata['message'].pending_count;
        this.accept_count  =  responsedata['message'].accept_count;
        this.cancel_count  =  responsedata['message'].cancel_count;
        this.request_list  =  responsedata['message'].request_list;
      },
      async (error) => {
        if(error.status == 401){
          this.router.navigate(['Login']);
        }
      }
    )
  }

  onClickAccept(id){

    const formData = {
      status : "accept",
      order_id : id,
      payment_status : 'pending' 
    }

    this.api.update_request_status(formData).subscribe(
      async(response) => {
        console.log(response);
        if(response.body['type'] == "success"){
          this.ngOnInit();
          this.update_success = true;
        }
      },
      async (error) => {
        console.log('error', error);
    });
  }

  onClickCancel(id){
    const formData = {
      status : "cancel",
      order_id : id
    }

    this.api.update_request_status(formData).subscribe(
      async(response) => {
        console.log(response);
        if(response.body['type'] == "success"){
          this.ngOnInit();
          this.update_success = true;
        }
      },
      async (error) => {
        console.log('error', error);
    })
  }

}
