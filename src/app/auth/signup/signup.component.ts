import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignupRequestPayload } from './signup-request.payload';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupRequestPayload: SignupRequestPayload;

  constructor(public signupForm: FormGroup, private authService: AuthService) {
    signupForm= new FormGroup({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.email),
      password: new FormControl(null, Validators.required)
    });
    this.signupRequestPayload = {
      username: '',
      email: '',
      password: ''
    };  
  }

  signup(): void {
    this.signupRequestPayload.username = this.signupForm.get('username')?.value;
    this.signupRequestPayload.email = this.signupForm.get('email')?.value;
    this.signupRequestPayload.password = this.signupForm.get('password')?.value;

    this.authService.signup(this.signupRequestPayload).subscribe(d => console.log(d))
  }

}
