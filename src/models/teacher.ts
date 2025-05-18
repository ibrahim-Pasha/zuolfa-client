import { ClassRoom } from "./classroom";

export class Teacher {
  id: string;
  fullName: string;
  classRooms?: ClassRoom[];
}
