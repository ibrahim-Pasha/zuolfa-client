import { Student } from "./student";

export class ClassRoom {
  id: string;
  name: string;
  centerId: string;
  teacherId: string;
  students?: Student[];
}
