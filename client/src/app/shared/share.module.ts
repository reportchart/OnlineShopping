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
import { CdkStepperModule } from '@angular/cdk/stepper';
import { SteeperComponent } from './components/steeper/steeper.component';
import { BasketSummaryComponent } from './components/basket-summary/basket-summary.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagerComponent,
    OrderTotalsComponent,
    TextInputComponent,
    SteeperComponent,
    BasketSummaryComponent,

  ],
  imports: [
    CommonModule,
  PaginationModule.forRoot(),
   FormsModule,
   CarouselModule.forRoot(),
   ReactiveFormsModule,
   BsDropdownModule.forRoot(),
   CdkStepperModule,
   RouterModule
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
   TextInputComponent,
   CdkStepperModule,
   SteeperComponent,
   BasketSummaryComponent,


  ]
})
export class ShareModule { }
