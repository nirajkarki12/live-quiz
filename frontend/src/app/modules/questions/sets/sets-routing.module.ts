import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutes } from 'src/app/constants/app-routes';
// Components
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
// Resolvers
import { SetsDetailResolverService } from './services/resolver/sets-detail-resolver.service';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Questions Sets'
    },
    children: [
      {
        path: '',
        component: ListComponent,
        data: {
          title: 'Questions Sets'
        }
      },
      {
        path: AppRoutes.create,
        component: CreateComponent,
        data: {
          title: 'Add a Sets'
        }
      },
      {
        path: AppRoutes.edit,
        component: UpdateComponent,
        resolve: {
          'sets': SetsDetailResolverService,
        },
        data: {
          title: 'Update Sets'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetsRoutingModule { }
