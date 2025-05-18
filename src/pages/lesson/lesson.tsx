import React, { useEffect, useState } from "react";
import "./lesson.scss";
import DataGrid, {
  Column,
  Editing,
  Lookup,
  RequiredRule,
} from "devextreme-react/data-grid";
import { InstituteService, LessonService } from "../../services";
import { Institute, Lesson } from "../../models";

export default function () {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [institute, setInstitute] = useState<Institute[]>([]);

  useEffect(() => {
    const institutes$ = InstituteService.getAll();
    const lessons$ = LessonService.getAll();
    Promise.all([institutes$, lessons$]).then((results) => {
      setInstitute(results[0]);
      setLessons(results[1]);
    });
  }, []);
  const onLessonInserted = (e) => {
    LessonService.insert(e.data);
  };
  const onLessonUpdated = (e) => {
    LessonService.modify(e.data.id, e.data);
  };

  const onLessonRemoved = (e) => {
    LessonService.remove(e.data.id);
  };

  return (
    <React.Fragment>
      <h2 className={"content-block"}>lesson</h2>
      <div className={"content-block"}>
        <div className={"dx-card responsive-paddings"}>
          <div className={"logos-container"}>
            <DataGrid
              keyExpr="id"
              dataSource={lessons}
              showBorders={true}
              onRowInserted={onLessonInserted}
              onRowUpdated={onLessonUpdated}
              onRowRemoved={onLessonRemoved}
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
              <Column dataField={"title"} caption={"Title"}>
                {" "}
                <RequiredRule />
              </Column>
              <Column dataField="instituteId" caption="Institute">
                <RequiredRule />

                <Lookup
                  dataSource={institute}
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
