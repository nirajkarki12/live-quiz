import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Components
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Sponsors'
    },
    children: [
      {
        path: '',
        component: ListComponent,
        data: {
          title: 'Sponsors List'
        }
      },
      {
        path: 'create',
        component: CreateComponent,
        data: {
          title: 'Create Sponsor'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SponsorRoutingModule { }
