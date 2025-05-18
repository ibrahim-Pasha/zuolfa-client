import { ClassRoom } from "./classroom";

export class Center {
  id: string;
  name: string;
  instituteId: string;
  classRooms?: ClassRoom[];
}
