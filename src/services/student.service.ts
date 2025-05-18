import { Student } from "../models";
import { AxiosService } from "./axios.service";

const getAll = (): Promise<Student[]> => {
  let result$ = AxiosService.get<Student[]>(`Student/getall`);
  return result$;
};

const insert = (row: Student): Promise<Student> => {
  let result$ = AxiosService.post<Student>(`Student/insert`, row);
  return result$;
};

const insertStudents = (row: Student[]): Promise<Student[]> => {
  let result$ = AxiosService.post<Student[]>(`Student/insert/students`, row);
  return result$;
};

const modify = (key: string, row: Student): Promise<Student> => {
  let result$ = AxiosService.put<Student>(`Student/update/${key}`, row);
  return result$;
};

const remove = (key: string): Promise<Student> => {
  let result$ = AxiosService.remove<Student>(`Student/delete/${key}`);
  return result$;
};

export const StudentService = {
  getAll,
  insert,
  modify,
  remove,
  insertStudents,
};
