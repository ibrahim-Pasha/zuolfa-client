import React, { useEffect, useState } from "react";
import "./institute.scss";
import DataGrid, {
  Column,
  Editing,
  MasterDetail,
  RequiredRule,
} from "devextreme-react/data-grid";
import { InstituteService } from "../../services";
import { Institute } from "../../models";
import DetailTemplate from "./institute-detail-template";
import { toast } from "react-toastify";

export default function () {
  const [institutes, setInstitutes] = useState<Institute[]>([]);

  useEffect(() => {
    InstituteService.getAll().then((institutes: Institute[]) => {
      setInstitutes(institutes);
    });
  }, []);
  const onInstituteUpdated = (e) => {
    InstituteService.modify(e.data.id, e.data);
    toast.success("Action completed successfully");
  };

  const onInstituteRemoved = (e) => {
    InstituteService.remove(e.data.id);
    toast.success("Action completed successfully");
  };

  return (
    <React.Fragment>
      <h2 className={"content-block"}>institute</h2>
      <div className={"content-block"}>
        <div className={"dx-card responsive-paddings"}>
          <div className={"logos-container"}>
            <DataGrid
              keyExpr="id"
              dataSource={institutes as Institute[]}
              showBorders={true}
              onRowUpdated={onInstituteUpdated}
              onRowRemoved={onInstituteRemoved}
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
              <Column dataField="name" caption="Name">
                {" "}
                <RequiredRule />
              </Column>
              <MasterDetail enabled={true} component={DetailTemplate} />
            </DataGrid>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
