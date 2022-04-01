import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import React, { useState, useContext, useEffect } from "react";
import { CoreContext } from "../context/core-context";
import { DataGrid } from "@material-ui/data-grid";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import Loader from "react-loader-spinner";
import IconButton from "@material-ui/core/IconButton";

import ClearIcon from "@material-ui/icons/Clear";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/styles";
import { createTheme } from "@material-ui/core/styles";
import DataGridComponent from "./common/DataGridComponent";
const defaultTheme = createTheme();
const useStyles = makeStyles(
  (theme) => ({
    root: {
      padding: theme.spacing(0.5, 0.5, 0),
      justifyContent: "space-between",
      display: "flex",
      alignItems: "flex-start",
      flexWrap: "wrap",
    },
    textField: {
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
      margin: theme.spacing(1, 0.5, 1.5),
      "& .MuiSvgIcon-root": {
        marginRight: theme.spacing(0.5),
      },
      "& .MuiInput-underline:before": {
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
    },
  }),
  { defaultTheme }
);

const Moment = require("moment");
function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
function QuickSearchToolbar(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search…"
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? "visible" : "hidden" }}
              onClick={props.clearSearch}>
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
      />
    </div>
  );
}
QuickSearchToolbar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

const BloodPressure = (props) => {
  const coreContext = useContext(CoreContext);
  const [patientId, setPatientId] = useState("");
  const [userType, setUserType] = useState("");
  const [disablelink, setdisablelink] = useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [rows, setRows] = React.useState(coreContext.bloodpressureData);
  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = coreContext.bloodpressureData.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setRows(filteredRows);
  };

  React.useEffect(() => {
    setRows(coreContext.bloodpressureData);
  }, [coreContext.bloodpressureData]);

  const fetchBloodPressure = () => {
    let userType = localStorage.getItem("userType");
    let patientId = localStorage.getItem("userId");
    setdisablelink(false);
    // check page if left side menu.
    if (window.location.href.substring("bloodpressure") > 0) {
    }
    if (window.location.href.indexOf("patient-summary") > 0) {
      patientId = localStorage.getItem("ehrId");
      userType = "patient";
      // clear this otherwise will be problem
      localStorage.removeItem("ehrId");
      setdisablelink(true);
    }
    setUserType(userType);

    coreContext.fetchBloodPressure(patientId, userType);
  };

  useEffect(fetchBloodPressure, [coreContext.bloodpressureData.length]);

  const columns = [
    {
      field: "UserName",
      headerName: "Patient Name",
      width: 200,
      type: "string",
      headerAlign: 'left',
      renderCell: (params) => (
        <a
          disable={disablelink}
          href={`/patient-summary/${btoa(params.row.userId)}`}>
          {" "}
          {params.row.UserName}{" "}
        </a>
      ),
    },
    {
      field: "systolic",
      headerName: "Systolic",
      type: "number",
      headerAlign: 'left',
      editable: false,
      width: 150,
    },
    {
      field: "diastolic",
      headerName: "Diastolic",
      type: "number",
      editable: false,
      headerAlign: 'left',
      width: 150,
    },

    {
      field: "Pulse",
      headerName: "Pulse",
      headerAlign: 'left',
      type: "number",
      editable: false,
      width: 150,
    },

    {
      field: "MeasurementDateTime",
      headerName: "Date Recorded",
      editable: false,
      type: "dateTime",
      headerAlign: 'left',
      width: 150,
      valueFormatter: (params) => {
        const valueFormatted = Moment(params.value).format(
          "MM-DD-YYYY hh:mm A"
        );
        return `${valueFormatted}`;
      },
    },
    {
      field: "CreatedDate",
      headerName: "Date Received",
      width: 150,
      editable: false,
      headerAlign: 'left',
      type: "dateTime",

      valueFormatter: (params) => {
        const valueFormatted = Moment(params.value).format(
          "MM-DD-YYYY hh:mm A"
        );
        return `${valueFormatted}`;
      },
    },

    {
      field: "DeviceId",
      headerName: "Device Id",
      width: 150,
      editable: false,
    },
    {
      field: "readingId",
      headerName: "Reading Id",
      width: 150,
      editable: false,
    },
    // {
    //   field: "sortDateColumn",
    //   headerName: "Action",
    //   width: 300,

    //   renderCell: (params) => (
    //     <div>
    //       {" "}
    //       <a href="#" onClick={() => showEditForm(params.row)}>
    //         {" "}
    //         <PencilSquare />
    //       </a>
    //       <a href="#" onClick={() => deletePatient(params.row)}>
    //         {" "}
    //         <Trash />
    //       </a>
    //     </div>
    //   ),
    // },
  ];

  const showEditForm = (patient) => {};
  const deletePatient = (patient) => {};

  const patientcolumns = [
    {
      field: "systolic",
      headerName: "Systolic",
      type: "number",
      editable: false,
      headerAlign: 'left',
      width: 150,
    },
    {
      field: "diastolic",
      headerName: "Diastolic",
      type: "number",
      editable: false,
      width: 150,
      headerAlign: 'left',
    },

    {
      field: "Signalstrength",
      headerName: "Signal Strength",
      type: "number",
      editable: false,
      headerAlign: 'left',
      width: 150,  
          headerAlign: 'left',
    },

    {
      field: "Pulse",
      headerName: "Pulse",
      type: "number",
      editable: false,
      width: 150,
      headerAlign: 'left',
    },
    {
      field: "MeasurementDateTime",
      headerName: "Date Recorded",
      editable: false,
      type: "date",
      width: 150,
      headerAlign: 'left',
      valueFormatter: (params) => {
        const valueFormatted = Moment(params.value).format(
          "MM-DD-YYYY hh:mm A"
        );
        return `${valueFormatted}`;
      },
    },
    {
      field: "CreatedDate",
      headerName: "Date Received",
      width: 150,
      editable: false,
      type: "dateTime",
      headerAlign: 'left',

      valueFormatter: (params) => {
        const valueFormatted = Moment(params.value).format(
          "MM-DD-YYYY hh:mm A"
        );
        return `${valueFormatted}`;
      },
    },

    {
      field: "DeviceId",
      headerName: "Device Id",
      width: 150,
      editable: false,
      headerAlign: 'left',
    },
    {
      field: "readingId",
      headerName: "Reading Id",
      width: 150,
      editable: false,
      headerAlign: 'left',
    },
    {
      field: "sortDateColumn",
      headerName: "Action",
      headerAlign: 'left',
    },
  ];

  const renderBloodPressure = () => {
    if (coreContext.bloodpressureData.length == 0) {
      return (
        <div
          style={{
            height: 680,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
            alignItems: "center",
          }}>
          <Loader type="Circles" color="#00BFFF" height={100} width={100} />
        </div>
      );
    }
    let dgcolumns = columns;
    if (userType === "patient") {
      dgcolumns = patientcolumns;
    }

    if (
      coreContext.bloodpressureData.length > 0 &&
      coreContext.bloodpressureData[0].UserName !== undefined
    ) {
      //coreContext.bloodpressureData  = coreContext.bloodpressureData.sort((a,b) => new Moment(b.sortDateColumn) - new Moment(a.sortDateColumn));
      console.log("coreContext.bloodpressureData",coreContext.bloodpressureData)
      return (
        // <div style={{ height: 680, width: "100%" }}>
        //   <DataGrid
        //     components={{ Toolbar: QuickSearchToolbar }}
        //     rows={rows}
        //     columns={dgcolumns}
        //     pageSize={10}
        //     sortModel={[{ field: "MeasurementDateTime", sort: "desc" }]}
        //     sortingOrder={["desc", "asc"]}
        //     componentsProps={{
        //       toolbar: {
        //         value: searchText,
        //         onChange: (event) => requestSearch(event.target.value),
        //         clearSearch: () => requestSearch(""),
        //       },
        //     }}
        //   />
        // </div>
        <DataGridComponent rows={rows} columns={dgcolumns} sortModal={[{ field: "MeasurementDateTime", sort: "desc" }]}/>
      );
    } else {
      return (
        <div
          style={{
            height: 60,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
            alignItems: "center",
          }}>
          <h1>No data Found</h1>
        </div>
      );
    }
  };

  return (
    <div className="col">
    <div className="page-title-container mb-3">
    <div className="row">
    <div className="col mb-2">
    <h1 className="mb-2 pb-0 display-4" id="title">Blood Pressure's Information
    </h1>
    </div>
    </div>
    </div>
    
    <div className="row">
    <div className="col-xl-12">
   
    <div className="card mb-3">	
    
    <div className="card-body">
    <div className="row">
    <div className="col-xl-12">
    <div className="table-responsive-sm mb-0">
      {renderBloodPressure()}
    
    </div>
      
    
      
    </div>
      
    
    
    
    </div>
    
    </div>
      </div>
    </div>
    </div>
      </div>
  );
};

export { BloodPressure };
