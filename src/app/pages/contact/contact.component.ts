import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CoreService } from 'src/app/service/core-service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  validateForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private coreService: CoreService,
    private notification: NzNotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({ 
      name: [null,[Validators.required]],
      email: [null, [Validators.email,Validators.required]],
      message: [null, [Validators.required]],
    });
  }
  submit(){
    let data={
      name:this.validateForm.value.name,
      email:this.validateForm.value.email,
      message:this.validateForm.value.message,
    }
    this.coreService.post("http://localhost:3000/contact",data).subscribe((res:any)=>{
      this.notification.create('success','Sent','Message sent successfully ',{nzStyle:{top:'57px',left:'18px'}});
      this.router.navigate(['/products']);
    });
  }
}
