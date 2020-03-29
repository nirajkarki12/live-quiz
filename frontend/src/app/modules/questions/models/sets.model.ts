import { Sponsor } from '../../sponsor/models/sponsor.model';

export class Sets {
   id: number;
   name: string;
   prize: number;
   scheduleDate: any;
   isCompleted: Boolean;
   questions?: [];
   sponsors: Sponsor[];
}
