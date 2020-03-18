import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/modules/core/guards/auth.guard';
// Import Containers
import { DefaultLayoutComponent } from './containers';
import {AppRoutes} from './constants/app-routes';

import { P404Component } from 'src/app/modules/shared/components/error/404.component';
import { P500Component } from 'src/app/modules/shared/components/error/500.component';
// Components
import { LoginComponent } from './modules/login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: AppRoutes.login,
    pathMatch: 'full',
    data: {
      title: 'Login'
    },
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: DefaultLayoutComponent,
    data: {
      title: 'Admin Portal'
    },
    children: [
        {
          path: AppRoutes.dashboard,
          loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
        },
        {
          path: AppRoutes.chat,
          loadChildren: () => import('./modules/chat/chat.module').then(m => m.ChatModule)
        },
        {
          path: AppRoutes.questions,
          loadChildren: () => import('./modules/questions/questions.module').then(m => m.QuestionsModule)
        },
        {
          path: AppRoutes.sets,
          loadChildren: () => import('./modules/questions/sets/sets.module').then(m => m.SetsModule)
        },
        {
          path: AppRoutes.sponsors,
          loadChildren: () => import('./modules/sponsor/sponsor.module').then(m => m.SponsorModule)
        },
      ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
