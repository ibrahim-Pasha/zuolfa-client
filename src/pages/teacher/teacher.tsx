import React, { useEffect, useState } from "react";
import "./teacher.scss";
import DataGrid, { Column, Editing } from "devextreme-react/data-grid";
import { TeacherService } from "../../services";
import { Teacher } from "../../models";

export default function () {
  const [teachers, serTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    TeacherService.getAll().then((teachers: Teacher[]) => {
      serTeachers(teachers);
    });
  }, []);
  const onTeacherInserted = (e) => {
    TeacherService.insert(e.data);
  };
  const onTeacherUpdated = (e) => {
    TeacherService.modify(e.data.id, e.data);
  };

  const onTeacherRemoved = (e) => {
    TeacherService.remove(e.data.id);
  };

  return (
    <React.Fragment>
      <h2 className={"content-block"}>teacher</h2>
      <div className={"content-block"}>
        <div className={"dx-card responsive-paddings"}>
          <div className={"logos-container"}>
            <DataGrid
              keyExpr="id"
              dataSource={teachers}
              showBorders={true}
              onRowInserted={onTeacherInserted}
              onRowUpdated={onTeacherUpdated}
              onRowRemoved={onTeacherRemoved}
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
              <Column dataField={"fullName"} caption={"Full Name"}></Column>
            </DataGrid>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
