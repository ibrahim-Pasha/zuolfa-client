import { Institute } from "../models";
import { AxiosService } from "./axios.service";

const getAll = (): Promise<Institute[]> => {
  let result$ = AxiosService.get<Institute[]>(`Institute/getall`);
  return result$;
};

const getById = (key: string): Promise<Institute | string> => {
  let result$ = AxiosService.get<Institute | string>(`Institute/getby/${key}`);
  return result$;
};

const insert = (row: Institute): Promise<Institute> => {
  let result$ = AxiosService.post<Institute>(`Institute/insert`, row);
  return result$;
};

const modify = (key: string, row: Institute): Promise<Institute> => {
  let result$ = AxiosService.put<Institute>(`Institute/update/${key}`, row);
  return result$;
};

const remove = (key: string): Promise<Institute> => {
  let result$ = AxiosService.remove<Institute>(`Institute/delete/${key}`);
  return result$;
};

export const InstituteService = {
  getAll,
  insert,
  modify,
  remove,
  getById,
};
