import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule} from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './components/pager/pager.component';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';



@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagerComponent,
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
   FormsModule,
   CarouselModule.forRoot()
  ],
  exports:[
    PaginationModule,
    PagingHeaderComponent,
    FormsModule,
    PagerComponent,
    CarouselModule
  ]
})
export class ShareModule { }
