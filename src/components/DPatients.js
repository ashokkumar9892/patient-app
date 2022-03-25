/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from "react";
import { CoreContext } from "../context/core-context";
import { Table, Pagination, Modal, Button, Form } from "react-bootstrap";
import { PencilSquare, Trash, Person } from "react-bootstrap-icons";
import { IconName } from "react-icons/bs";
import { useForm } from "react-hook-form";
import Input from "./common/Input";
import DataGridComponent from "./common/DataGridComponent";
import {
  DataGrid,
  GridColDef,
  GridApi,
  GridCellValue,
} from "@material-ui/data-grid";

import Loader from "react-loader-spinner";

const DPatients = (props) => {
  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  const [name, setName] = useState("");
  const [patientId, setPatientId] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [height, setHeight] = useState("");
  const [provider, setProvider] = useState("");
  const [coach, setCoach] = useState("");
  const [coordinator, setCoordinator] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [actionPatients, setActionPatients] = useState([]);
  const [rows,setRows]=useState([]);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const handleAssignDrModalClose = () => setAssignDrShowModal(false);
  const handleAssignDrModalShow = () => setAssignDrShowModal(true);
  const [showAssignDrModal, setAssignDrShowModal] = useState(false);

  const editPatient = () => {};
  const coreContext = useContext(CoreContext);

  const fetchPatients = () => {
    const email = localStorage.getItem("app_userEmail");
    coreContext.userDetails(email);
    const userType = localStorage.getItem("userType");
    const userId = localStorage.getItem("userId");
    console.log("sahil", coreContext.dpatient);

    if (coreContext.dpatient.length > 0) {
      coreContext.patients = coreContext.dpatient;
    } else {
      coreContext.fetchPatientListfromApi(userType, userId);
    }
  };

  const fetchProviders = () => {
    coreContext.fetchProviders();
  };

  useEffect(fetchProviders, []);

  const fetchCareCoordinator = () => {
    coreContext.fetchCareCoordinator();
  };

  useEffect(fetchCareCoordinator, []);
  useEffect(fetchPatients, [coreContext.patients.length]);

  const fetchCoach = () => {
    coreContext.fetchCoach();
  };

  useEffect(fetchCoach, []);

  useEffect(coreContext.checkLocalAuth, []);
  useEffect(fetchPatients, []);

  const showEditForm = (patient) => {
    setName(patient.name);
    setBirthDate(patient.dob);
    setPhone(patient.mobile);
    setPatientId(patient.userId);
    setHeight(patient.height);
    handleModalShow();
  };

  const showAssignDoctor = (patient) => {
    setName(patient.name);
    setBirthDate(patient.dob);
    setPhone(patient.mobile);
    setPatientId(patient.userId);
    handleAssignDrModalShow();
  };

  const deletePatient = (patient) => {
    coreContext.DeletePatient(patient.userId);
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      editable: false,
      width: 250,
      renderCell: (params) => (
        <a href={`/patient-summary/${btoa(params.row.userId)}`}>
          {" "}
          {params.value}{" "}
        </a>
      ),
    },
    {
      field: "providerName",
      headerName: "Provider Name",
      editable: false,
      
      width: 200,
    },
    {
      field: "diagnosisId",
      headerName: "Diagnosis",
      editable: false,
     
      width: 200,
    },
    {
      field: "CCM",
      headerName: "CCM Mins",
      editable: false,
      width: 150,
      renderCell: (params) => (
        <div>          {String(Math.floor(params.value/60))+":"+('0' + String(params.value%60)).slice(-2)}</div>

       
      ),
    },
    {
      field: "RPM",
      headerName: "RPM Mins",
      width: 150,
      editable: false,
      renderCell: (params) => (
        <div>          {String(Math.floor(params.value/60))+":"+('0' + String(params.value%60)).slice(-2)}</div>

       
      ),
    },
   
  
    // {
    //   field: "Weight",
    //   headerName: "Weight",
    //   type: "number",
    //   width: 125,
    //   editable: false,
    // },
    // {
    //   field: "diastolic",
    //   headerName: "Diastolic",
    //   type: "number",
    //   width: 140,
    //   editable: false,
    // },
    // {
    //   field: "systolic",
    //   headerName: "Systolic",
    //   type: "number",
    //   width: 140,
    //   editable: false,
    // },
    // {
    //   field: "BMI",
    //   headerName: "BMI",
    //   width: 175,
    //   editable: false,
    // },
    // {
    //   field: "",
    //   headerName: "Action",
    //   width: 120,
    //   renderCell: (params) => (
    //     <div style={{ width: "100px" }}>
    //       <a
    //         style={{ marginRight: "5px" }}
    //         href="#"
    //         onClick={() => showEditForm(params.row)}>
    //         {" "}
    //         <PencilSquare />
    //       </a>
    //       <a
    //         style={{ marginRight: "5px" }}
    //         href="#"
    //         onClick={() => deletePatient(params.row)}>
    //         {" "}
    //         <Trash />
    //       </a>
    //       <a
    //         style={{ marginRight: "5px" }}
    //         href="#"
    //         onClick={() => showAssignDoctor(params.row)}>
    //         {" "}
    //         <Person />
    //       </a>
    //     </div>
    //   ),
    // },
  ];

  // const useStyles = makeStyles((theme) => (
  //     {
  //         colCell: {
  //         color: "Red"
  //     }
  //   }));

  // const classes = useStyles();
  const checktimelog=()=>{
    const d_pat = [... new Set(JSON.parse(localStorage.getItem("d_patient")))]
    const patients = [... new Set(JSON.parse(localStorage.getItem("patient_list")))]
    const month = localStorage.getItem("month");
    const dashboardPatient=[];
    d_pat.map((curr,index)=>{
      let patientTimelog = coreContext.AlltimeLogData.filter(
        (app) => app.UserId == curr && Number(app.performedOn.substring(5,7))==Number(month)+1
      );
      var totalTimeLog = 0;
      var totalTimeLogForDataReview = 0;
      if (patientTimelog.length > 0) {
    
  
        patientTimelog.map((timelog) => {
          if(timelog.taskType==="CareCoordination"){
            totalTimeLog = Number(timelog.timeAmount) + totalTimeLog;
          }
          else if(timelog.taskType==="DataReview")
          totalTimeLogForDataReview = Number(timelog.timeAmount) + totalTimeLogForDataReview;
        });
      }
      const p=patients.filter((app)=>app.userId===curr)
      dashboardPatient.push({"id":index,"name":p[0].name,"providerName":p[0].ProviderName,"diagnosisId":p[0].diagnosisId,"userId":curr,"CCM":totalTimeLog,"RPM":totalTimeLogForDataReview})
    })
    setRows(dashboardPatient)
    console.log(dashboardPatient,"dashba")
   
  }
  useEffect(() => {
    checktimelog();
    coreContext.fetchAllTimeLog();
  }, [coreContext.AlltimeLogData.length>1]);
  useEffect(() => {
   
    coreContext.fetchAllTimeLog();
  }, []);

  const renderPatients = () => {
    const d_pat = localStorage.getItem("d_patient");
    
    
    console.log(d_pat);
    if (coreContext.AlltimeLogData.length == 0) {
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
    if (coreContext.AlltimeLogData.length > 0) {
      return (
        // <div style={{ height: 680, width: "100%" }}>
        //   <DataGrid
        //     rows={rows}
        //     columns={columns}
        //     pageSize={10}
        //     sortModel={[{ field: "name", sort: "asc" }]}
        //   />
        // </div>
        <DataGridComponent rows={rows} columns={columns} sortModal={[{ field: "name", sort: "asc" }]}/>
      );
    }
  };

  return (
    <>
      
      <div className="col">
    <div className="page-title-container mb-3">
    <div className="row">
    <div className="col mb-2">
    <h1 className="mb-2 pb-0 display-4" id="title">{localStorage.getItem("DInformaion")}
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
      {renderPatients()}
    
    </div>
      
    
      
    </div>
      
    
    
    
    </div>
    
    </div>
      </div>
    </div>
    </div>
      </div>
      <Modal show={showModal} onHide={handleModalClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Patient </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            autoComplete="off"
            onSubmit={handleSubmit(editPatient)}
            noValidate>
            <div className="row">
              <div className="col-md-6">
                <Input
                  label="Name"
                  elementType="text"
                  minLength={5}
                  maxLength={55}
                  placeholder="Enter name"
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                  value={name}
                  required={true}
                  register={register}
                  errors={errors}
                />

                <Input
                  label="Phone"
                  elementType="text"
                  placeholder="Enter phone"
                  onChange={(e) => setPhone(e.target.value)}
                  required={true}
                  minLength={5}
                  maxLength={55}
                  register={register}
                  errors={errors}
                  name="phone"
                  value={phone}
                />

                <Input
                  label="Date of Birth"
                  elementType="date"
                  placeholder="Enter dob"
                  onChange={(e) => setBirthDate(e.target.value)}
                  required={true}
                  minLength={5}
                  maxLength={55}
                  register={register}
                  errors={errors}
                  name="dob"
                  value={birthDate}
                />

                <Input
                  label="Height (Inch)"
                  elementType="number"
                  minLength={1}
                  maxLength={55}
                  placeholder="Enter height"
                  onChange={(e) => setHeight(e.target.value)}
                  name="height"
                  value={height}
                  required={true}
                  register={register}
                  errors={errors}
                />
              </div>
              <div className="col-md-6">
                <Input
                  label="Provider Name"
                  name="coordinator"
                  required={false}
                  register={register}
                  errors={errors}
                  elementType="select"
                  value={provider}
                  options={coreContext.providerOptions}
                  onChange={(e) => setProvider(e.target.value)}
                />

                <Input
                  label="Care Coordinator"
                  name="care"
                  required={false}
                  register={register}
                  errors={errors}
                  elementType="select"
                  value={coordinator}
                  options={coreContext.careCoordinatorOptions}
                  onChange={(e) => setCoordinator(e.target.value)}
                />

                <Input
                  label="Coach Name"
                  name="coach"
                  required={false}
                  register={register}
                  errors={errors}
                  elementType="select"
                  value={coach}
                  options={coreContext.coachOptions}
                  onChange={(e) => setCoach(e.target.value)}
                />
              </div>
            </div>
            <Input
              blockButton={true}
              value="Submit"
              onClick={() => {
                coreContext.UpdatePatient(
                  name,
                  phone,
                  birthDate,
                  height,
                  provider,
                  coordinator,
                  coach,
                  patientId
                );
                setShowModal(false);
              }}
              elementType="button"
              variant="primary"
            />
            <br />
            <center> {coreContext.renderLoader()}</center>
            <center>
              {" "}
              <Input variant="danger" label={message} elementType="label" />
            </center>
          </Form>
        </Modal.Body>
      </Modal>
     
        <Modal show={showAssignDrModal} onHide={handleAssignDrModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Assign Care Team </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              autoComplete="off"
              onSubmit={handleSubmit(editPatient)}
              noValidate>
              <div>
                <div>
                  <Input
                    label="Provider Name"
                    name="coordinator"
                    required={false}
                    register={register}
                    errors={errors}
                    elementType="select"
                    value={provider}
                    options={coreContext.providerOptions}
                    onChange={(e) => setProvider(e.target.value)}
                  />

                  <Input
                    label="Care Coordinator"
                    name="care"
                    required={false}
                    register={register}
                    errors={errors}
                    elementType="select"
                    value={coordinator}
                    options={coreContext.careCoordinatorOptions}
                    onChange={(e) => setCoordinator(e.target.value)}
                  />

                  <Input
                    label="Coach Name"
                    name="coach"
                    required={false}
                    register={register}
                    errors={errors}
                    elementType="select"
                    value={coach}
                    options={coreContext.coachOptions}
                    onChange={(e) => setCoach(e.target.value)}
                  />
                </div>
              </div>
              <Input
                blockButton={true}
                value="Submit"
                onClick={() => {
                  coreContext.AssignCareTeam(
                    provider,
                    coordinator,
                    coach,
                    patientId
                  );
                  setAssignDrShowModal(false);
                }}
                elementType="button"
                variant="primary"
              />
              <br />
              <center> {coreContext.renderLoader()}</center>
              <center>
                {" "}
                <Input variant="danger" label={message} elementType="label" />
              </center>
            </Form>
          </Modal.Body>
        </Modal>
        </>
  );
};

export { DPatients };

