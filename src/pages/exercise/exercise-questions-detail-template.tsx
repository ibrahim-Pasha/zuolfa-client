import React, { useState } from "react";
import "./exercise.scss";
import {
  DataGrid,
  Column,
  type DataGridTypes,
  Editing,
  Button as Btn,
} from "devextreme-react/data-grid";
import Button from "devextreme-react/cjs/button";
import { ExerciseQuestion } from "../../models";
import { ExerciseQuestionService } from "../../services";

const ExerciseQuestionsDetailTemplate = (
  props: DataGridTypes.MasterDetailTemplateData
) => {
  const [insertedQuestions, setInsertedQuestions] = useState<
    ExerciseQuestion[]
  >([]);
  const [exercisequestions, setExercisequestions] = useState<
    ExerciseQuestion[]
  >(props.data.data.questions ?? []);
  const onExerciseQuestionInserted = (e) => {
    insertedQuestions.push(e.data);
  };
  const onExerciseQuestionsSave = () => {
    const exerciseId = props.data.data.id;
    insertedQuestions.forEach((l) => (l.exerciseId = exerciseId));
    ExerciseQuestionService.insertExerciseQuestions(insertedQuestions);
    setInsertedQuestions([]);
  };
  const onExerciseQuestionRemoved = (e) => {
    ExerciseQuestionService.remove(e.data.id);
  };
  const onExerciseQuestionUpdated = (e) => {
    ExerciseQuestionService.modify(e.data.id, e.data);
  };
  const archiveButtonClick = async (e) => {
    const exerciseId = e.row.data.id;
    const clickedExercise = exercisequestions.find(
      (exercise) => exercise.id === exerciseId
    );
    clickedExercise.isArchived = true;
    await ExerciseQuestionService.modify(clickedExercise.id, clickedExercise);
    const updatedExercises = exercisequestions.filter(
      (ex) => ex.id !== exerciseId
    );
    setExercisequestions(updatedExercises);
    e.row.data;
  };
  return (
    <React.Fragment>
      <div className="details">
        <div style={{ display: "flex" }}>
          Exercise Questions
          <DataGrid
            dataSource={exercisequestions}
            showBorders={true}
            columnAutoWidth={true}
            key={"id"}
            keyExpr={"id"}
            onRowInserted={onExerciseQuestionInserted}
            onRowRemoving={onExerciseQuestionRemoved}
            onRowUpdated={onExerciseQuestionUpdated}
          >
            <Editing
              mode="popup"
              allowUpdating={true}
              allowDeleting={true}
              allowAdding={true}
              popup={{
                title: "Institute Editor",
                showTitle: true,
                width: 700,
                height: 500,
              }}
            />
            <Column
              dataField="id"
              visible={false}
              formItem={{ visible: false }}
            />
            <Column dataField="questionText" caption="Question Text" />
            <Column type="buttons">
              <Btn name="edit" />
              <Btn name="delete" />
              <Btn
                hint="Archive"
                icon="movetofolder"
                visible={true}
                onClick={archiveButtonClick}
              />{" "}
            </Column>
          </DataGrid>
        </div>
        <div>
          <Button
            text="Save"
            onClick={onExerciseQuestionsSave}
            style={{ float: "right", marginTop: "10px" }}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ExerciseQuestionsDetailTemplate;
