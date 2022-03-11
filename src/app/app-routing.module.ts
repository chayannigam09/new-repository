import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { CartComponent } from './pages/cart/cart.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ContactComponent } from './pages/contact/contact.component';

const routes: Routes = [
{
  path: '', component : HeaderComponent,
  children: [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {
      path: 'login',
      loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
    },
    { path: 'cart', component: CartComponent},
    { path: 'home', component: HomeComponent},
    { path: 'products', component: ProductsComponent},
    { path: 'chekout', component: CheckoutComponent},
    { path: 'contact', component: ContactComponent},
    { path: '**' , redirectTo: '/'}
  ]

}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
