import { ClassRoom } from "../models";
import { AxiosService } from "./axios.service";

const getAll = (): Promise<ClassRoom[]> => {
  let result$ = AxiosService.get<ClassRoom[]>(`ClassRoom/getall`);
  return result$;
};

const insert = (row: ClassRoom): Promise<ClassRoom> => {
  let result$ = AxiosService.post<ClassRoom>(`ClassRoom/insert`, row);
  return result$;
};

const modify = (key: string, row: ClassRoom): Promise<ClassRoom> => {
  let result$ = AxiosService.put<ClassRoom>(`ClassRoom/update/${key}`, row);
  return result$;
};

const remove = (key: string): Promise<ClassRoom> => {
  let result$ = AxiosService.remove<ClassRoom>(`ClassRoom/delete/${key}`);
  return result$;
};

export const ClassRoomService = {
  getAll,
  insert,
  modify,
  remove,
};
