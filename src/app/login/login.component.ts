import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  loginError: boolean = false;

  loginErrorMsg:string;

  constructor(
    private fb: FormBuilder, 
    private api: SharedService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email:      ['', [Validators.required, Validators.email]],
      password:   ['', [Validators.required]]
    });
  }

  onSubmitLogin(event){
    const formData = {
      email : this.loginForm.get('email').value,
      password : this.loginForm.get('password').value
    }

    this.api.login(formData).subscribe(
      async(response) => {
        if(response.body['type'] == "success"){
          const response_data = response.body;
          this.api.set_session(response_data['message'].expiresIn, response_data['message'].accessToken , response_data['message'].refreshToken, response_data['message'].role);
          this.router.navigate([response_data['message'].role+'/profile']);
          this.loginForm.reset();
        }
      },
      async (error) => {
        this.loginForm.get('password').reset();
        this.loginError = true;
        this.loginErrorMsg = error.error.message;
    });

  }

}
