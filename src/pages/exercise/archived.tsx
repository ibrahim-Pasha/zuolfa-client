import React, { useEffect, useState } from "react";
import "./exercise.scss";
import { Exercise, ExerciseQuestion, Lesson } from "../../models";
import {
  ExerciseQuestionService,
  ExerciseService,
  LessonService,
} from "../../services";
import {
  DataGrid,
  Column,
  Editing,
  Lookup,
  Button,
} from "devextreme-react/data-grid";

export default function () {
  const [archivedExercises, setArchivedExercises] = useState<Exercise[]>([]);
  const [archivedQuestions, setArchivedQuestions] = useState<
    ExerciseQuestion[]
  >([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const onExerciseRemoved = (e) => {
    ExerciseService.remove(e.data.id);
  };

  const unarchiveExerciseButtonClick = async (e) => {
    const exerciseId = e.row.data.id;
    const clickedExercise = archivedExercises.find(
      (exercise) => exercise.id === exerciseId
    );
    clickedExercise.isArchived = false;
    await ExerciseService.modify(clickedExercise.id, clickedExercise);
    const updatedExercises = archivedExercises.filter(
      (ex) => ex.id !== exerciseId
    );
    setArchivedExercises(updatedExercises);
    e.row.data;
  };
  const unarchiveQuestionButtonClick = async (e) => {
    const exerciseId = e.row.data.id;
    const clickedExercise = archivedQuestions.find(
      (exercise) => exercise.id === exerciseId
    );
    clickedExercise.isArchived = false;
    await ExerciseQuestionService.modify(clickedExercise.id, clickedExercise);
    const updatedExercises = archivedQuestions.filter(
      (ex) => ex.id !== exerciseId
    );
    setArchivedQuestions(updatedExercises);
  };
  useEffect(() => {
    const archivedExercises$ = ExerciseService.getArchived();
    const archivedQuestions$ = ExerciseQuestionService.getArchived();
    const lessons$ = LessonService.getAll();
    Promise.all([archivedExercises$, archivedQuestions$, lessons$]).then(
      (results) => {
        setArchivedExercises(results[0]);
        setArchivedQuestions(results[1]);
        setLessons(results[2]);
      }
    );
  }, []);
  return (
    <React.Fragment>
      <h2 className={"content-block"}>Archive</h2>
      <div className={"content-block"}>
        <div className={"dx-card responsive-paddings"}>
          <div className={"logos-container"}>
            <div className="archive">
              <div>
                <h4 style={{ textAlign: "center" }}>Archived Exercises</h4>

                <DataGrid
                  keyExpr="id"
                  dataSource={archivedExercises}
                  showBorders={true}
                  onRowRemoved={onExerciseRemoved}
                >
                  <Editing mode="form" allowDeleting={true} />

                  <Column
                    dataField={"id"}
                    visible={false}
                    formItem={{ visible: false }}
                  ></Column>
                  <Column dataField={"title"} caption={"title"}></Column>
                  <Column dataField="lessonId" caption="Lesson">
                    <Lookup
                      dataSource={lessons}
                      valueExpr="id"
                      displayExpr="title"
                    />
                  </Column>
                  <Column type="buttons">
                    <Button name="delete" />
                    <Button
                      hint="UnArchive"
                      icon="movetofolder"
                      visible={true}
                      onClick={unarchiveExerciseButtonClick}
                    />{" "}
                  </Column>
                </DataGrid>
              </div>
              <div className="archivedQuestions">
                <h4 style={{ textAlign: "center" }}>Archived Questions</h4>
                <DataGrid
                  keyExpr="id"
                  dataSource={archivedQuestions}
                  showBorders={true}
                  onRowRemoved={onExerciseRemoved}
                >
                  <Editing mode="form" allowDeleting={true} />

                  <Column
                    dataField={"id"}
                    visible={false}
                    formItem={{ visible: false }}
                  ></Column>
                  <Column dataField="questionText" caption="Question Text" />
                  <Column type="buttons">
                    <Button name="delete" />
                    <Button
                      hint="UnArchive"
                      icon="movetofolder"
                      visible={true}
                      onClick={unarchiveQuestionButtonClick}
                    />{" "}
                  </Column>
                </DataGrid>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
