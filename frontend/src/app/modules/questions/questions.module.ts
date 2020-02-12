import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/modules/shared/shared.module';
// Routing
import { QuestionsRoutingModule } from './questions-routing.module';
// Components
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';

@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    UpdateComponent
  ],
  imports: [
    SharedModule,
    QuestionsRoutingModule
  ]
})
export class QuestionsModule { }
