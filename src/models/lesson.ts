import { Exercise } from "./exercise";

export class Lesson {
  id: string;
  title: string;
  instituteId: string;
  exercises?: Exercise[];
}
