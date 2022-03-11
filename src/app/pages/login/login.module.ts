import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login.routing.module';
@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [   
    ReactiveFormsModule,
    FormsModule,
    NzFormModule,
    NzInputModule,
    LoginRoutingModule,
    CommonModule,
    SharedModule
  ],
  providers: [],
 
})
export class LoginModule { }
