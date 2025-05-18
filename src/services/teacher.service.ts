import { Teacher } from "../models";
import { AxiosService } from "./axios.service";

const getAll = (): Promise<Teacher[]> => {
  let result$ = AxiosService.get<Teacher[]>(`Teacher/getall`);
  return result$;
};

const insert = (row: Teacher): Promise<Teacher> => {
  let result$ = AxiosService.post<Teacher>(`Teacher/insert`, row);
  return result$;
};

const modify = (key: string, row: Teacher): Promise<Teacher> => {
  let result$ = AxiosService.put<Teacher>(`Teacher/update/${key}`, row);
  return result$;
};

const remove = (key: string): Promise<Teacher> => {
  let result$ = AxiosService.remove<Teacher>(`Teacher/delete/${key}`);
  return result$;
};

export const TeacherService = {
  getAll,
  insert,
  modify,
  remove,
};
