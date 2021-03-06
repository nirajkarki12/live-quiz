import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
// https://www.npmjs.com/package/ngx-custom-validators
import { CustomFormsModule } from 'ngx-custom-validators';
// https://www.npmjs.com/package/angular2-multiselect-dropdown
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
// https://www.npmjs.com/package/ngx-moment
import { MomentModule } from 'ngx-moment';
// Pagination Component
import {
  PaginationModule,
  CollapseModule,
  BsDatepickerModule,
} from 'ngx-bootstrap';

import { NoRecordsFoundComponent } from './components/no-records-found/no-records-found.component';
import { LoadingComponent } from './components/loading/loading.component';
// Services
import { ValidatorMessageService } from './services/validator-message/validator-message.service';
// API Constants
import { ApiConstants } from 'src/app/constants/api-constants';
import { ScrollToBottomDirective } from './directives/scroll-to-bottom.directive';

@NgModule({
  imports: [
    CommonModule,
    AngularMultiSelectModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PaginationModule.forRoot(),
    CollapseModule.forRoot(),
    CustomFormsModule,
    MomentModule.forRoot({
      relativeTimeThresholdOptions: {
        'm': 59
      }
    }),
    BsDatepickerModule.forRoot(),
  ],
  declarations: [
    NoRecordsFoundComponent,
    LoadingComponent,
    ScrollToBottomDirective,
  ],
  exports: [
    CommonModule,
    AngularMultiSelectModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    CollapseModule,
    CustomFormsModule,
    RouterModule,
    NoRecordsFoundComponent,
    LoadingComponent,
    MomentModule,
    ScrollToBottomDirective,
    BsDatepickerModule,
  ],
  providers: [
    DatePipe,
    ValidatorMessageService
  ]
})
export class SharedModule {}
