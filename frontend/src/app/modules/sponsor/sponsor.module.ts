import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/modules/shared/shared.module';
// Routing
import { SponsorRoutingModule } from './sponsor-routing.module';
// Components
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';

@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
  ],
  imports: [
    SharedModule,
    SponsorRoutingModule,
  ]
})
export class SponsorModule { }
