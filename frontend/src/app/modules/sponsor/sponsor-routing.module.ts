import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutes } from 'src/app/constants/app-routes';
// Components
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Sponsors'
    },
    children: [
      {
        path: AppRoutes.listWithId,
        component: ListComponent,
        data: {
          title: 'Sponsors List'
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
