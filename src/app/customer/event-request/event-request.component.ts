import { Component, OnInit } from '@angular/core';
import {DatePickerOptions } from '@ngx-tiny/date-picker';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import { Router,  ActivatedRoute} from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-event-request',
  templateUrl: './event-request.component.html',
  styleUrls: ['./event-request.component.css']
})

export class EventRequestComponent implements OnInit {

  requestForm: FormGroup;

  user_id:any;

  supplier_details:any;

  request_success:boolean = false;


  singleDatePickerOptions: DatePickerOptions = {
    displayFormat : "yyyy-MM-dd"
  };

  constructor(private api: SharedService, private router: Router, private activeRoute : ActivatedRoute, private fb: FormBuilder) {

    this.user_id = this.activeRoute.snapshot.params['id'];
    
  }

  ngOnInit(){

    this.requestForm = this.fb.group({
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      note: [''],
    });

    this.activeRoute.data.subscribe(
      async(response) => {
        const responsedata = response.supplier.body;
        this.supplier_details =  responsedata['message'].user;
      },
      async (error) => {
        if(error.status == 401){
          this.router.navigate(['Login']);
        }
      }
    )

  }


  onSubmitEventRequest(){

    const formData = {
      date :  moment(this.requestForm.get('date').value).format("YYYY-M-DD"),
      time : this.requestForm.get('time').value,
      note : this.requestForm.get('note').value,
      supplier_id : this.user_id,
    }

    this.api.add_event_request(formData).subscribe(
      async(response) => {
        if(response.body['type'] == "success"){
          this.request_success = true;
          this.requestForm.reset();
        }
      },
      async (error) => {
        console.log('error', error);
      }
    )
  }

}
