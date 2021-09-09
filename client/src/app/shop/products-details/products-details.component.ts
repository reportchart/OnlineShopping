import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket, IBasketItem } from 'src/app/shared/models/basket';
import { IProduct } from 'src/app/shared/models/product';
import {  BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit {

  product!: IProduct;
  basket$!: Observable<IBasket>;
  items!: IBasketItem[];
  quantity=1;

  constructor(private shopService:ShopService,
    private activatedRoute:ActivatedRoute,
    private basketService: BasketService,
    private bcService:BreadcrumbService)
  {
  //  this.basket$=this.basketService.basket$;
    this.bcService.set('@productDetails','');
   }

  ngOnInit(): void {
    this.loadProduct();
  }

  // loaditems()
  // {
  //   this.basket$.
  //    subscribe(
  //     response =>{
  //     this.items= response.items;
  //       const item=response.items.find(i=>i.id===this.product.id);
  //       if(item)
  //       {
  //         this.quantity = item.quantity;
  //       }
  //     }
  //    )
  // }


  loadProduct()
  {
    this.shopService.getProduct(+this.activatedRoute.snapshot.paramMap.get('id')!).subscribe( product=>{
      this.product=product;
      this.bcService.set('@productDetails',product.name);
    //  this.loaditems();
    },
    error =>{
      console.log(error);
     }
    )
  }

  FindBasketItem(product: IProduct)
  {
    return this.items.find(i=>i.id===product.id)
  }

  addItemToBasket()
  {
    this.basketService.addItemToBasket(this.product, this.quantity);
  }

  incrementQuantity(product: IProduct)
  {
    this.quantity++;
  }

  decrementQuantity(product: IProduct)
  {
    if (this.quantity>1)
    {
      this.quantity--;
    }

  }


  incrementItemQuantity(product: IProduct)
  {
    const item =  this.FindBasketItem(product);
    this.basketService.incrementItemQuantity(item!);

  }

  decrementItemQuantity(product: IProduct)
  {

    if(this.quantity>0)
    {
      const item =  this.FindBasketItem(product);
      this.basketService.decrementItemQuantity(item!);
    }

  }

}
