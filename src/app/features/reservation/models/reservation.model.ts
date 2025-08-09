import { Region } from "./region.model";
import { Timeslot } from "./timeslot.model";

export interface Reservation {
  date: Date;
  timeslot: Timeslot;
  partySize: number;
  region: Region;
  childrenAllowed: boolean;
  smokingAllowed: boolean;
  name: string;
  email: string;
  phone: string;
}
