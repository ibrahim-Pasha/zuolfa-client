import React, { useEffect, useState } from "react";
import "./exercise.scss";
import DataGrid, {
  Button,
  Column,
  Editing,
  Lookup,
  MasterDetail,
} from "devextreme-react/data-grid";
import { ExerciseService, LessonService } from "../../services";
import { Exercise, Lesson } from "../../models";
import ExerciseQuestionsDetailTemplate from "./exercise-questions-detail-template";
import { toast } from "react-toastify";

export default function () {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    const exercises$ = ExerciseService.getAll();
    const lessons$ = LessonService.getAll();
    Promise.all([exercises$, lessons$]).then((results) => {
      setExercises(results[0]);
      setLessons(results[1]);
    });
  }, []);
  const onExerciseInserted = (e) => {
    ExerciseService.insert(e.data);
    toast.success("Action completed successfully");
  };
  const onExerciseUpdated = (e) => {
    ExerciseService.modify(e.data.id, e.data);
    toast.success("Action completed successfully");
  };

  const onExerciseRemoved = (e) => {
    ExerciseService.remove(e.data.id);
    toast.success("Action completed successfully");
  };
  const archiveButtonClick = async (e) => {
    const exerciseId = e.row.data.id;
    const clickedExercise = exercises.find(
      (exercise) => exercise.id === exerciseId
    );
    clickedExercise.isArchived = true;
    await ExerciseService.modify(clickedExercise.id, clickedExercise);
    const updatedExercises = exercises.filter((ex) => ex.id !== exerciseId);
    setExercises(updatedExercises);
    toast.success("Action completed successfully");
  };
  return (
    <React.Fragment>
      <h2 className={"content-block"}>exercise</h2>
      <div className={"content-block"}>
        <div className={"dx-card responsive-paddings"}>
          <div className={"logos-container"}>
            <DataGrid
              keyExpr="id"
              dataSource={exercises}
              showBorders={true}
              onRowInserted={onExerciseInserted}
              onRowUpdated={onExerciseUpdated}
              onRowRemoved={onExerciseRemoved}
            >
              <Editing
                mode="form"
                allowUpdating={true}
                allowDeleting={true}
                allowAdding={true}
              />

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
                <Button name="edit" />
                <Button name="delete" />
                <Button
                  hint="Archive"
                  icon="movetofolder"
                  visible={true}
                  onClick={archiveButtonClick}
                />{" "}
              </Column>
              <MasterDetail
                enabled={true}
                component={ExerciseQuestionsDetailTemplate}
              />
            </DataGrid>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
