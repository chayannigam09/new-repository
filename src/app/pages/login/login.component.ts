import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isVisible = false;
  isOkLoading = false;
  registerForm: boolean=false;
  validateForm!: FormGroup;

  constructor(
     private fb: FormBuilder,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  submitForm() {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }


  changeForm(){
    this.registerForm=!this.registerForm;
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    // this.isOkLoading = true;
    // setTimeout(() => {
    //   this.isVisible = false;
    //   this.isOkLoading = false;
    // }, 3000);
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  createBasicNotification(): void {
    this.isVisible = false;
    this.notification.create(
      'success',
      'Email sent',
      'Please check your email ',
      {
        // nzDuration: 0, 
        nzStyle:{
          top:'57px',
          left:'18px'
        }
      } 
    );
  }
}
