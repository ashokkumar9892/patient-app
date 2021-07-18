/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { CoreContext } from '../context/core-context';
import { GenderMale, GenderFemale, PencilSquare, CaretDown } from 'react-bootstrap-icons';
import DatePicker from "react-datepicker";
import { ButtonGroup, Button, Form } from 'react-bootstrap';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import "react-datepicker/dist/react-datepicker.css";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from 'mdb-react-ui-kit';
import Input from './common/Input';
import { useStopwatch } from 'react-timer-hook';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import IonRangeSlider from 'react-ion-slider';
import { DataGrid } from '@material-ui/data-grid';

import {Weight} from './Weight';
import {BloodGlucose} from './BloodGlucose';
import { BloodPressure } from './BloodPressure';

const PatientSummary = props => {
    const coreContext = useContext(CoreContext);
    const [notes, setNotes] = useState('');
    const [date, setDate] = useState('');
    const [showNotesTextBox, setShowNotesTextBox] = useState(false);
    const [userType, setUserType] = useState('');
    const [userId, setUserId] = useState('');
    const [bgMin, setBgMin] = useState(0);
    const [bgMax, setBgMax] = useState(0);
    const [bmiMin, setBmiMin] = useState(0);
    const [bmiMax, setBmiMax] = useState(0);

    const [diastolicMin, setDiastolicMin] = useState(0);
    const [diastolicMax, setDiastolicMax] = useState(0);

    const [systolicMin, setSystolicMin] = useState(0);
    const [systolicMax, setSystolicMax] = useState(0);

    const [weightMin, setWeightMin] = useState(0);
    const [weightMax, setWeightMax] = useState(0);

    const [patient, setPatient] = useState('');
    const [message, setMessage] = useState('');
    const [threadMobile, setThreadMobile] = useState('');
    const [deviceType, setDeviceType] = useState('');
    const [deviceId, setDeviceId] = useState('');
    const [thData, setThData] = useState([]);


   
    const fetchPatient = () => {
        const patientId = props.match.params.patient;
        const usertype = localStorage.getItem("userType");
        setUserType(localStorage.getItem("userType"));
        setUserId(localStorage.getItem("userId"));
        let patientData = JSON.parse(localStorage.getItem('app_patient'));

        setPatient(patientData);

        
        coreContext.fetchThresold("PATIENT_" + patientId, userType);

        /// setting default value
        if (coreContext.thresoldData.length === 0) {
            let thdata = {};
            const thDatas = [];
            thdata.Element_value = 'Blood Glucose';
            thdata.bg_low = 0;
            thdata.bg_high = 0;
            thDatas.push(thdata);

            thdata = {};
            thdata.Element_value = 'BMI';
            thdata.bmi_low = 0;
            thdata.bmi_high = 0;
            thDatas.push(thdata);

            thdata = {};
            thdata.Element_value = 'Diastolic';
            thdata.diastolic_low = 0;
            thdata.diastolic_high = 0;
            thDatas.push(thdata);

            thdata = {};
            thdata.Element_value = 'Systolic';
            thdata.systolic_high = 0;
            thdata.systolic_low = 0;
            thDatas.push(thdata);

            thdata = {};
            thdata.Element_value = 'Weight';
            thdata.weight_low = 0;
            thdata.weight_high = 10;
            thDatas.push(thdata);
            setThData(thDatas);
        }
        else {
            setThData(coreContext.thresoldData);


            if (coreContext.thresoldData[0]) {
                setBgMin(coreContext.thresoldData[0].bg_low);
                setBgMax(coreContext.thresoldData[0].bg_high);
            }
            else {
                setBgMin(0);
                setBgMax(0);
            }

            if (coreContext.thresoldData[1]) {
                setBmiMin(coreContext.thresoldData[1].bmi_low);
                setBmiMax(coreContext.thresoldData[1].bmi_high);
            }
            else {
                setBmiMin(0);
                setBmiMax(0);
            }

            if (coreContext.thresoldData[2]) {
                setDiastolicMin(coreContext.thresoldData[2].diastolic_low);
                setDiastolicMax(coreContext.thresoldData[2].diastolic_high);
            }
            else {
                setDiastolicMin(0);
                setDiastolicMax(0);
            }

            if (coreContext.thresoldData[3]) {
                setSystolicMin(coreContext.thresoldData[3].systolic_low);
                setSystolicMax(coreContext.thresoldData[3].systolic_high);
            }
            else {
                setSystolicMin(0);
                setSystolicMax(0);
            }

            if (coreContext.thresoldData[4]) {
                setWeightMin(coreContext.thresoldData[4].weight_low);
                setWeightMax(coreContext.thresoldData[4].weight_high);
            }
            else {
                setWeightMin(0);
                setWeightMax(0);
            }

        }

    }

    useEffect(fetchPatient, [coreContext.thresoldData.length]);
    

    //useEffect(fetchPatient, [coreContext.patient]);

    useEffect(coreContext.checkLocalAuth, []);


    const {
        seconds,
        minutes,
        start,
        pause,
        reset,
    } = useStopwatch({ autoStart: true });

   

    const onBGChange = (e) => {
        setBgMin(e.from);
        setBgMax(e.to);
        console.log(e.from, e.to);
    }

    const onBMIChange = (e) => {
        setBmiMin(e.from);
        setBmiMax(e.to);
    }



    const onDiastolicChange = (e) => {
        setDiastolicMin(e.from);
        setDiastolicMax(e.to);
    }
    const onSystolicChange = (e) => {
        setSystolicMin(e.from);
        setSystolicMax(e.to);
    }
    const onWeightChange = (e) => {
        setWeightMin(e.from);
        setWeightMax(e.to);
    }

    const bpcolumns = [
        { field: 'username', headerName: 'Patient Name', width: 200 ,  type: 'string'},
        {
          field: 'systolic',
          headerName: 'Systolic',
          type: 'number',
          editable: false,
          width: 200
        },
        {
          field: 'diastolic',
          headerName: 'Diastolic',
          width: 110,
          editable: false,
          width: 200
        },
        {
            field: 'pulse',
            headerName: 'Pulse',
            width: 110,
            editable: false,
            width: 200
          },
          {
            field: 'timeSlots',
            headerName: 'Time Slots',
            editable: false,
            width: 200
          },
          {
            field: 'date_recorded',
            headerName: 'Date Time',
            type: 'number',
            width: 200,
            editable: false,
          },
          {
            field: 'batteryVoltage',
            headerName: 'Battery Voltage',
            type: 'number',
            width: 200,
            editable: false,
          },
          {
            field: 'signalStrength',
            headerName: 'Signal Strength',
            type: 'number',
            width: 200,
            editable: false,
          },
          
          
      ];

   

    const renderDeviceData = () => {
        if (coreContext.deviceData.length > 0) {
            return coreContext.deviceData.map((deviceData, index) => {
                return <tr>
                    <td>{deviceData.deviceName} </td>
                    <td>{deviceData.deviceID} </td>
                </tr>
            });
        }

    }

    const wcolumns = [
        { field: 'username', headerName: 'Patient Name', width: 200 ,  type: 'string'},
        {
          field: 'weight',
          headerName: 'Weight',
          type: 'number',
          editable: false,
          width: 200
        },
        {
          field: 'timeSlots',
          headerName: 'Time Slot',
          width: 110,
          editable: false,
          width: 200
        },
        {
            field: 'measurementDateTime',
            headerName: 'Date-Time',
            width: 110,
            editable: false,
            width: 200
          },
          {
            field: 'deviceid',
            headerName: 'Device Id',
            editable: false,
            width: 200
          },
          {
            field: 'batteryVoltage',
            headerName: 'Battery voltage',
            type: 'number',
            width: 200,
            editable: false,
          },
          {
            field: 'signalStrength',
            headerName: 'Signal Strength',
            type: 'number',
            width: 200,
            editable: false,
          },
          
          
      ];
      
    const renderVitalDataW = () => {
        if (coreContext.wsData.length > 0) {
            return (
                <div style={{ height: 400, width: '100%' }}>
                  <DataGrid
                    rows={coreContext.weightData}
                    columns={wcolumns}
                    pageSize={10}
                   
                  />
                </div>
              );
        }
    }


    const renderThreads = () => {
        if (coreContext.threads.length > 0) {
            return coreContext.threads.map((message => {
                return <div style={{ fontWeight: 'bold', lineHeight: 1 }} className="card-body"><span className={message.direction === 'inbound' ? 'float-left' : 'float-right'}>{message.body}</span><br />
                    <span className={message.direction === 'inbound' ? 'float-left' : 'float-right'} style={{ fontSize: 8 }}>Time : {message.date}</span>
                </div>

            }))
        }
    }

    const onSendMessage = () => {
        axios.post('send-sms', { mobilePhone: threadMobile, message }).then(response => {
            const status = response.data.status;
            if (status.trim() === 'success') {
                //coreContext.fetchMessages();
                //coreContext.fetchThreadMessages('from', threadMobile);
            }
        }).catch(() => alert('Message Sending failed'));
    }

    const renderTopDetails = () => {
        coreContext.patient = JSON.parse(localStorage.getItem('app_patient'));
        if (coreContext.patient)
            return <div className="row">
                <div className="col-md-3" style={{ fontWeight: 'bold' }}>{coreContext.patient.name}</div>
                <div className="col-md-3" style={{ fontWeight: 'bold' }}>{'DOB : ' + coreContext.patient.dob}</div>
                <div className="col-md-2" style={{ fontWeight: 'bold' }}>{coreContext.patient.gender === 'Male' ? <GenderMale /> : <GenderFemale />}{coreContext.patient.gender}</div>
                <div className="col-md-4" style={{ fontWeight: 'bold' }}>EHR ID : {coreContext.patient.ehrId}</div>
            </div>
    }

    const renderAddModifyFlags = () => {
        if (coreContext.patient)
            return <div className="row">
                <div className="col-md-3">Flags : <PencilSquare /></div>
            </div>
    }



    const renderAddNotes = () => {
        if (coreContext.patient)
            return <div className="card" style={{ backgroundColor: '#b8b133' }}>
                <div className='card-body' onClick={() => setShowNotesTextBox(true)}> {showNotesTextBox ? <input type="text" className='form-control' placeholder='Enter notes' value={notes} onChange={e => setNotes(e.target.value)} /> : 'Click here to add some notes for the patient'} </div>
            </div>
    }


    const renderExpandCollapse = () => {
        if (coreContext.patient)
            return <div className="row">
                <div className="col-md-3">  <a href='#'>Expand All</a></div>
                <div className="col-md-3">  <a href='#'>Collapse All</a></div>
            </div>
    }

    const renderPatientinformation = () => {
        if (coreContext.patient)
            return <div className="row" style={{ marginLeft: '10px', backgroundColor: 'white' }}>
                <MDBCard className="border row col-md-6" >
                    <MDBCardBody>
                        <MDBCardTitle>Patient Information</MDBCardTitle>
                        <MDBCardText>
                            <div>
                                <b style={{ paddingRight: '10px' }}>Height:</b>{coreContext.patient.height}
                            </div>
                            <div >
                                <b style={{ paddingRight: '10px' }}>Weight:</b>{coreContext.patient.Weight}
                            </div>
                            <div >
                                <b style={{ paddingRight: '10px' }}>BMI      :</b>   {coreContext.patient.BMI}
                            </div>
                        </MDBCardText>

                    </MDBCardBody>
                </MDBCard>
                <MDBCard className="border row col-md-6">
                    <MDBCardBody>
                        <MDBCardTitle>Care Team</MDBCardTitle>
                        <MDBCardText>
                            <div>
                                <b style={{ paddingRight: '10px' }}>Provider Name:</b>{coreContext.patient.ProviderName}
                            </div>
                            <div >
                                <b style={{ paddingRight: '10px' }}>Care Coordinator:</b>{coreContext.patient.CareName}
                            </div>
                            <div >
                                <b style={{ paddingRight: '10px' }}>Coach     :</b>  {coreContext.patient.CoachName}
                            </div>
                        </MDBCardText>

                    </MDBCardBody>
                </MDBCard>
            </div>
    }

   

    const renderTabs = () => {

        if (coreContext.patient)
            return <Tabs>
                <TabList>
                    <Tab onClick={pause}>Conditions</Tab>
                    <Tab onClick={pause}>Programs</Tab>
                    <Tab onClick={pause}>Assesments</Tab>
                    <Tab onClick={pause}>Clinical Data</Tab>
                    <Tab onClick={pause}>Billing</Tab>
                    <Tab onClick={pause}>Alerts</Tab>
                    <Tab onClick={pause}>Documents</Tab>
                    <Tab onClick={reset}>Task Timer</Tab>
                    <Tab onClick={pause}>Time Logs</Tab>
                    <Tab onClick={pause}>Devices</Tab>
                    <Tab onClick={pause}>Portal</Tab>
                </TabList>

                <TabPanel>
                    <div className="card">
                        <h4 className="card-header">
                            Condition
                        </h4>
                        <div className="card-body">
                            <input type="text" className='form-control mb-4' placeholder="Select one to add" />
                            <table className='table table-bordered table-sm'>
                                <th>Condition</th>
                                <th>Diagonostic Code</th>
                                <th>Diagonosic Code</th>
                                <th>Programme</th>
                                <th>Assessment</th>
                            </table>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="card">
                        <h4 className="card-header">
                            Programs
                        </h4>
                        <div className="card-body">
                            <ButtonGroup aria-label="Basic example">
                                <Button variant="primary">CCM</Button>
                                <Button variant="secondary">RPM</Button>
                            </ButtonGroup>
                            <table className='table table-bordered table-sm'>
                                <th>Enroll Date</th>
                                <th>Enroll Status</th>
                                <th>Care Plan</th>
                                <th>Manage CCM</th>
                                <th>Mins This Month</th>
                                <th>Provider Mins</th>
                                <th>CCM Care Manager</th>
                                <th>CCM Physician</th>
                            </table>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="card">
                        <h4 className="card-header">
                            Assesments
                        </h4>
                        <div className="card-body">
                            This patient does not yet have any assessments.
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="card">
                        <h4 className="card-header">
                            Clinical Data
                        </h4>
                        <div className="card-body">
                            <Tabs>
                                <TabList>
                                    <Tab onClick={pause}>Allergies</Tab>
                                    <Tab onClick={pause}>Lab Results</Tab>
                                    <Tab onClick={pause}>Medications</Tab>
                                    <Tab onClick={pause}>Vitals</Tab>
                                </TabList>
                                <TabPanel>
                                    Allergies
                                </TabPanel>
                                <TabPanel>
                                    Lab Results
                                </TabPanel>
                                <TabPanel>
                                    Medications
                                </TabPanel>
                                <TabPanel>
                                    <Tabs>
                                        <TabList>
                                            <Tab onClick={pause}>Blood Pressure</Tab>
                                            <Tab onClick={pause}>Blood Glucose</Tab>
                                            <Tab onClick={pause}>Weight</Tab>
                                            <Tab onClick={pause}>Thresold</Tab>
                                        </TabList>
                                        <TabPanel>
                                        <div className='card'>
                                             <BloodPressure></BloodPressure>
                                        </div>
                                           

                                        </TabPanel>
                                        <TabPanel>
                                        <div className='card'>
                                            <BloodGlucose></BloodGlucose>
                                             {/* <h4 className="card-header">Blood Glucose</h4>
                                         <div className="card-body">
                                             {renderVitalDataBG()}
                                        </div> */}
                                        </div>
                                        </TabPanel>
                                        <TabPanel>
                                        <div className="card-body">
                                            <Weight></Weight>
                                        </div>
                                        </TabPanel>
                                        <TabPanel>
                                            <React.Fragment>
                                                <div className='row'>
                                                    <div className="col-md-6">
                                                        <div className="card">
                                                            <div>
                                                                {userType === 'doctor' || userType === 'admin' || userType === 'provider' ? <button type='button' style={{ width: '250px' }} onClick={() => coreContext.UpdateThreshold("PATIENT_" + patient.userId, 'BG', bgMax, bgMin, userType)} className="btn btn-primary mb-2 float-right"> Update</button> : ''}
                                                            </div>
                                                            <h4 className="card-header"> {thData[0] ? thData[0].Element_value : 'Blood Glucose'} (mg / dl) </h4>
                                                            <div className="card-body">
                                                                <IonRangeSlider keyboard={true} onStart={e => onBGChange(e)} onFinish={e => onBGChange(e)} type='double' min={0} max={500} from={bgMin} to={bgMax} step={.01} grid={true} grid_margin={true} grid_number={5} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="card">
                                                            <div>
                                                                {userType === 'doctor' || userType === 'admin' || userType === 'provider' ? <button type='button' style={{ width: '250px' }} onClick={() => coreContext.UpdateThreshold("PATIENT_" + patient.userId, 'BMI', bmiMax, bmiMin, userType)} className="btn btn-primary mb-2 float-right"> Update</button> : ''}
                                                            </div>
                                                            <h4 className="card-header"> {thData[1] ? thData[1].Element_value : 'BMI'} (kg / m2) </h4>
                                                            <div className="card-body">
                                                                <IonRangeSlider keyboard={true} onFinish={e => onBMIChange(e)} type='double' min={0} max={100} from={bmiMin} to={bmiMax} step={.01} grid={true} grid_margin={true} grid_number={5} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="card">
                                                            <div>
                                                                {userType === 'doctor' || userType === 'admin' || userType === 'provider' ? <button type='button' style={{ width: '250px' }} onClick={() => coreContext.UpdateThreshold("PATIENT_" + patient.userId, 'DIASTOLIC', diastolicMax, diastolicMin, userType)} className="btn btn-primary mb-2 float-right"> Update</button> : ''}
                                                            </div>
                                                            <h4 className="card-header"> {thData[2] ? thData[2].Element_value : 'Diastolic'} (mmHg) </h4>
                                                            <div className="card-body">
                                                                <IonRangeSlider keyboard={true} onFinish={e => onDiastolicChange(e)} type='double' min={0} max={500} from={diastolicMin} to={diastolicMax} step={.01} grid={true} grid_margin={true} grid_number={5} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="card">
                                                            <div>
                                                                {userType === 'doctor' || userType === 'admin' || userType === 'provider' ? <button type='button' style={{ width: '250px' }} onClick={() => coreContext.UpdateThreshold("PATIENT_" + patient.userId, 'SYSTOLIC', systolicMax, systolicMin, userType)} className="btn btn-primary mb-2 float-right"> Update</button> : ''}
                                                            </div>
                                                            <h4 className="card-header"> {thData[3] ? thData[3].Element_value : 'Systolic'} (mmHg) </h4>
                                                            <div className="card-body">
                                                                <IonRangeSlider keyboard={true} onFinish={e => onSystolicChange(e)} type='double' min={0} max={500} from={systolicMin} to={systolicMax} step={.01} grid={true} grid_margin={true} grid_number={5} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="card">
                                                            <div>
                                                                {userType === 'doctor' || userType === 'admin' || userType === 'provider' ? <button type='button' style={{ width: '250px' }} onClick={() => coreContext.UpdateThreshold("PATIENT_" + patient.userId, 'WS', weightMax, weightMin, userType)} className="btn btn-primary mb-2 float-right"> Update</button> : ''}   </div>
                                                            <h4 className="card-header"> {thData[4] ? thData[4].Element_value : 'Weight'} (lb) </h4>
                                                            <div className="card-body">
                                                                <IonRangeSlider keyboard={true} onFinish={e => onWeightChange(e)} type='double' min={50} max={700} from={weightMin} to={weightMax} step={.01} grid={true} grid_margin={true} grid_number={5} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        </TabPanel>

                                    </Tabs>
                                </TabPanel>
                            </Tabs>
                            <br /> <br />
                            <Button className="mr-4" size="sm" variant="danger">New Allergy</Button>   <input type="checkbox" />  Patient has no allergies.
                            <table className='table table-bordered table-sm mt-4'>
                                <th>Allergy</th>
                                <th>Category</th>
                                <th>Reaction</th>
                                <th>Active</th>
                                <th>Critical</th>
                                <th>Date Identified</th>
                                <th>Actions</th>
                            </table>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="card">
                        <h4 className="card-header">
                            Billing
                        </h4>
                        <div className="card-body">
                            Status Filter <br />
                            <select name="" id="">
                                <option value="">Ready to Bill</option>
                            </select>
                            <br /><br />
                            <table className='table table-bordered table-sm mt-4'>
                                <th>EHR ID</th>
                                <th>Date of Service</th>
                                <th>Type</th>
                                <th>Note</th>
                                <th>Provider</th>
                                <th>Care Manager</th>
                                <th>POS</th>
                                <th>TC Claim</th>
                                <th>Actions</th>
                            </table>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="card">
                        <h4 className="card-header">
                            Alert
                        </h4>
                        <div className="card-body">
                            Date Range <br />
                            <input type="text" className="form-control" placeholder="" />
                            <br /><br />
                            <table className='table table-bordered table-sm mt-4'>
                                <th>Priority</th>
                                <th>Title</th>
                                <th>Date</th>
                                <th>View</th>
                            </table>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="card">
                        <h4 className="card-header">
                            Document
                        </h4>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-3">Document Type</div>
                                <div className="col-md-3">Date Range</div>
                                <div className="col-md-3">Search</div>
                                <div className="col-md-3">Upload File</div>
                            </div>
                            <br /> <br />

                            <table className='table table-bordered table-sm mt-4'>
                                <th>Document Type</th>
                                <th>Document Description</th>
                                <th>Document Date</th>
                                <th>Actions</th>
                            </table>
                        </div>
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className="card">
                        <h4 className="card-header">
                            Task Timer
                        </h4>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="row">
                                        Task Type
                                        <select className="form-control mt-2 mb-2">
                                            <option value="">Select a Task Type</option>
                                            <option value="">Case Coordination</option>
                                            <option value="">Care Plan Reconciliation</option>
                                        </select>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            Performed By
                                            <select className="form-control mt-2">
                                                <option value="">Select a User</option>
                                                <option value="">User I</option>
                                                <option value="">User II</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            Performed On
                                            <DatePicker className='form-control mt-2'
                                                selected={date}
                                                onChange={(date) => setDate(date)}
                                                placeholderText='Enter a date'
                                                dateFormat='dd/MM/yyyy'
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-2"></div>
                                <div className="col-md-4">
                                    <div className="card timer-div">
                                        <div className="card-body">
                                            <p className="mb-2">Task Timer</p>
                                            <div style={{ textAlign: 'center' }}>
                                            </div>

                                            <div className="timer-content" id="stopwatch">
                                                <span className="min-time"><span className="time-txt">min</span><span className="time-num">{minutes}</span></span>
                                                <span className="dots">:</span>
                                                <span className="sec-time"><span className="time-txt">sec</span><span className="time-num">{seconds}</span></span>
                                            </div>
                                            <div id="buttons">
                                                <button id="startTimer" className="btn btn-sm btn-success" onClick={start}>Start</button>
                                                <button id="pauseTimer" className="btn btn-sm btn-warning" onClick={pause}>Stop</button>
                                                <button id="resetTimer" className="btn btn-sm btn-danger" onClick={reset}>Reset</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </TabPanel>

                <TabPanel >
                    <div className="card">
                        <h4 className="card-header">
                            Time Logs
                        </h4>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    Total Time Logs: {minutes} : {seconds}
                                </div>
                            </div>

                            <table className='table table-bordered table-sm mt-4'>
                                <tr>
                                    <th>Category</th>
                                    <th>Logged By</th>
                                    <th>Performed By</th>
                                    <th>Date</th>
                                    <th>Time Amount</th>
                                </tr>
                            </table>
                        </div>
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className="card">
                        <h4 className="card-header">
                            Devices
                        </h4>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-3">Enable Measurements</div>
                                <div className="col-md-3"><input type="text" className="form-control" placeholder="Select one to add" /></div>

                            </div>
                            <br />

                            <table className='table table-bordered table-sm mt-4'>
                                <th>Enabled Metric</th>
                                <th>Description</th>
                                <th>Device</th>
                                <th>Actions</th>
                            </table>
                            <br />

                            <div className="row">
                                <div className="col-md-8">
                                    <h6><span className="badge badge-primary">Provider Registered Devices</span></h6>
                                    <table className="table table-bordered table-striped table-hover table-sm">
                                        <thead>
                                            <tr>
                                                <th>Device Name</th>
                                                <th>Device ID</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {renderDeviceData()}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-md-4">
                                    <form>
                                        <h6><span className="badge badge-primary"> Add a Device</span></h6>
                                        <select value={deviceType} onChange={e => setDeviceType(e.target.value)} className="form-control mb-2 mr-sm-2">
                                            <option value="">Select Device</option>
                                            <option value="BP">Blood Pressure</option>
                                            <option value="BG">Blood Glucose</option>
                                            <option value="WS">Weight</option>
                                        </select>
                                        <input type="text" value={deviceId} onChange={e => setDeviceId(e.target.value)} className="form-control mb-2 mr-sm-2" placeholder="Enter device ID " />
                                        <button type='button' onClick={() => coreContext.addDevice(deviceType, deviceId, props.match.params.patient)} className="btn btn-primary mb-2">Add Device</button>
                                    </form>
                                </div>
                            </div>
                            <div className="card" style={{ backgroundColor: '#b8b133' }}>
                                <div className='card-body' onClick={() => setShowNotesTextBox(true)}> This patient has not any supplied devices to their portal. You will NOT be able to bill for 99453 or 99454. </div>
                            </div>


                            {/* <table className='table table-bordered table-sm mt-4'>
                                <th>Device</th>
                                <th>Device ID</th>
                                <th>Connected At</th>
                                <th>Last Measurement At</th>
                                <th>Actions</th>
                            </table> */}

                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="card">
                        <h4 className="card-header">
                            Portal
                        </h4>
                        <div className="card-body">
                            Portal Status:   <Button variant="success">Enable Portal Status</Button>
                        </div>
                    </div>
                </TabPanel>
            </Tabs>
    }

    return (<div className='card'>
        <div>
            <button type='button' style={{ width: '250px' }} onClick={() => coreContext.UpdateTimeLog(props.match.params.patient, userId, { minutes }, { seconds })} className="btn btn-primary mb-2 float-right"> Update Time Log</button>
        </div>
        <div onClick={() => setShowNotesTextBox(false)} className="card-header">{renderTopDetails()}</div>
        <div onClick={() => setShowNotesTextBox(false)} className="card-header">{renderAddModifyFlags()}</div>
        <div className="card-header">{renderAddNotes()}</div>

        <div className="row">
            <div className="col-md-8">
                <div onClick={() => setShowNotesTextBox(false)} className="card-header">{renderExpandCollapse()}</div>
                <div onClick={() => setShowNotesTextBox(false)} className="card-header">{renderPatientinformation()} </div>

            </div>
            <div className="col-md-4">
                <div style={{ fontSize: 12 }} className="card shadow p-3 mb-2 mt-3 bg-white rounded">
                    <div style={{ height: '140px', overflowY: 'auto' }}>
                        {renderThreads()}
                    </div>

                    <div>
                        <Form.Label>Send a reply</Form.Label>
                        <Form.Control autoFocus size="sm" as="textarea" rows={2} onChange={e => onSendMessage(e.target.value)} value={message} placeholder="Enter your message" />
                    </div>

                </div>
            </div>
        </div>
        <div onClick={() => setShowNotesTextBox(false)} className="card-header">{renderTabs()}</div>

    </div>)

};



export { PatientSummary }