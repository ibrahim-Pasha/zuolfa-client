import { Lesson } from "../models";
import { AxiosService } from "./axios.service";

const getAll = (): Promise<Lesson[]> => {
  let result$ = AxiosService.get<Lesson[]>(`Lesson/getall`);
  return result$;
};

const insert = (row: Lesson): Promise<Lesson> => {
  let result$ = AxiosService.post<Lesson>(`Lesson/insert`, row);
  return result$;
};

const insertLessons = (row: Lesson[]): Promise<Lesson[]> => {
  let result$ = AxiosService.post<Lesson[]>(`Lesson/insert/lessons`, row);
  return result$;
};

const modify = (key: string, row: Lesson): Promise<Lesson> => {
  let result$ = AxiosService.put<Lesson>(`Lesson/update/${key}`, row);
  return result$;
};

const remove = (key: string): Promise<Lesson> => {
  let result$ = AxiosService.remove<Lesson>(`Lesson/delete/${key}`);
  return result$;
};

export const LessonService = {
  getAll,
  insert,
  modify,
  remove,
  insertLessons,
};
