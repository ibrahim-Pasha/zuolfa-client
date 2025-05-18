import { ExerciseQuestion } from "../models";
import { AxiosService } from "./axios.service";

const getAll = (): Promise<ExerciseQuestion[]> => {
  let result$ = AxiosService.get<ExerciseQuestion[]>(`ExerciseQuestion/getall`);
  return result$;
};

const insert = (row: ExerciseQuestion): Promise<ExerciseQuestion> => {
  let result$ = AxiosService.post<ExerciseQuestion>(
    `ExerciseQuestion/insert`,
    row
  );
  return result$;
};

const insertExerciseQuestions = (
  row: ExerciseQuestion[]
): Promise<ExerciseQuestion[]> => {
  let result$ = AxiosService.post<ExerciseQuestion[]>(
    `ExerciseQuestion/insert/exercisequestions`,
    row
  );
  return result$;
};

const modify = (
  key: string,
  row: ExerciseQuestion
): Promise<ExerciseQuestion> => {
  let result$ = AxiosService.put<ExerciseQuestion>(
    `ExerciseQuestion/update/${key}`,
    row
  );
  return result$;
};

const remove = (key: string): Promise<ExerciseQuestion> => {
  let result$ = AxiosService.remove<ExerciseQuestion>(
    `ExerciseQuestion/delete/${key}`
  );
  return result$;
};
const getArchived = (): Promise<ExerciseQuestion[]> => {
  let result$ = AxiosService.get<ExerciseQuestion[]>(
    `ExerciseQuestion/getarchived`
  );
  return result$;
};

export const ExerciseQuestionService = {
  getAll,
  insert,
  modify,
  remove,
  insertExerciseQuestions,
  getArchived,
};
