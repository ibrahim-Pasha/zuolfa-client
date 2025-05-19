import React, { useEffect, useState } from "react";
import "./student.scss";
import DataGrid, {
  Column,
  Editing,
  Lookup,
  RequiredRule,
} from "devextreme-react/data-grid";
import { ClassRoomService, StudentService } from "../../services";
import { ClassRoom, Student } from "../../models";
import { toast } from "react-toastify";

export default function () {
  const [students, setStudents] = useState<Student[]>([]);
  const [classroom, setClassroom] = useState<ClassRoom[]>([]);

  useEffect(() => {
    const students$ = StudentService.getAll();
    const classrooms$ = ClassRoomService.getAll();
    Promise.all([students$, classrooms$]).then((results) => {
      setStudents(results[0]);
      setClassroom(results[1]);
    });
  }, []);
  const onStudentInserted = (e) => {
    StudentService.insert(e.data);
    toast.success("Action completed successfully");
  };
  const onStudentUpdated = (e) => {
    StudentService.modify(e.data.id, e.data);
    toast.success("Action completed successfully");
  };

  const onStudentRemoved = (e) => {
    StudentService.remove(e.data.id);
    toast.success("Action completed successfully");
  };

  return (
    <React.Fragment>
      <h2 className={"content-block"}>student</h2>
      <div className={"content-block"}>
        <div className={"dx-card responsive-paddings"}>
          <div className={"logos-container"}>
            <DataGrid
              keyExpr="id"
              dataSource={students}
              showBorders={true}
              onRowInserted={onStudentInserted}
              onRowUpdated={onStudentUpdated}
              onRowRemoved={onStudentRemoved}
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
              <Column dataField={"fullName"} caption={"Full Name"}>
                {" "}
                <RequiredRule />
              </Column>
              <Column dataField="classroomId" caption="Class room">
                <RequiredRule />
                <Lookup
                  dataSource={classroom}
                  valueExpr="id"
                  displayExpr="name"
                />
              </Column>
            </DataGrid>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
