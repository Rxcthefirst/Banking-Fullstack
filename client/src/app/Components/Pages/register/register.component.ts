import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Customer } from '../../../Models/customer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm!: FormGroup;
  public submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstname:["", [Validators.required]],
      surname:["", [Validators.required]],
      address1:["", [Validators.required]],
      address2:["",],
      city: ["", [Validators.required]],
      state:["", [Validators.required, Validators.maxLength(2)]],
      zipcode:["", [Validators.required], Validators.minLength(5), Validators.maxLength(5)],
      email:["", [Validators.required, Validators.email]],
      username:["", [Validators.required]],
      password:["", [Validators.required]],
    });
  }

  get formControl() {
    return this.registerForm.controls;
  }

  onRegister(){
    this.submitted = true;
    const customer: Customer = this.registerForm.value;
    lastValueFrom(this.http.post(`${environment.apiUrl}/api/customer/register`, customer)).then(() => this.router.navigate(['/login']));
  }

  onRedirect() {
    this.router.navigate(["/login"]);
  }
}
