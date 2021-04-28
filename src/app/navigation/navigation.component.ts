import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  contactForm: FormGroup;

  @ViewChild('conact_modal') conact_modal;

  isError: boolean = false;

  isSuccess : boolean = false;

  errorMsg:string;

  SuccessMsg : string;


  constructor(
    private fb: FormBuilder, 
    private api: SharedService) { }

  ngOnInit(){
    this.contactForm = this.fb.group({
      email:     ['', [Validators.required, Validators.email]],
      name:      ['', [Validators.required]],
      comment:   ['', [Validators.required]]
    });
  }

  onSubmitContact(event){
     //console.log(this.conact_modal.nativeElement);
     const formData = {
      email   : this.contactForm.get('email').value,
      name    : this.contactForm.get('name').value,
      comment : this.contactForm.get('comment').value
    }

    

    this.api.add_contactus(formData).subscribe(
      async(response) => {
        if(response.body['type'] == "success"){
          const response_data = response.body;
          this.isSuccess = true;
          this.SuccessMsg = response_data['message'];
          this.contactForm.reset();
        }
      },
      async (error) => {
        this.isError = true;
        this.errorMsg = error.error.message;
    });

  }

}
