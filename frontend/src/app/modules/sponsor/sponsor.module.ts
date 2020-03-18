import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/modules/shared/shared.module';
// Routing
import { SponsorRoutingModule } from './sponsor-routing.module';
// Components
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    ListComponent,
  ],
  imports: [
    SharedModule,
    SponsorRoutingModule
  ]
})
export class SponsorModule { }
