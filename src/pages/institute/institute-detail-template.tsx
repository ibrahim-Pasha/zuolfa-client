import React, { useEffect, useState } from "react";
import "./institute.scss";
import {
  DataGrid,
  Column,
  type DataGridTypes,
  Editing,
  RequiredRule,
} from "devextreme-react/data-grid";
import Button from "devextreme-react/cjs/button";
import { Center, Institute, Lesson } from "../../models";
import { InstituteService } from "../../services";
import { toast } from "react-toastify";

const DetailTemplate = (props: DataGridTypes.MasterDetailTemplateData) => {
  props.data.data;
  const [lessons] = useState<Lesson[]>(
    props.data.data.lessons != null ? props.data.data.lessons : []
  );
  const [centers] = useState<Center[]>(
    props.data.data.centers != null ? props.data.data.centers : []
  );
  const instituteId = props.data.data.id;

  const [insertedInstitute] = useState<Institute>({
    name: "",
    centers: [],
    lessons: [],
  });

  const onInstituteSave = () => {
    if (lessons && centers && lessons.length > 4 && centers.length > 0) {
      props.data.data.name;
      insertedInstitute.name = props.data.data.name;
      insertedInstitute.centers = centers;
      insertedInstitute.lessons = lessons;
      InstituteService.insert(insertedInstitute);
    } else {
      toast.error("Total Count Of Lessons must be more than 4.");
    }
  };

  const onLessonNewRow = (e) => {
    e.data.instituteId = instituteId;
  };

  centers;
  const [isSaveActive, setIsSaveActive] = useState(false);

  useEffect(() => {
    const checkInstituteExists = async () => {
      const institute = await InstituteService.getById(instituteId);
      setIsSaveActive(institute !== "");
      typeof institute;
      institute !== null && institute !== undefined;
    };

    checkInstituteExists();
  }, [instituteId]);
  return (
    <React.Fragment>
      <div className="details">
        <div className="grids">
          <div className="lessons">
            Lessons
            <DataGrid
              dataSource={lessons ?? lessons}
              showBorders={true}
              columnAutoWidth={true}
              key={"id"}
              keyExpr={"id"}
              onInitNewRow={onLessonNewRow}
            >
              <Editing
                mode="cell"
                allowUpdating={!isSaveActive}
                allowDeleting={!isSaveActive}
                allowAdding={!isSaveActive}
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
              <Column dataField="title" caption="Title" />
              <Column
                dataField="instituteId"
                visible={false}
                allowEditing={false}
              ></Column>
            </DataGrid>
          </div>
          <div className="centers">
            Centers
            <DataGrid
              keyExpr="id"
              dataSource={centers ?? centers}
              showBorders={true}
              onInitNewRow={onLessonNewRow}
            >
              <Editing
                mode="cell"
                allowUpdating={!isSaveActive}
                allowDeleting={!isSaveActive}
                allowAdding={!isSaveActive}
              />

              <Column
                dataField={"id"}
                visible={false}
                formItem={{ visible: false }}
              ></Column>
              <Column dataField={"name"} caption={"Name"}>
                <RequiredRule />
              </Column>
              <Column
                dataField="instituteId"
                visible={false}
                allowEditing={false}
              ></Column>
            </DataGrid>
          </div>
        </div>
        <Button
          disabled={isSaveActive}
          text="Save"
          onClick={onInstituteSave}
          style={{ float: "right", marginTop: "10px" }}
        />
      </div>
    </React.Fragment>
  );
};

export default DetailTemplate;
