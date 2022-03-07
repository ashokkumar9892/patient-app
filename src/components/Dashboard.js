/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { CoreContext } from "../context/core-context";
import { Bezier, Bezier2, Cash, GraphUp } from "react-bootstrap-icons";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "react-loader-spinner";
import Moment from "moment";
import "../css/dasboard.css";

import { Widget } from "react-chat-widget";

import "react-chat-widget/lib/styles.css";

const Dashboard = (props) => {
  const [date, setDate] = useState();
  const [userType, setUserType] = useState("");
  const d=new Date();
  const e=new Date();
  let Currmonth = d.getMonth();
  let lastDate=new Date(e.setFullYear(d.getFullYear()-1));
  const [month,setMonth]=useState(String(Currmonth));
  const coreContext = useContext(CoreContext);
  let zero = [];
  const nine = [];
  const nineteen = [];
  const thirtynine = [];
  const fiftynine = [];
  const sixty = [];
  const inactive = [];
  let zero1 = [];
  const nine1 = [];
  const nineteen1 = [];
  const thirtynine1 = [];
  const fiftynine1 = [];
  const sixty1 = [];
  const Billing=[];
  const ccm=[];
  const rpm=[];
  
  const months = [ "January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December" ];
  let patientwdevice = [];

  useEffect(coreContext.checkLocalAuth, []);

  const fetchPatients = () => {
    const email = localStorage.getItem("app_userEmail");
    coreContext.userDetails(email);
    const userType = localStorage.getItem("userType");
    const userId = localStorage.getItem("userId");
    console.log("check ysertype from dashboard", userType);

    if (userType === "admin") {
      coreContext.fetchPatientListfromApi("admin");
    } else {
      coreContext.fetchPatientListfromApi(userType, userId);
    }
    coreContext.fetchAllTimeLog();
    coreContext.fetchPatientWithDevice();
  };
  useEffect(fetchPatients, []);

  const fetchWeight = () => {
    let userType = localStorage.getItem("userType");
    let patientId = localStorage.getItem("userId");
    // check page if left side menu.
    if (window.location.href.substring("weight") > 0) {
    }
    if (window.location.href.indexOf("patient-summary") > 0) {
      patientId = localStorage.getItem("ehrId");
      userType = "patient";
      // clear this otherwise will be problem
      localStorage.removeItem("ehrId");
    }
    setUserType(userType);
    coreContext.fetchWSData(patientId, userType);
    coreContext.fetchBloodGlucose(patientId, userType);
    coreContext.fetchBloodPressure(patientId, userType);
  };
  useEffect(fetchWeight, [coreContext.weightData.length]);
  const renderSelect=()=>{
    return(<>
     
      <div className="col-xl-3 col-6">
      <select className="form-select" value={month} onChange={(e)=>{setMonth(e.target.value);}} >
      <option selected="selected">Select the Month</option>
      {months.map((curr,index)=>{
        return(<option value={index}>{curr}</option>)
        
 })}
      
      </select>
      
      </div>
      </>
      
      )

    
  }
  const selectmonth=React.useMemo(()=>renderSelect(),[month])
  

  console.log("sahilwight", coreContext.weightData);
  const wd = coreContext.weightData
    .map((curr) => curr.userId)
    .filter((item, i, ar) => ar.indexOf(item) === i);
  const bp = coreContext.bloodpressureData
    .map((curr) => curr.userId)
    .filter((item, i, ar) => ar.indexOf(item) === i);
  const bg = coreContext.bloodglucoseData
    .map((curr) => curr.userId)
    .filter((item, i, ar) => ar.indexOf(item) === i);
  const reading = [...wd, ...bp, ...bg];

  console.log(reading);
  const fetchdpatient = (p) => {
    coreContext.getdp(p);
    //console.log(coreContext.dpatient)
    alert(p);
    alert(coreContext.patientWDevice);
  };
  // useEffect(fetchdpatient, []);
  const setPatient = (p,description) => {
    console.log("sahil", p);
    //   coreContext.setPatient(p);
    localStorage.setItem("d_patient", JSON.stringify(p));
    localStorage.setItem("month", month);
    localStorage.setItem("DInformaion", description);
  };
  const setBPatient = (p) => {
    console.log("sahil", p);
    //   coreContext.setPatient(p);
    localStorage.setItem("B_patient", JSON.stringify(p));
  };

  const renderTimeLogs = () => {
    if (coreContext.patients.length == 0) {
      return (
        <div
          style={{
            height: 80,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
            alignItems: "center",
          }}>
          <Loader type="Circles" color="#00BFFF" height={50} width={50} />
        </div>
      );
    }
    if (coreContext.patients.length > 0) {
      localStorage.setItem("patient_list",JSON.stringify(coreContext.patients))
      
      coreContext.patients.map((curr) => {
        let patientTimelog = coreContext.AlltimeLogData.filter(
          (app) => app.UserId == curr.userId && Number(app.performedOn.substring(5,7))==Number(month)+1
        );
        // let patientTimelog = patientTimelogAll.filter(
        //   (app) => Number(app.performedOn.substring(5,7))==Number(month)+1       );
        console.log(patientTimelog,"patienttimelog")
        
        if (patientTimelog.length > 0) {
          let totalTimeLog = 0;
          let totalTimeLogForDataReview = 0;

          patientTimelog.map((timelog) => {
            if(timelog.taskType==="CareCoordination"){
              totalTimeLog = Number(timelog.timeAmount) + totalTimeLog;
            }
            else if(timelog.taskType==="DataReview")
            totalTimeLogForDataReview = Number(timelog.timeAmount) + totalTimeLogForDataReview;
          });
         
          console.log("checking timelog", totalTimeLogForDataReview,curr);
          if (totalTimeLog >= 0 && totalTimeLog <= 60) {
            zero.push(curr.userId);
          } else if (totalTimeLog > 60 && totalTimeLog <= 600) {
            // setOnetonine(onetonine+1)
            nine.push(curr.userId);
            //nine=nine+1;
          } else if (totalTimeLog > 600 && totalTimeLog <= 1200) {
            // setOnetonine(onetonine+1)
            nineteen.push(curr.userId);
            //nine=nine+1;
          } else if (totalTimeLog > 1200 && totalTimeLog <= 2400) {
            // setOnetonine(onetonine+1)
            thirtynine.push(curr.userId);
            //nine=nine+1;
          } else if (totalTimeLog > 2400 && totalTimeLog <= 3600) {
            // setOnetonine(onetonine+1)
            fiftynine.push(curr.userId);
            //nine=nine+1;
          } else if (totalTimeLog > 3600) {
            // setOnetonine(onetonine+1)
            sixty.push(curr.userId);
            //nine=nine+1;
          }
          if (totalTimeLogForDataReview >= 0 && totalTimeLogForDataReview <= 60) {
            zero1.push(curr.userId);
          } else if (totalTimeLogForDataReview > 60 && totalTimeLogForDataReview <= 600) {
            // setOnetonine(onetonine+1)
            nine1.push(curr.userId);
            //nine=nine+1;
          } else if (totalTimeLogForDataReview > 600 && totalTimeLogForDataReview <= 1200) {
            // setOnetonine(onetonine+1)
            nineteen1.push(curr.userId);
            //nine=nine+1;
          } else if (totalTimeLogForDataReview >= 1200 && totalTimeLogForDataReview <2400) {
            // setOnetonine(onetonine+1)
            thirtynine1.push(curr.userId);
            if(Billing.length<1){
              Billing.push({"id":Billing.length+1,"userId":curr.userId,"name":curr.name,"totalTime":totalTimeLogForDataReview,"bills":(Math.floor(totalTimeLogForDataReview/1200)),"timeLeft":Math.floor(totalTimeLogForDataReview/60)%20})
            }
            else{
              let count=0
              Billing.map((obj)=>{
                
                if(Object.values(obj).includes(curr.userId)==true){
                  count=count+1
                }
              })
              if (count===0){
                Billing.push({"id":Billing.length+1,"userId":curr.userId,"name":curr.name,"totalTime":totalTimeLogForDataReview,"bills":(Math.floor(totalTimeLogForDataReview/1200)),"timeLeft":Math.floor(totalTimeLogForDataReview/60)%20})
                
              }
            }
          } else if (totalTimeLogForDataReview >= 2400 && totalTimeLogForDataReview <= 3600) {
            // setOnetonine(onetonine+1)
            fiftynine1.push(curr.userId);
            if(Billing.length<1){
              Billing.push({"id":Billing.length+1,"userId":curr.userId,"name":curr.name,"totalTime":totalTimeLogForDataReview,"bills":(Math.floor(totalTimeLogForDataReview/1200)),"timeLeft":Math.floor(totalTimeLogForDataReview/60)%20})
            }
            else{
              let count=0
              Billing.map((obj)=>{
                
                if(Object.values(obj).includes(curr.userId)==true){
                  count=count+1
                }
              })
              if (count===0){
                Billing.push({"id":Billing.length+1,"userId":curr.userId,"name":curr.name,"totalTime":totalTimeLogForDataReview,"bills":(Math.floor(totalTimeLogForDataReview/1200)),"timeLeft":Math.floor(totalTimeLogForDataReview/60)%20})
                
              }
            }
            //Billing.push({"id":Billing.length+1,"userId":curr.userId,"name":curr.name,"totalTime":totalTimeLogForDataReview,"bills":(Math.floor(totalTimeLogForDataReview/1200)),"timeLeft":Math.floor(totalTimeLogForDataReview/60)%20})            
            
            //nine=nine+1;
          } else if (totalTimeLogForDataReview > 3600) {
            // setOnetonine(onetonine+1)
            console.log("sixty1",curr)
            sixty1.push(curr.userId);
            if(Billing.length<1){
              Billing.push({"id":Billing.length+1,"userId":curr.userId,"name":curr.name,"totalTime":totalTimeLogForDataReview,"bills":(Math.floor(totalTimeLogForDataReview/1200)),"timeLeft":Math.floor(totalTimeLogForDataReview/60)%20})
            }
            else{
              let count=0
              Billing.map((obj)=>{
                
                if(Object.values(obj).includes(curr.userId)==true){
                  count=count+1
                }
              })
              if (count===0){
                Billing.push({"id":Billing.length+1,"userId":curr.userId,"name":curr.name,"totalTime":totalTimeLogForDataReview,"bills":(Math.floor(totalTimeLogForDataReview/1200)),"timeLeft":Math.floor(totalTimeLogForDataReview/60)%20})
                
              }
            }
            //Billing.push({"id":Billing.length+1,"userId":curr.userId,"name":curr.name,"totalTime":totalTimeLogForDataReview,"bills":(Math.floor(totalTimeLogForDataReview/1200)),"timeLeft":Math.floor(totalTimeLogForDataReview/60)%20})
          }
         
        } else {
          inactive.push(curr.userId);
        }
        
      });
    }
  };
  const checkBills=(billing)=>{
    let Bills=0
    billing.map((curr)=>{
      Bills=Bills+curr.bills
    })
    return Bills
  

    
  }
  

  const renderRemotePatientMonitor = () => {
    if (
      coreContext.patientWDevice.length > 0 &&
      coreContext.patients.length > 0
    ) {
      coreContext.patientWDevice.map((patientData) => {
        let patient = coreContext.patients.filter(
          (p) => p.ehrId === patientData.patientId
        );
        if (patient.length > 0) {
          console.log("dshhsdffdfdhfdfd", patient);
          patientwdevice.push(patient[0].ehrId);
        }
      });
    }
    console.log("patientwdevice", patientwdevice);
  };

  const fetchDevice = () => {
    const patient = JSON.parse(localStorage.getItem("app_patient"));
    let patientId = localStorage.getItem("userId");
    let userType = localStorage.getItem("userType");
    let userName = localStorage.getItem("userName");
    if (patient != undefined) {
      if (patient.ehrId !== undefined) {
        patientId = patient.ehrId;
        userType = "patient";
        userName = patient.name;
      }
    }

    if (patientId !== undefined) {
      if (userType == "admin") {
        coreContext.fetchPatientListfromApi("admin", null);
        if (coreContext.patients.length > 0) {
          coreContext.fetchDeviceData(
            patientId,
            userName,
            userType,
            "",
            coreContext.patients
          );
        }
      }
    }
  };

  useEffect(fetchDevice, [coreContext.patients.length]);
  if (coreContext.deviceData.length > 0) {
    var v_devices = coreContext.deviceData.filter((s) =>
      s.deviceID !== undefined ? s.deviceID.length > 7 : null
    );
  }

  console.log("vdevide", v_devices);

  return (

<div className="col">
<div className="page-title-container mb-3">
<div className="row">
<div className="col mb-2">
<h1 className="mb-2 pb-0 display-4" id="title">A Pattern Medical Clinic Dashboard
</h1>

</div>
</div>
</div>
<div className="row">
<div className="col-xl-12">
<div className="card mb-3">
<div className="card-body">
<div className="row g-0 align-items-center">
<div className="col-lg-3 col-6">
<div className="form-check">
<input className="form-check-input" type="checkbox"/>
<label className="form-check-label" for="gridCheck">Check me out</label>
</div>
</div>
{selectmonth}
	

</div>
</div>
</div>
<div className="card mb-3">
	<div className="card-header bg-primary pt-2 pb-2"> <h3 className="text-white mb-0">Chronic Care Management</h3>
</div>
<div className="card-body">
<div className="row g-0 align-items-center">
<div className="col-xl-12">
<div className="table-responsive-sm mb-0">
<table className="table table-bordered table-striped mb-0">
<thead className="bg-defualts">
<tr>
<th  width="10%">Patients Enrolled	</th>
<th width="10%">60+ Mins</th>
<th width="10%">40-60 Mins	</th>
<th width="10%">20-40 Mins	</th>
<th width="10%">10-20 Mins	</th>
<th  width="10%">1-10 Mins	</th>
<th width="10%">0 Mins	</th>
<th  width="10%">Inactive</th>
<th width="10%">Not Enrolled
</th>
</tr>
</thead>
<tbody>
  {renderTimeLogs()}
<tr>
<td> <a href="/dpatients" onClick={() => setPatient([...sixty,...fiftynine,...thirtynine,...nineteen,...nine,...zero,...inactive],`${months[month]} 2022 Logs(CCM)`)}>{coreContext.patients.length}</a>{" "}</td>
<td>   <a href="/dpatients" onClick={() => setPatient(sixty,`${months[month]} 2022 60+ Mins Logs(CCM)`)}>
                {sixty.length}
              </a>
               </td>
<td>
<a href="/dpatients" onClick={() => setPatient(fiftynine,`${months[month]} 2022 40-60 Mins Logs(CCM)`)}>
                {fiftynine.length}
              </a>
</td>
<td><a href="/dpatients" onClick={() => setPatient(thirtynine,`${months[month]} 2022 20-40 Mins Logs(CCM)`)}>
                {thirtynine.length}
              </a></td>
<td><a href="/dpatients" onClick={() => setPatient(nineteen,`${months[month]} 2022 10-20 Mins Logs(CCM)`)}>
                {nineteen.length}
              </a></td>
<td> <a href="/dpatients" onClick={() => setPatient(nine,`${months[month]} 2022 1-10 Mins Logs(CCM)`)}>
                {nine.length}
              </a></td>
<td> <a href="/dpatients" onClick={() => setPatient(zero,`${months[month]} 2022 0-1 Mins Logs(CCM)`)}>
                {zero.length}
              </a></td>
<td><a href="/dpatients" onClick={() => setPatient(inactive,`${months[month]} 2022 0 Mins Logs(CCM)`)}>
                {inactive.length}
              </a></td>
<td>0</td>
</tr>

</tbody>
</table>
</div>
	

	
</div>
	

</div>
</div>
</div>
	<div className="card mb-3">
	<div className="card-header bg-primary pt-2 pb-2"> <h3 className="text-white mb-0"> Data Review & Management
</h3>
</div>
<div className="card-body">
<div className="row g-0 align-items-center">
<div className="col-xl-12">
<div className="table-responsive-sm mb-0">
<table className="table table-bordered table-striped mb-0">
<thead className="bg-defualts">
<tr>
<th  width="10%">Patients Enrolled	</th>
<th width="10%">60+ Mins</th>
<th width="10%">40-60 Mins	</th>
<th width="10%">20-40 Mins	</th>
<th width="10%">10-20 Mins	</th>
<th  width="10%">1-10 Mins	</th>
<th width="10%">0 Mins	</th>
<th  width="10%">Inactive</th>
<th width="10%">Not Enrolled
</th>
</tr>
</thead>
<tbody>
  {renderTimeLogs()}
<tr>
<td> <a href="/dpatients" onClick={() => setPatient([...sixty,...fiftynine,...thirtynine,...nineteen,...nine,...zero,...inactive],`${months[month]} 2022 Logs(RPM)`)}>{coreContext.patients.length}</a>{" "}</td>
<td>             <a href="/dpatients" onClick={() => setPatient([...new Set(sixty1)],`Patients Information with time log between 60+ Mins of RPM of ${months[month]} month`)}>
                {[...new Set(sixty1)].length}
               </a></td>
<td>
<a href="/dpatients" onClick={() => setPatient(fiftynine,`${months[month]} 2022 40-60 Mins Logs(RPM)`)}>
                {fiftynine.length}
              </a></td>
<td> <a href="/dpatients" onClick={() => setPatient(thirtynine,`${months[month]} 2022 20-40 Mins Logs(RPM)`)}>
                {thirtynine.length}
              </a></td>
<td><a href="/dpatients" onClick={() => setPatient(nineteen,`${months[month]} 2022 10-20 Mins Logs(RPM)`)}>
                {nineteen.length}
              </a></td>
<td> <a href="/dpatients" onClick={() => setPatient(nine,`${months[month]} 2022 1-10 Mins Logs(RPM)`)}>
                {nine.length}
              </a></td>
<td><a href="/dpatients" onClick={() => setPatient(zero,`${months[month]} 2022 0-1 Mins Logs(RPM)`)}>
                {zero.length}
              </a></td>
<td> <a href="/dpatients" onClick={() => setPatient(inactive,`${months[month]} 2022 0 Mins Logs(RPM)`)}>
                {inactive.length}
              </a></td>
<td>0</td>
</tr>

</tbody>
</table>
</div>
	

	
</div>
	

</div>
</div>
</div>
	<div className="card mb-3">
	<div className="card-header bg-primary pt-2 pb-2"> <h3 className="text-white mb-0">  Remote Patient Monitoring
</h3>
</div>
<div className="card-body">
<div className="row g-0 align-items-center">
<div className="col-xl-12">
<div className="table-responsive-sm mb-0">
<table className="table table-bordered table-striped mb-0">
<thead className="bg-defualts">
<tr>
<th  width="8%">Active</th>
<th width="20%">Patients with Devices	</th>
<th width="20%">Patients taking Readings</th>
<th width="20%">Qualified Supplied Device</th>
<th width="8%">40+ Mins</th>
<th  width="8%">20-39 Mins</th>
<th width="8%">1-19 Mins</th>
<th  width="8%">0 Mins</th>
<th width="8%">Inactive
</th>
</tr>
</thead>
<tbody>
  {renderRemotePatientMonitor()}
<tr>
<td><a href="/Patients">{coreContext.patients.length}</a></td>
<td><a href="/device-info" onClick={() => setPatient(inactive)}>
                 {[...new Set(patientwdevice)].length}
               </a></td>
<td><a href="/bloodpressure">{reading.length}</a></td>
<td><a href="/verifieddevices">
                 {v_devices !== undefined ? v_devices.length : 0}
               </a></td>
<td> <a href="/Patients">2</a></td>
<td> <a href="/Patients">2</a></td>
<td> <a href="/Patients">2</a></td>
<td> <a href="/Patients">2</a></td>
<td> <a href="/Patients">2</a></td>
</tr>

</tbody>
</table>
</div>
	

	
</div>
	

</div>
</div>
</div>
	<div className="card mb-3">
	<div className="card-header bg-primary pt-2 pb-2"> <h3 className="text-white mb-0">Billing & Claims
</h3>
</div>
<div className="card-body">
<div className="row g-0 align-items-center">
<div className="col-xl-12">
<div className="table-responsive-sm mb-0">
<table className="table table-bordered table-striped mb-0">
<thead className="bg-defualts">
<tr>
<th  width="25%">Ready to Bill	</th>
<th width="25%">Missing Info	</th>
<th width="25%">Submitted</th>
<th width="25%">On hold</th>

</tr>
</thead>
<tbody>
<tr>
<td><a href="/billing" onClick={()=>setBPatient(Billing)}>{checkBills(Billing)}
              {console.log(Billing,"Billing")}
               </a></td>
<td><a href="/billing">2</a></td>
<td> <a href="/Patients">2</a></td>
<td><a href="/Patients">2</a></td>
</tr>

</tbody>
</table>
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

export { Dashboard };
