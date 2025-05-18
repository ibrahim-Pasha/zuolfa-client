import React, { useEffect, useState } from "react";
import "./classroom.scss";
import DataGrid, {
  Column,
  Editing,
  Lookup,
  MasterDetail,
  RequiredRule,
} from "devextreme-react/data-grid";
import {
  CenterService,
  ClassRoomService,
  TeacherService,
} from "../../services";
import { Center, ClassRoom, Teacher } from "../../models";
import ClassroomDetailTemplate from "./classroom-detail-template";

export default function () {
  const [classrooms, setClassRooms] = useState<ClassRoom[]>([]);
  const [center, setCenter] = useState<Center[]>([]);
  const [teacher, setTeacher] = useState<Teacher[]>([]);

  useEffect(() => {
    const classrooms$ = ClassRoomService.getAll();
    const centers$ = CenterService.getAll();
    const teachers$ = TeacherService.getAll();

    Promise.all([classrooms$, centers$, teachers$]).then((results) => {
      setClassRooms(results[0]);
      setCenter(results[1]);
      setTeacher(results[2]);
    });
  }, []);
  const onClassroomInserted = (e) => {
    ClassRoomService.insert(e.data);
  };
  const onClassroomUpdated = (e) => {
    ClassRoomService.modify(e.data.id, e.data);
  };

  const onClassroomRemoved = (e) => {
    ClassRoomService.remove(e.data.id);
  };

  return (
    <React.Fragment>
      <h2 className={"content-block"}>classroom</h2>
      <div className={"content-block"}>
        <div className={"dx-card responsive-paddings"}>
          <div className={"logos-container"}>
            <DataGrid
              keyExpr="id"
              dataSource={classrooms}
              showBorders={true}
              onRowInserted={onClassroomInserted}
              onRowUpdated={onClassroomUpdated}
              onRowRemoved={onClassroomRemoved}
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
              <Column dataField={"name"} caption={"Name"}>
                {" "}
                <RequiredRule />
              </Column>
              <Column dataField="centerId" caption="Center">
                <RequiredRule />

                <Lookup dataSource={center} valueExpr="id" displayExpr="name" />
              </Column>
              <RequiredRule />

              <Column dataField="teacherId" caption="Teacher">
                <Lookup
                  dataSource={teacher}
                  valueExpr="id"
                  displayExpr="fullName"
                />
              </Column>
              <MasterDetail
                enabled={true}
                component={ClassroomDetailTemplate}
              />
            </DataGrid>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
