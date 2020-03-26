import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/modules/shared/shared.module';
// Routing
import { SponsorRoutingModule } from './sponsor-routing.module';
// Components
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';

@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    UpdateComponent,
  ],
  imports: [
    SharedModule,
    SponsorRoutingModule,
  ]
})
export class SponsorModule { }
