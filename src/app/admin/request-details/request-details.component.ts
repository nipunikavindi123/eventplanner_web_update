import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent implements OnInit {

  order_id:string;

  order: any = {};

  constructor(private api: SharedService, private router: Router, private activeRoute : ActivatedRoute) {
    this.order_id = this.activeRoute.snapshot.params['id'];
  }

  ngOnInit(){
    this.activeRoute.data.subscribe(
      async(response) => {
        const responsedata = response.order.body;
        this.order = responsedata['message'].order;
      },
      async (error) => {
        if(error.status == 401){
          this.router.navigate(['Login']);
        }
      }
    )
  }

}
