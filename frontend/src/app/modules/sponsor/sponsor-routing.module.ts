import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutes } from 'src/app/constants/app-routes';
// Components
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';

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
        path: AppRoutes.create,
        component: CreateComponent,
        data: {
          title: 'Create Sponsor'
        }
      },
      {
        path: AppRoutes.edit,
        component: UpdateComponent,
        data: {
          title: 'Update Sponsor'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SponsorRoutingModule { }
