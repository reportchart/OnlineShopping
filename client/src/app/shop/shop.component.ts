
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/porductType';
import { IProduct } from '../shared/models/product';
import { ShopParams } from '../shared/models/ShopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  @ViewChild('search',{static:false})  serachTerm!: ElementRef

  products!:IProduct[];

  brands!:IBrand[];
  types!:IType[];
  shopParams =new ShopParams();
  totalCount!:number;

  SortOptions=[
    { name:'Alphabetical',value:'name'},
    { name:'Price:Low to High',value:'priceAsc'},
    { name:'Price:High to Low',value:'priceDesc'}
  ];

  constructor(private shopoService:ShopService)
   {


   }

  ngOnInit(): void {

  this.getProducts();
  this.getBrands();
  this.getTypes();

  }

  getProducts()
  {

    this.shopoService.getProducts(this.shopParams).subscribe(
      (response )=>{
        this.products=response!.data;
        this.shopParams.pageNumber=response!.pageIndex;
        this.shopParams.pageSize=response!.pageSize;
        this.totalCount=response!.count;
      },
      error =>{
       console.log(error);
      }
    );


  }

  getBrands()
  {

    this.shopoService.getBrands().subscribe(
      (response )=>{
        this.brands=[{id:0,name:'All'},...response];
      },
      error =>{
       console.log(error);
      }
    );


  }

  getTypes()
  {

    this.shopoService.getTypes().subscribe(
      (response )=>{
        this.types=[{id:0,name:'All'},...response];
      },
      error =>{
       console.log(error);
      }
    );
  }

  onBrandSelected(brandId:number)
  {
    this.shopParams.brandIdSelected=brandId;
    this.shopParams.pageNumber=1;
  this.getProducts();
  }

  onTypeSelected(typeId:number)
  {
    this.shopParams.typeIdSelected=typeId;
    this.shopParams.pageNumber=1;
    this.getProducts();
  }

  onSortSelected(sort:string)
  {
    this.shopParams.SortSelected =sort;

    this.getProducts();
  }

  onPageChanged(event:any)
  {
    if(this.shopParams.pageNumber !==event)
    {
      this.shopParams.pageNumber=event
      this.getProducts();

    }

  }

  onSearch()
  {
    this.shopParams.search=this.serachTerm.nativeElement.value;
    this.shopParams.pageNumber=1;
    this.getProducts();
  }

  onReset()
  {
   this.serachTerm.nativeElement.value = '';
   this.shopParams= new ShopParams();
   this.getProducts();
  }


}
