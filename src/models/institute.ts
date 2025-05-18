import { Center } from "./center";
import { Lesson } from "./lesson";

export class Institute {
  id?: string;
  name: string;
  centers: Center[];
  lessons: Lesson[];
}
