import { Exercise } from "../models";
import { AxiosService } from "./axios.service";

const getAll = (): Promise<Exercise[]> => {
  let result$ = AxiosService.get<Exercise[]>(`Exercise/getall`);
  return result$;
};

const insert = (row: Exercise): Promise<Exercise> => {
  let result$ = AxiosService.post<Exercise>(`Exercise/insert`, row);
  return result$;
};

const modify = (key: string, row: Exercise): Promise<Exercise> => {
  let result$ = AxiosService.put<Exercise>(`Exercise/update/${key}`, row);
  return result$;
};

const remove = (key: string): Promise<Exercise> => {
  let result$ = AxiosService.remove<Exercise>(`Exercise/delete/${key}`);
  return result$;
};

const getArchived = (): Promise<Exercise[]> => {
  let result$ = AxiosService.get<Exercise[]>(`Exercise/getarchived`);
  return result$;
};

export const ExerciseService = {
  getAll,
  insert,
  modify,
  remove,
  getArchived,
};
