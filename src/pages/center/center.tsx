import React, { useEffect, useState } from "react";
import "./center.scss";
import DataGrid, {
  Column,
  Editing,
  Lookup,
  RequiredRule,
} from "devextreme-react/data-grid";
import { CenterService, InstituteService } from "../../services";
import { Center, Institute } from "../../models";

export default function () {
  const [centers, setCenters] = useState<Center[]>([]);
  const [institute, setInstitute] = useState<Institute[]>([]);
  useEffect(() => {
    const institutes$ = InstituteService.getAll();
    const centers$ = CenterService.getAll();
    Promise.all([institutes$, centers$]).then((results) => {
      setInstitute(results[0]);
      setCenters(results[1]);
    });
  }, []);
  const onCenterInserted = (e) => {
    CenterService.insert(e.data);
  };
  const onCenterUpdated = (e) => {
    CenterService.modify(e.data.id, e.data);
  };

  const onCenterRemoved = (e) => {
    CenterService.remove(e.data.id);
  };

  return (
    <React.Fragment>
      <h2 className={"content-block"}>center</h2>
      <div className={"content-block"}>
        <div className={"dx-card responsive-paddings"}>
          <div className={"logos-container"}>
            <DataGrid
              keyExpr="id"
              dataSource={centers}
              showBorders={true}
              onRowInserted={onCenterInserted}
              onRowUpdated={onCenterUpdated}
              onRowRemoved={onCenterRemoved}
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
              >
                <RequiredRule />
              </Column>
              <Column dataField={"name"} caption={"Name"}>
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
