import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  isVisible = false;
  constructor(
    private notification: NzNotificationService

  ) { }

  ngOnInit(): void {
  }
  createBasicNotification(): void {
    this.isVisible = false;
    this.notification.create(
      'success',
      'Order Placed',
      'Your order has been placed successfully',
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
