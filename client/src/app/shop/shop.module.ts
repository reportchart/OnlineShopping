import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ShareModule } from '../shared/share.module';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { ShopRoutingModule } from './shop-routing.module';


@NgModule({
  declarations: [
    ShopComponent,
    ProductItemComponent,
    ProductsDetailsComponent,
  ],
  imports: [
    CommonModule,
    ShareModule,
    ShopRoutingModule
  ]
})
export class ShopModule {


}
