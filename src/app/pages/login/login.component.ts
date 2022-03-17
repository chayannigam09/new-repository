import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CoreService } from 'src/app/service/core-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isVisible = false;
  isOkLoading = false;
  registerForm: boolean=true;
  validateForm!: FormGroup;
  isPasswordVisible = true;
  email:any
  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private coreService: CoreService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({ 
      email: [null, [Validators.email,Validators.required]],
      password: [null, [Validators.required]],
    });
    
    if(this.isVisible){
      this.validateForm = this.fb.group({
        email: [null, [Validators.email,Validators.required]],
      });
    }
  }

  submitForm(data:any) {
    if(data==1){
      if (!this.validateForm.valid) {
        Object.values(this.validateForm.controls).forEach(control => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
            console.log('invalid form');          
          }
        });      
      } else {
        let userdata={
          email:this.validateForm.value.email,
          password:this.validateForm.value.password
        }
        this.coreService.post("http://localhost:3000/login",userdata).subscribe((res:any) => {
        localStorage.setItem('token',res.token);
        this.router.navigate(['/products']);
      },(err)=>{

      })
      }
    }else if (!this.validateForm.valid) {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
          console.log('invalid form');          
        }
      });      
    } else {
      let userdata={
        username:this.validateForm.value.username,
        email:this.validateForm.value.email,
        password:this.validateForm.value.password
      }
      this.coreService.post("http://localhost:3000/register",userdata).subscribe((res:any) => {
        this.notification.create('success','Registerd','you are successfully registered ',{nzStyle:{top:'57px',left:'18px'}});
        this.registerForm=!this.registerForm;
      })
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
 
  forgotPassword(){
    this.isVisible = false;
    this.email=this.validateForm.value.email,
    console.log(this.email);
    if(this.email){
      this.notification.create('success','Email sent','Please check your email ',{nzStyle:{top:'57px',left:'18px'}});
    }else{
      this.notification.create('error','Wrong Email','Please enter valid email ',{nzStyle:{top:'57px',left:'18px'}});
    }
  }
}
