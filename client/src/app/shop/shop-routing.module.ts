import { NgModule } from '@angular/core';
import { ShopComponent } from './shop.component';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path:'',component:ShopComponent},
  {path:':id',component:ProductsDetailsComponent},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class ShopRoutingModule { }
