import { ExerciseQuestion } from "./exerciseQuestion";

export class Exercise {
  id: string;
  title: string;
  lessonId: string;
  questions?: ExerciseQuestion[];
  isArchived: boolean;
}
