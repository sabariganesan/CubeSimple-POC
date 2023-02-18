import { DataGrid } from "@mui/x-data-grid";
import React from "react";

function ReportTable({ rowData }) {
  const columns = [
    { field: "id", headerName: "Report Number", width: 130 },
    { field: "state", headerName: "State", width: 130 },
    { field: "district", headerName: "District", width: 130 },
    { field: "active", headerName: "Active", width: 130 },
    { field: "confirmed", headerName: "Confirmed", width: 130 },
    { field: "deceased", headerName: "Deceased", width: 130 },
    { field: "recovered", headerName: "Recovered", width: 130 },
  ];
  return (
    <div style={{ height: 550, width: "100%" }}>
      <DataGrid
        rows={rowData}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
      />
    </div>
  );
}

export default ReportTable;
