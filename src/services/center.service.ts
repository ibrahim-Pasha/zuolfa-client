import { Center } from "../models";
import { AxiosService } from "./axios.service";

const getAll = (): Promise<Center[]> => {
  let result$ = AxiosService.get<Center[]>(`Center/getall`);
  return result$;
};

const insert = (row: Center): Promise<Center> => {
  let result$ = AxiosService.post<Center>(`Center/insert`, row);
  return result$;
};

const modify = (key: string, row: Center): Promise<Center> => {
  let result$ = AxiosService.put<Center>(`Center/update/${key}`, row);
  return result$;
};

const remove = (key: string): Promise<Center> => {
  let result$ = AxiosService.remove<Center>(`Center/delete/${key}`);
  return result$;
};

export const CenterService = {
  getAll,
  insert,
  modify,
  remove,
};
