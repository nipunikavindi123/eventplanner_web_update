import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  user_id :string;

  profileUpdateForm: FormGroup;

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

  update_success:boolean = false;



  constructor(
    private api: SharedService, 
    private router: Router, 
    private activeRoute : ActivatedRoute, 
    private fb: FormBuilder) {
    this.user_id = this.activeRoute.snapshot.params['id'];
  }

  ngOnInit(){

    this.profileUpdateForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name:  ['', [Validators.required]],
      email:      ['', [Validators.required, Validators.email]],
      nic:        ['', [Validators.required]],
      phone:      ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      address1:    ['', [Validators.required]],
      address2:    ['', [Validators.required]],
      address3:    ['', [Validators.required]],
      amount:     [''],
      supplier_type:     [''],
      password:   [null, [Validators.minLength(6)]],
    });

    this.activeRoute.data.subscribe(
      async(response) => {
        const responsedata = response.user.body;
        this.profileUpdateForm.patchValue({
          first_name: responsedata['message'].user.first_name,
          last_name: responsedata['message'].user.last_name,
          email: responsedata['message'].user.email,
          nic: responsedata['message'].user.nic,
          phone: responsedata['message'].user.phone,
          address1: responsedata['message'].user.address.address1,
          address2: responsedata['message'].user.address.address2,
          address3: responsedata['message'].user.address.address3,
          amount: (responsedata['message'].user.role == "supplier") ?  responsedata['message'].user.amount : "",
          supplier_type : (responsedata['message'].user.role == "supplier") ? responsedata['message'].user.supplier_type : ""
        });

        this.avatar_call_back = responsedata['message'].user.avatar.url;
        this.nic_pic_call_back = responsedata['message'].user.nic_pic.url;

      },
      async (error) => {
        if(error.status == 401){
          this.router.navigate(['Login']);
        }
      }
    )
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

  onSubmitUpdateProfile(){
    if(this.avatar_call_back == ""){
      this.avatarFileError = true;
      this.avatarFileErrorMsg = "Profile picture is required"
    }else if(this.nic_pic_call_back == ""){
      this.nicPicFileError = true;
      this.nicPicFileErrorMsg = "NIC picture is required"
    }else{
      const formData = {
        first_name : this.profileUpdateForm.get('first_name').value,
        last_name  : this.profileUpdateForm.get('last_name').value,
        avatar_url : this.avatar_call_back,
        email      : this.profileUpdateForm.get('email').value,
        nic        : this.profileUpdateForm.get('nic').value,
        nic_pic_url    : this.nic_pic_call_back,
        phone      : this.profileUpdateForm.get('phone').value,
        address1   : this.profileUpdateForm.get('address1').value,
        address2   : this.profileUpdateForm.get('address2').value,
        address3   : this.profileUpdateForm.get('address3').value,
        password   : this.profileUpdateForm.get('password').value,
        amount     : this.profileUpdateForm.get('amount').value,
        supplier_type : this.profileUpdateForm.get('supplier_type').value
      }

      this.api.update_user_by_admin(this.user_id, formData).subscribe(
        async(response) => {
          console.log(response);
          if(response.body['type'] == "success"){
            this.update_success = true;
          }
        },
        async (error) => {
          console.log('error', error);
      });
    }
  }

}
