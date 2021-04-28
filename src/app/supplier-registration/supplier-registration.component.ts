import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import {GoogleMapsModule} from '@angular/google-maps';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-supplier-registration',
  templateUrl: './supplier-registration.component.html',
  styleUrls: ['./supplier-registration.component.css']
})
export class SupplierRegistrationComponent implements OnInit {

  registrationForm: FormGroup;

  avatarFileError: boolean = false;
  avatarFileErrorMsg:string;
  avatar_input : any;
  avatar_call_back : string = '';
  progress: number = 0;

  nicPicFileError: boolean = false;
  nicPicFileErrorMsg:string;
  nic_input : any;
  nic_pic_call_back : string = '';
  progressnic: number = 0;

  registration_success:boolean = false;

  center: google.maps.LatLngLiteral = {lat: 24, lng: 12};
  zoom = 4;
  display: google.maps.LatLngLiteral;

  constructor(
    private fb: FormBuilder, private api: SharedService
  ) { }

  ngOnInit(){
    this.registrationForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name:  ['', [Validators.required]],
      email:      ['', [Validators.required, Validators.email]],
      nic:        ['', [Validators.required]],
      phone:      ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      address1:    ['', [Validators.required]],
      address2:    ['', [Validators.required]],
      address3:    ['', [Validators.required]],
      password:   ['', [Validators.required, Validators.minLength(6)]],
      supplier_type:    ['', [Validators.required]],
      amount:    ['', [Validators.required]],
    });
  }

  
  onAvatarSelect(event) {
    this.avatar_input = event.target.files[0];
    let formData = new FormData();
    formData.append("attachment",  this.avatar_input);

    this.api.upload(formData).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total * 100);
          break;
        case HttpEventType.Response:
          this.avatar_call_back = event.body.message.avatar_url
          setTimeout(() => {
            this.progress = 0;
            this.avatarFileError = false;
          }, 1500);

      }
    },
    (error) => {
      this.avatarFileError = true;
      this.avatarFileErrorMsg = "Something went wrong, please try again."
      this.progress = 0;
    }
    );
  }

  onNicSelect(event){
    this.nic_input = event.target.files[0];
    let formData = new FormData();
    formData.append("attachment",  this.nic_input);
    this.api.upload(formData).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          this.progressnic = Math.round(event.loaded / event.total * 100);
          break;
        case HttpEventType.Response:
          this.nic_pic_call_back = event.body.message.avatar_url
          setTimeout(() => {
            this.progressnic = 0;
            this.nicPicFileError = false;
          }, 1500);

      }
    },
    (error) => {
      this.nicPicFileError = true;
      this.nicPicFileErrorMsg = "Something went wrong, please try again."
      this.progressnic = 0;
    }
    );
  }


  onSubmitRegistration(event){
    if(this.avatar_call_back == ""){
      this.avatarFileError = true;
      this.avatarFileErrorMsg = "Profile picture is required"
    }else if(this.nic_pic_call_back == ""){
      this.nicPicFileError = true;
      this.nicPicFileErrorMsg = "NIC picture is required"
    }else{
      const formData = {
        first_name : this.registrationForm.get('first_name').value,
        last_name  : this.registrationForm.get('last_name').value,
        avatar_url : this.avatar_call_back,
        email      : this.registrationForm.get('email').value,
        nic        : this.registrationForm.get('nic').value,
        nic_pic_url    : this.nic_pic_call_back,
        phone      : this.registrationForm.get('phone').value,
        address1   : this.registrationForm.get('address1').value,
        address2   : this.registrationForm.get('address2').value,
        address3   : this.registrationForm.get('address3').value,
        role       : "supplier",
        password   : this.registrationForm.get('password').value,
        supplier_type   : this.registrationForm.get('supplier_type').value,
        amount     : this.registrationForm.get('amount').value,
      }

      this.api.registration(formData).subscribe(
        async(response) => {
          console.log(response);
          if(response.body['type'] == "success"){
            this.registration_success = true;
            this.avatar_call_back = '';
            this.nic_pic_call_back = '';
            this.registrationForm.reset();
          }
        },
        async (error) => {
          console.log('error', error);
      });
    }
  }




}
