import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IPagination} from '../shared/models/pagination';
import { IType } from '../shared/models/porductType';
import { map } from 'rxjs/operators';
import { ShopParams } from '../shared/models/ShopParams';
import { IProduct } from '../shared/models/product';


@Injectable({
  providedIn: 'root'
})
export class ShopService {


  baseUrl='https://localhost:5001/api/';

  constructor(private http: HttpClient)
  {
   }

   getProducts(ShopParams:ShopParams){

    let params=new HttpParams();
    if (ShopParams.brandIdSelected !==0)
    {
     // params=params.append('brandId',brandId.toString())
      params=params.append('brandId',ShopParams.brandIdSelected)
    }
    if (ShopParams.typeIdSelected !==0)
    {
      params=params.append('typeId',ShopParams.typeIdSelected)
    }

    if (ShopParams.search)
    {
      params=params.append('Search',ShopParams.search.toString());
    }


      params=params.append('Sort',ShopParams.SortSelected.toString())
      params=params.append('PageIndex',ShopParams.pageNumber)
      params=params.append('PageSize',ShopParams.pageSize)


    return this.http.get<IPagination>(this.baseUrl + 'products',{observe:'response',  params})
    .pipe(
      map((reponse)=>{
        return reponse.body;
      })
    );
   }

   getBrands(){
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brand');
   }

   getTypes(){
    return this.http.get<IType[]>(this.baseUrl + 'products/type');
   }

   getProduct(id:number){

      return this.http.get<IProduct>(this.baseUrl + 'products/'+id);
   }


}
