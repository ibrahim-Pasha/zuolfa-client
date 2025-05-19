import React, { useState } from "react";
import "./classroom.scss";
import {
  DataGrid,
  Column,
  type DataGridTypes,
  Editing,
} from "devextreme-react/data-grid";
import Button from "devextreme-react/cjs/button";
import { Student } from "../../models";
import { StudentService } from "../../services";
import { toast } from "react-toastify";

const ClassroomDetailTemplate = (
  props: DataGridTypes.MasterDetailTemplateData
) => {
  const [students] = useState<Student[]>(
    props.data.data.students != null ? props.data.data.students : []
  );
  const [inertedStudents, setInertedStudents] = useState<Student[]>([]);
  const onStudentInserted = (e) => {
    inertedStudents.push(e.data);
  };
  const onStudentsSave = () => {
    const classroomId = props.data.data.id;
    inertedStudents.forEach((l) => (l.classroomId = classroomId));
    StudentService.insertStudents(inertedStudents);
    toast.success("Action completed successfully");

    setInertedStudents([]);
  };
  const onStudentRemoved = (e) => {
    StudentService.remove(e.data.id);
    toast.success("Action completed successfully");
  };
  return (
    <React.Fragment>
      <div className="details">
        <div style={{ display: "flex" }}>
          Students
          <DataGrid
            dataSource={students}
            showBorders={true}
            columnAutoWidth={true}
            key={"id"}
            keyExpr={"id"}
            onRowInserted={onStudentInserted}
            onRowRemoving={onStudentRemoved}
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
            <Column dataField="fullName" caption="Full Name" />
          </DataGrid>
        </div>
        <div>
          <Button
            text="Save"
            onClick={onStudentsSave}
            style={{ float: "right", marginTop: "10px" }}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ClassroomDetailTemplate;
