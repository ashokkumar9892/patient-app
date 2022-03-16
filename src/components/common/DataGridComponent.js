import React from 'react'
import {
    DataGrid,
    GridColDef,
    GridApi,
    GridCellValue,
  } from "@material-ui/data-grid";
  import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiDataGrid-columnHeaderCheckbox": {
        display: "block",
        pointerEvents: "none",
        disabled: "disabled",
      },
      "& .MuiDataGrid-columnHeaderWrapper":{
          backgroundColor:"#0c71c3",
          color:"white",
          lineHeight:"unset !important",
          maxHeight:"none !important",
          whiteSpace:"normal",
          minWidth:"normal"
      
      },
      "& .MuiDataGrid-cell":{
          border: "0.3px solid grey",
          lineHeight:"unset !important",
          maxHeight:"none !important",
          whiteSpace:"normal"
      },
      "& .MuiDataGrid-row.Mui-odd": {
        backgroundColor: "#f0f0f0"
      },
      "& .MuiDataGrid-columnHeaderTitle": {
        overflow: "visible",
        lineHeight: "1.43rem",
        whiteSpace: "normal",
      }
     
    },
  }));

const DataGridComponent = (props) => {
    const {rows,columns,sortModal}=props;
    const classes = useStyles();
  return (
    


<div class="table-responsive-sm mb-0">
<div style={{ height: 680, width: "100%" }}>
        <DataGrid
              className={classes.root}
              rows={rows}
              columns={columns}
              pageSize={10}
              sortModel={sortModal}
              //             checkboxSelection

              // onSelectionModelChange={(selection) => {
              //   const newSelectionModel = selection.selectionModel;

              //   if (newSelectionModel.length > 1) {
              //     const selectionSet = new Set(selectionModel);
              //     const result = newSelectionModel.filter(
              //       (s) => !selectionSet.has(s)
              //     );

              //     setSelectionModel(result);
              //   } else {
              //     setSelectionModel(newSelectionModel);
              //   }
              // }}
              // selectionModel={selectionModel}
            />
            </div>
    </div>  )
}

export default DataGridComponent