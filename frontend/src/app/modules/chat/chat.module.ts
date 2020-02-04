import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { ChatRoutingModule } from './chat-routing.module';
// Components
import { JoinComponent } from './join/join.component';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [JoinComponent, MessageComponent],
  imports: [
    SharedModule,
    ChatRoutingModule
  ]
})
export class ChatModule { }
