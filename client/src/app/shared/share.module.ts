import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule} from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './components/pager/pager.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { OrderTotalsComponent } from './components/order-totals/order-totals.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TextInputComponent } from './components/text-input/text-input.component';




@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagerComponent,
    OrderTotalsComponent,
    TextInputComponent,

  ],
  imports: [
    CommonModule,
  PaginationModule.forRoot(),
   FormsModule,
   CarouselModule.forRoot(),
   ReactiveFormsModule,
   BsDropdownModule.forRoot()

  ],
  exports:[
    PaginationModule,
    PagingHeaderComponent,
    FormsModule,
    PagerComponent,
    CarouselModule,
    OrderTotalsComponent,
    ReactiveFormsModule,
   BsDropdownModule,
   TextInputComponent


  ]
})
export class ShareModule { }
