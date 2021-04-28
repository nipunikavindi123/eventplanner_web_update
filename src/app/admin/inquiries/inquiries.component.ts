import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-inquiries',
  templateUrl: './inquiries.component.html',
  styleUrls: ['./inquiries.component.css']
})
export class InquiriesComponent implements OnInit {

  inquiries:any;

  delete_success:boolean = false;

  constructor(private api: SharedService, private router: Router) { }

  ngOnInit(){
    this.api.get_inquiries().subscribe(
      async(response) => {
        const responsedata   = response.body;
        this.inquiries  =  responsedata['message'].inquiry_list;

      },
      async (error) => {
        if(error.status == 401){
          this.router.navigate(['Login']);
        }
      }
    )
  }

  onClickDeleteConfirm(id){
    this.api.delete_inquiries(id).subscribe(
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
