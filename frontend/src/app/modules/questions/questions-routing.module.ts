import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutes } from 'src/app/constants/app-routes';
// Components
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
import { CreateComponent } from './create/create.component';
// Resolver
import { SetsDetailResolverService } from './sets/services/resolver/sets-detail-resolver.service';
import { QuestionDetailResolverService } from './services/resolver/question-detail-resolver.service';
import { QuestionDetailsResolverService } from './services/resolver/question-details-resolver.service';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Questions'
    },
    children: [
      {
        path: AppRoutes.listWithId,
        component: ListComponent,
        resolve: {
          'data': QuestionDetailsResolverService,
        },
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
        resolve: {
          'question': QuestionDetailResolverService
        },
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
