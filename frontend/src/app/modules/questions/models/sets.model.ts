import { Sponsor } from '../../sponsor/models/sponsor.model';

export class Sets {
   id: number;
   name: string;
   scheduleDate: any;
   isCompleted: Boolean;
   questions?: [];
   sponsor: Sponsor;
}
