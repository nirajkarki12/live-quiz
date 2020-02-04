import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { JoinComponent } from './join/join.component';
import { AppRoutes } from 'src/app/constants/app-routes';
import { MessageComponent } from './message/message.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Chat'
    },
    children: [
      {
        path: '',
        component: JoinComponent,
        data: {
          title: 'Join a Chat'
        }
      },
      {
        path: AppRoutes.message,
        component: MessageComponent,
        data: {
          title: 'Private Chat'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
