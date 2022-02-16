/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext, useState } from "react";
import { CoreContext } from "../context/core-context";
import { Table, Pagination, Modal, Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { PencilSquare, Trash, Person } from "react-bootstrap-icons";
import { IconName } from "react-icons/bs";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import swal from 'sweetalert';

import Input from "./common/Input";
import * as React from "react";
import Switch from "@material-ui/core/Switch";
import moment from 'moment';

import {
  DataGrid,
  GridColDef,
  GridApi,
  GridCellValue,
} from "@material-ui/data-grid";

import Loader from "react-loader-spinner";
const Moment = require("moment");
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiDataGrid-columnHeaderCheckbox": {
      display: "block",
      pointerEvents: "none",
      disabled: "disabled",
    },
  },
}));

const BillingPatient = (props) => {
  const [rows,setrows]=useState(JSON.parse(localStorage.getItem("B_patient")));
  const columns = [
    {
      field: "name",
      headerName: "Patient Name",
      width: 220,
      type: "string",
      
    },
    
    {
      field: "bills",
      headerName: "Bills",
      type: "number",
      editable: false,
      width: 200,
    },
    {
      field: "timeLeft",
      headerName: "Time to Next Bill(mins)",
      type: "number",
      editable: false,
      width: 250,
    },
    

  ];
  const renderBills = () => {
    if (rows.length == 0) {
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
    
    if (
      rows.length>0
    ) {
      //coreContext.bloodpressureData  = coreContext.bloodpressureData.sort((a,b) => new Moment(b.sortDateColumn) - new Moment(a.sortDateColumn));
      return (
        <div style={{ height: 680, width: "100%" }}>
          {/* {coreContext.bloodglucoseData} */}
          <DataGrid
          
            rows={rows}
            columns={columns}
            pageSize={10}
            // sortingOrder={["desc", "asc"]}
            // sortModel={[{ field: "MeasurementDateTime", sort: "desc" }]}
          />
        </div>
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
    

  }

  return (
    <div className="card">
      <h4 className="card-header">BLOOD GLUCOSE INFORMATION</h4>
      <div className="card-body">{renderBills()}</div>
    </div>
  );
};

export { BillingPatient };
