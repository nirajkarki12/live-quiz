import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutes } from 'src/app/constants/app-routes';
// Components
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
import { CreateComponent } from './create/create.component';
// Resolver

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Questions'
    },
    children: [
      {
        path: '',
        component: ListComponent,
        data: {
          title: 'Questions List'
        }
      },
      {
        path: AppRoutes.create,
        component: CreateComponent,
        data: {
          title: 'Add a Question'
        }
      },
      {
        path: AppRoutes.edit,
        component: UpdateComponent,
        data: {
          title: 'Update Questions'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule { }
