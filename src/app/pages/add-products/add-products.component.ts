import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CoreService } from 'src/app/service/core-service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
  validateForm!: FormGroup;
  picture:any;
  constructor(
    private fb: FormBuilder,
    private coreService: CoreService,
    private notification: NzNotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      productname: [null,[Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
      image: [null, [Validators.required]],
    })
  }
  
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.validateForm.patchValue({
        fileSource: file
        
      });
      console.log(file);
      this.picture=file;
    }
  }

  submit(){
    const data = new FormData();
    data.append('productName', this.validateForm.value.productname);
    data.append('description', this.validateForm.value.description);
    data.append('price', this.validateForm.value.price);
    data.append('image', this.picture);
    this.coreService.post("http://localhost:3000/addProduct",data).subscribe((res:any)=>{
      this.notification.create('success','Added','Product added successfully ',{nzStyle:{top:'57px',left:'18px'}});
      // this.router.navigate(['/products']);
    });
  }
}
