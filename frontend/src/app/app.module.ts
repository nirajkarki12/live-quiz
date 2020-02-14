import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ApiConstants } from './constants/api-constants';

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
// https://www.npmjs.com/package/ngx-socket-io
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: ApiConstants.socketUrl, options: {
      query: {
        token: localStorage.getItem('X-Authorization')
      }
    }
};

// Modules
import { AppRoutingModule } from './app.routing';
import { CoreModule } from './modules/core/core.module';
import { SharedModule } from './modules/shared/shared.module';
import { LoginModule } from './modules/login/login.module';
// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
// Components
import { AppComponent } from './app.component';
import { P404Component } from 'src/app/modules/shared/components/error/404.component';
import { P500Component } from 'src/app/modules/shared/components/error/500.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];
const toastrConfig = {
  timeOut: 10000,
  positionClass: 'toast-bottom-right',
  preventDuplicates: true,
  closeButton: true
};

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(toastrConfig),
    AppRoutingModule,
    CoreModule,
    SharedModule,
    LoginModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppHeaderModule,
    AppFooterModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    SocketIoModule.forRoot(config),
  ],
  declarations: [
    ...APP_CONTAINERS,
    AppComponent,
    P404Component,
    P500Component,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  exports: [
    ToastrModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor() {
    console.log(localStorage.getItem('X-Authorization'));
  }
}
