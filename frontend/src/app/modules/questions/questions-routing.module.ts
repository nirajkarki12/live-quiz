import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutes } from 'src/app/constants/app-routes';
// Components
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
import { CreateComponent } from './create/create.component';
// Resolver
import { SetsDetailResolverService } from './sets/services/resolver/sets-detail-resolver.service';

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
        path: AppRoutes.createWithId,
        component: CreateComponent,
        resolve: {
          'sets': SetsDetailResolverService,
        },
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
