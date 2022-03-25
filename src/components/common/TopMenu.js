import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Modal,
  Form,
  Row,
  Col,
  FormControl,
} from "react-bootstrap";
import Moment from "moment";
import {
  Envelope,
  ChatLeftText,
  BoxArrowLeft,
  FileMedicalFill,
  FileMedical,
  PencilSquare,
  Bell,
  Gear,
  People,
  PersonLinesFill,
  Speedometer,
  Speedometer2,
  PersonPlusFill,
  BoxArrowRight,
  Telephone,
  PersonFill,
  SuitHeartFill,
  ThermometerHigh,
  Weight,
} from "react-bootstrap-icons";
import {
  GiCook,
  GiAbstract071,
  GiAcid,
  GiWeight,
  GiAerialSignal,
  GiOrangeSlice,
  GiCagedBall,
} from "react-icons/gi";
//import Profile from 'https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59094041-stock-illustration-medical-doctor-profile.jpg';
import { CoreContext } from "../../context/core-context";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { ImMenu } from "react-icons/im";
import Input from "./Input";
import { useForm } from "react-hook-form";
import PropTypes from 'prop-types';
// import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const TopMenu = ({ changestyle, showSidebar }) => {
  const coreContext = useContext(CoreContext);

  const [show, setShow] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleMessageModalClose = () => setShowMessageModal(false);
  const handleMessageModalShow = () => setShowMessageModal(true);

  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [pwd, setpwd] = useState("");
  const [firstName, setfirstName] = useState("");
  const [middleName, setmiddleName] = useState("");
  const [lastName, setlastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [language, setLanguage] = useState("");
  const [ehrId, setEhrId] = useState("");
  const [dcount, setdcount] = useState([""]);
  const [diagnosisId, setDiagnosisId] = useState("");
  const [isccm, setIsccm] = useState(false);
  const [ispcm, setIspcm] = useState(false);
  const [isrpm, setIsrpm] = useState(false);
  const [pcm, setPcm] = useState("");
  const [pp, setPp] = useState("");
  const [ppname, setPpname] = useState("");
  const [homePhone, setHomePhone] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [patientid, setPatientid] = useState("");
  const [ispatient, setIsPatient] = useState("");
  const [workPhone, setWorkPhone] = useState("");
  const [preferred, setPreferred] = useState("");
  const [phoneNotes, setPhoneNotes] = useState("");
  const [email, setEmail] = useState("");
  const [hasMobile, setHasMobile] = useState(false);
  const [sendSms, setSendSms] = useState(false);
  const [street, setStreet] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pos, setPos] = useState("");
  const [raf, setRaf] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([coreContext.patients]);
  const [patientName, setPatientName] = useState("");
  const [notificationValue,setNotificationValue]=useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleSearchOpen = () => {
    setShowSearch(true);
  };
  const handleSearchClose = () => {
    setShowSearch(false);
  };
  const handleClose1 = () => {
    setOpen(false);
  };
  const handledcount = (index,val) => {
    const value=[...dcount]
    value[index]=val
    setdcount(value);
    
  };

  const fetchtd=()=>{
    let userType = localStorage.getItem("userType");
    let patientId = localStorage.getItem("userId");
    coreContext.fetchThresold(
      "ADMIN_PATIENT",
      "patient"
    );
    coreContext.fetchBloodPressure(patientId, userType);
    coreContext.fetchBloodGlucose(patientId, userType);
    coreContext.fetchWSData(patientId,userType);
    coreContext.fetchPatientListfromApi(userType, patientId);
  }
  const fetchadmintd=()=>{
    coreContext.fetchadminThresold("ADMIN_ADMIN_", "admin")
  }
  const fetchdbnotification=()=>{
coreContext.FetchNotification(localStorage.getItem("userId"))
  }
  useEffect(() => {
    if(window.location.href.indexOf("patient-summary") <=0){
      fetchadmintd();fetchtd();fetchdbnotification();
    }
    
  }, []);
  const markasread=()=>{
    notificationValue.sort(function(a,b){
 
      return new Date(b.date) - new Date(a.date);
    }).map((curr)=>{
      coreContext.AddNotification(curr.value,"admin",localStorage.getItem("userId"))
             })
             setNotificationValue([]);
    
  }

  const FetchNotificationForBP=()=>{
    var date = new Date();
date.setDate(date.getDate() - 7);
date.setHours(0,0,0,0)

    coreContext.patients.map((patient)=>{
      coreContext.bloodpressureData.filter((data)=>data.MeasurementDateTime>date).map((bp)=>{
        if(patient.userId===bp.UserId){
          coreContext.thresoldData.map((td)=>{
            if(td.UserId.includes(patient.userId)){
              if(Number(bp.diastolic)>Number(td.diastolic_high) || Number(bp.diastolic)<Number(td.diastolic_low)){
                if(notificationValue.includes(patient.name+"~"+patient.userId+"~"+bp.diastolic+"~"+Moment(bp.MeasurementDateTime).format(
                  "MM-DD-YYYY hh:mm A"
                )+"~Diastolic")===false)
                {
                  if(coreContext.notifications.includes(patient.name+"~"+patient.userId+"~"+bp.diastolic+"~"+Moment(bp.MeasurementDateTime).format(
                    "MM-DD-YYYY hh:mm A"
                  )+"~Diastolic")===false){
                    notificationValue.push({"value":patient.name+"~"+patient.userId+"~"+bp.diastolic+"~"+Moment(bp.MeasurementDateTime).format(
                      "MM-DD-YYYY hh:mm A"
                    )+"~Diastolic","date":bp.MeasurementDateTime})
  
                  }
                  
                }
                
              }
              if(Number(bp.systolic)>Number(td.systolic_high) || Number(bp.systolic)<Number(td.systolic_low )){
                if(notificationValue.includes(patient.name+"~"+patient.userId+"~"+bp.systolic+"~"+Moment(bp.MeasurementDateTime).format(
                  "MM-DD-YYYY hh:mm A"
                )+"~Systolic")===false){
                  if(coreContext.notifications.includes(patient.name+"~"+patient.userId+"~"+bp.systolic+"~"+Moment(bp.MeasurementDateTime).format(
                    "MM-DD-YYYY hh:mm A"
                  )+"~Systolic")===false){
                    notificationValue.push({"value":patient.name+"~"+patient.userId+"~"+bp.systolic+"~"+Moment(bp.MeasurementDateTime).format(
                      "MM-DD-YYYY hh:mm A"
                    )+"~Systolic","date":bp.MeasurementDateTime})
                  }
                  
                }
                
               }
            }
            

          })

        }
        
      }
      
      
      )

    })
   
    
  }
  const FetchNotificationForBG=()=>{
    var date = new Date();
    date.setDate(date.getDate() - 7);
    date.setHours(0,0,0,0)
    coreContext.patients.map((patient)=>{
      coreContext.bloodglucoseData.filter((data)=>data.MeasurementDateTime>date).map((bg)=>{
        if(patient.userId===bg.userId){
          coreContext.thresoldData.map((td)=>{
            if(td.UserId.includes(patient.userId)){
              
              if(Number(bg.bloodglucosemgdl)>Number(td.bg_high) || Number(bg.bloodglucosemgdl)<Number(td.bg_low)){
                if(notificationValue.includes(patient.name+"~"+patient.userId+"~"+bg.bloodglucosemgdl+"~"+Moment(bg.MeasurementDateTime).format(
                  "MM-DD-YYYY hh:mm A"
                )+"~Blood Glucose")===false){
                  if(coreContext.notifications.includes(patient.name+"~"+patient.userId+"~"+bg.bloodglucosemgdl+"~"+Moment(bg.MeasurementDateTime).format(
                    "MM-DD-YYYY hh:mm A"
                  )+"~Blood Glucose")===false){
                    notificationValue.push({"value":patient.name+"~"+patient.userId+"~"+bg.bloodglucosemgdl+"~"+Moment(bg.MeasurementDateTime).format(
                      "MM-DD-YYYY hh:mm A"
                    )+"~Blood Glucose","date":bg.MeasurementDateTime})
                  }
                  
                }
                 
               }
            }
            

          })

        }
        
      }
      
      
      )

    })
  }
  useEffect(()=>{
    // console.log(coreContext.thresoldData,coreContext.patients,coreContext.bloodglucoseData,"checking threshold from top menu")
    if(coreContext.thresoldData.length>0 && coreContext.patients.length>0 && coreContext.bloodglucoseData.length>0 &&  window.location.href.indexOf("patient-summary") <0 && coreContext.notifications.length>0){
      
      FetchNotificationForBG();
      
    }
  },[coreContext.thresoldData.length,coreContext.patients.length,coreContext.bloodglucoseData.length,notificationValue  ,coreContext.notifications.length])


  useEffect(()=>{
    // console.log(coreContext.thresoldData,coreContext.patients,coreContext.bloodglucoseData,"checking threshold from top menu")
    if(coreContext.thresoldData.length>0 && coreContext.patients.length>0 && coreContext.bloodpressureData.length>0 &&  window.location.href.indexOf("patient-summary") <= 0 && coreContext.notifications.length>0){
      FetchNotificationForBP();
      
      
    }
  },[coreContext.thresoldData.length,coreContext.patients.length,coreContext.bloodpressureData.length,notificationValue,coreContext.notifications.length])
  
  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  const onChange = (event, { newValue }) => {
    setValue(newValue.name);
    setMobilePhone(newValue.mobile_phone);
  };

  const fetchProviders = () => {
    coreContext.fetchProviders();
  };

  const fetchCareCoordinator = () => {
    coreContext.fetchCareCoordinator();
  };

  const onEmailChangedHandler = (e) => {
    setEmail(e.target.value);
    setUserName(e.target.value);
  };

  useEffect(fetchProviders, []);
  // useEffect(console.log(pp), [pp]);
  useEffect(()=>{
    console.log(pp);
    console.log(ppname)
  },[pp])

  useEffect(fetchCareCoordinator, []);
const handlechangeprovider=(p)=>{
  setPp(p)
  let c;
  coreContext.providerOptions.map((curr)=>{
    if(curr.value===p){
      c=curr.name
    }

  })
  console.log(c)
  setPpname(c)
}
  // const fetchPatients = () => {
  //     coreContext.fetchPatients();

  // }

  // useEffect(fetchPatients, [coreContext.patients.length]);
  const toggleIsccm = (a) => {
    if (a) setIsccm(false);
    else setIsccm(true);
  };
  const toggleIspcm = (a) => {
    if (a) setIspcm(false);
    else setIspcm(true);
  };
  const toggleIsrpm = (a) => {
    if (a) setIsrpm(false);
    else setIsrpm(true);
  };
  const toggleHasMobile = (a) => {
    if (a) setHasMobile(false);
    else setHasMobile(true);
  };
  const toggleSendSms = (a) => {
    if (a) setSendSms(false);
    else setSendSms(true);
  };

  const onCreatePatientSubmit = () => {
    
    if (!userName) {
      alert("Enter user name...");
      return;
    }
    if (!pwd) {
      alert("Enter password...");
      return;
    }
    
    if (pwd.length < 8) {
      alert("Your password needs a minimum of 8 characters")
      return;
    } else if (pwd.search(/[a-z]/) < 0) {
      alert("Your password needs a lower case letter")
      return;
    } else if(pwd.search(/[A-Z]/) < 0) {
      alert("Your password needs an uppser case letter")
      return;
    } else  if (pwd.search(/[0-9]/) < 0) {
      alert("Your password needs a number")
      return;
    } else  if (pwd.search(/[!@#$%^&()~":<>?]/) < 0) {
      alert("Your password needs a Speacial Character")
      return;
    } 
    if (!birthDate) {
      alert("Enter date of birth...");
      return;
    }
    if (!gender) {
      alert("Choose gender...");
      return;
    }
    if (!firstName) {
      alert("Enter First Name .");
      return;
    }
    if (!lastName) {
      alert("Enter Last Name .");
      return;
    }
    if (!email) {
      alert("Enter email...");
      return;
    }
    var newId= ""
    dcount.map((curr)=>{
      newId=newId+","+curr
    })
    setDiagnosisId(newId)
    coreContext.Registration(
      userName,
      firstName,
      middleName,
      lastName,
      email,
      mobilePhone,
      pwd,
      birthDate,
      gender,
      language,
      workPhone,
      mobilePhone,
      street,
      zip,
      city,
      state,
      pcm,
      pp,
      ppname,
      newId.substring(1)
    );
    handleClose();
  };

  const onSendMessage = () => {
    axios
      .post("send-sms", { mobilePhone, message })
      .then((response) => {
        const status = response.data.status;
        if (status.trim() === "success") {
          coreContext.fetchMessages();
          coreContext.fetchThreadMessages("to", mobilePhone);
          setShowMessageModal(false);

          const url = "patient-summary/" + patientid;

          if (!window.location.href.includes("/patient-summary/")) {
            window.location.href = url;
          }

          //Call dashboard
          // alert('Message Sent successfully....');
        } else alert("Message Sending failed");
      })
      .catch(() => alert("Message Sending failed"));
  };

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    // the item hovered
    setMobilePhone(result.mobile_phone);
    setPatientid(result.id);
    console.log(result);
  };

  const handleOnSelect = (item) => {
    // setMobilePhone(item.mobile_phone);
    setPatientid(item.id);

    if (item.name != "") {
      const url = "/patient-summary/" + btoa(item.userId);

      if (!window.location.href.includes("/patient-summary/")) {
        window.location.href = url;
      } else {
        alert("This is already patient summary page.");
      }
    }
    // the item selected
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const handleAddPatient = () => {
    setShowMessageModal(false);
    handleShow();
  };

  const onSearch = () => {
    //alert('Enter clicked!!!' + userName);
    const userType = localStorage.getItem("userType");
    const userId = localStorage.getItem("userId");
    if (patientName == "") return;
    if (coreContext.patients.length == 0) {
      //coreContext.fetchPatientListfromApi(userType, userId);
      alert("Please open patient information page and search.");
      return;
    }
    let userName = patientName.target.value;
    if (userName != "") {
      let patient = coreContext.patients.filter((app) =>
        app.name.toLowerCase().includes(userName)
      )[0];
      const url = "/patient-summary/" + btoa(patient.userId);

      if (!window.location.href.includes("/patient-summary/")) {
        window.location.href = url;
      } else {
        alert("This is already patient summary page.");
      }
    }
  };

  const renderPatientMenu = () => {
    const userType = localStorage.getItem("userType");
    if (userType !== "patient")
      return (
        // <NavDropdown
        //   title={
        //     <div style={{ display: "inline-block" }}>
        //       <People /> Patients{" "}
        //     </div>
        //   }
        //   id="collasible-nav-dropdown">
        //   <NavDropdown.Item href="/patients">
        //     <PersonLinesFill /> List
        //   </NavDropdown.Item>
        //   <NavDropdown.Item href="#" onClick={handleShow}>
        //     <PencilSquare /> Add
        //   </NavDropdown.Item>
        // </NavDropdown>
        <li className="list-inline-item mr-10">
	<div className="btn-group">
<div className="dropdown pt-4">
<a className="dropdown-toggle dropdown-toggle-1 mb-1 text-white" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
<i className="icon text-white bi-person-circle"></i> Patients
</a>
<div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
<a className="dropdown-item" href="/patients"><i className="icon bi-list-ul"></i> List</a>
<a className="dropdown-item" href="#" onClick={handleShow}><i className="icon bi-file-plus-fill"></i> Add</a>
</div>
</div>
</div>
	</li>
      );
  };

  const renderClinicalDataMenu = () => {
    const userType = localStorage.getItem("userType");
    if (userType === "patient")
      return (
        <NavDropdown
          title={
            <div style={{ display: "inline-block" }}>
              <FileMedicalFill /> Clinical Data{" "}
            </div>
          }
          id="collasible-nav-dropdown">
          <NavDropdown.Item href="#">
            <PersonLinesFill /> Allergies
          </NavDropdown.Item>
          <NavDropdown.Item href="#">
            <PencilSquare /> Lab Results
          </NavDropdown.Item>
          <NavDropdown.Item href="#">
            <PencilSquare /> Medications
          </NavDropdown.Item>
          {/* <NavDropdown.Item href="#" onClick={handleShow}><PencilSquare /> Vitals</NavDropdown.Item> */}
        </NavDropdown>
      );
  };

  const renderVitalMenu = () => {
    const userType = localStorage.getItem("userType");
    if (userType === "patient")
      return (
        <NavDropdown
          title={
            <div style={{ display: "inline-block" }}>
              <FileMedical /> Vitals{" "}
            </div>
          }
          id="collasible-nav-dropdown">
          <NavDropdown.Item href="/bloodpressure">
            <GiAbstract071 size={20} /> Blood Pressure
          </NavDropdown.Item>
          <NavDropdown.Item href="/bloodglucose">
            <GiAcid size={20} /> Blood Glucose
          </NavDropdown.Item>
          <NavDropdown.Item href="/weight">
            <GiWeight size={20} /> Weight{" "}
          </NavDropdown.Item>
          <NavDropdown.Item href="/thresold">
            <GiAerialSignal size={20} /> Threshold
          </NavDropdown.Item>
        </NavDropdown>
      );
  };

  const renderpatientSearch = () => {
    const userType = localStorage.getItem("userType");
    if (userType !== "patient")
      return (
        <Form inline>
          <div className="col-sm-4">
            {/* <input
                name="name"
                type="text"
                style={{  height: '38px', width: '200px' }}
                onKeyPress={event => {
                    setPatientName(event);
                   }}
                placeholder="Search patients..."
              /> */}
            {renderPatients()}
            <div className="col-sm-4">
              <header>
                <div style={{ width: 420 }}>
                  <ReactSearchAutocomplete
                    items={coreContext.patients}
                    onSearch={handleOnSearch}
                    onHover={handleOnHover}
                    onSelect={handleOnSelect}
                    onFocus={handleOnFocus}
                    autoFocus
                  />
                </div>
              </header>
            </div>
            {/* <input
                name="name"
                type="button"
                width="380" value="Search" style={{ marginLeft: '5px',  height: '38px', width: '200px' }}
                onClick={onSearch}
              /> */}
          </div>

          {/* <FormControl 
            placeholder="Search patients..."
            aria-label="Search patients..."
            aria-describedby="basic-addon1" onKeyPress={event => {
                if (event.key === "Enter") {
                  search(event);
                }}}
          
        /> */}
        </Form>
      );
  };
  const renderPatients = () => {
    if (coreContext.patients.length > 0) {
    }
  };
  const rendernotificationlength=()=>{
    return(
      
      <Nav.Link href="#" >
              <span className="badge badge-danger" onClick={handleClickOpen}>
                {notificationValue.length}
                
                
</span>
<Bell onClick={handleClickOpen}/>
              </Nav.Link>



      )

  }
  const rendernotifications=()=>{
    return(<>
    
    <div className="dropdown-menu dropdown-menu-end wide notification-dropdown scroll-out" id="notifications">
<div className="scroll-default">
	<button type="button" className="btn btn-primary mb-3" onClick={()=>{markasread()}}>Mark all read</button>
<ul className="list-unstyled border-last-none">
                  {

      notificationValue.sort(function(a,b){
 
        return new Date(b.date) - new Date(a.date);
      }).map((curr)=>{
                 return(
                   <>
                 

                        <li className="mb-2 pb-2 border-bottom border-separator-light d-flex">
<div className="align-self-left">
<p className="mb-0">{curr.value.split("~")[0]} has crossed the  threshold with {curr.value.split("~")[4]} reading {curr.value.split("~")[2]} on {curr.value.split("~")[3]}</p>
	<a href="#" onClick={()=>{coreContext.AddNotification(curr.value,"admin",localStorage.getItem("userId"));notificationValue.splice(notificationValue.findIndex(a => a.value === curr.value) , 1);handleClose1()}}>Mark as read</a>
</div>
</li>
                 
                 
                  
                    </>
                 )
               })}
 </ul>
</div>
</div>
    </>)
  }
  //const count=React.useMemo({notificationValue.length,[notificationValue.length])
    const count=React.useMemo(()=>rendernotificationlength(),[notificationValue.length])
    const count1=React.useMemo(()=>rendernotifications(),[notificationValue.length])
    useEffect(() => {
   
      return () => {
        coreContext.cleanup();
      };
    },[window.location.href.indexOf("patient-summary") >0]);
  return (
    <>
      <React.Fragment>
      <div id="nav" className="nav-container d-flex">
<div className="nav-content d-flex">
<div class="logo position-relative">
<a href="/dashboard">
<div class="img">A Pattern Plus</div>
</a>
</div>

<div className="user-container d-flex">
<a href="#" className="d-flex user position-relative" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
<img className="profile" alt="profile" src="https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59094041-stock-illustration-medical-doctor-profile.jpg"/>
<div className="name">{
                  localStorage.getItem("userName")
                    ? localStorage.getItem("userName")
                    : "Guest"
                }</div>
</a>
<div className="dropdown-menu dropdown-menu-end user-menu wide">

<div className="row mb-1 ms-0 me-0">

<div className="col-12 ps-1 pe-1">
<ul className="list-unstyled">
<li>
<a href="/profile">
<i className="icon bi-person-circle"></i>
<span className="align-middle">My Profile</span>
</a>
</li>
<li>
<a href="#" onClick={handleShow}>
<i className="icon bi-person-fill"></i>
<span className="align-middle">Create Patient</span>
</a>
</li>
</ul>
</div>
<div className="col-12 pe-1 ps-1">
<ul className="list-unstyled">
<li>
<a href="/settings">
<i className="icon bi-gear-fill"></i>
<span className="align-middle">Settings</span>
</a>
</li>
<li>
<a href="/logout">
<i className="icon bi-box-arrow-right"></i>
<span className="align-middle">Logout</span>
</a>
</li>
</ul>
</div>
</div>
</div>
</div>
<ul className="list-unstyled list-inline text-center menu-icons">
	<li className="list-inline-item mr-10">
	<div className="btn-group">
<div className="dropdown pt-4">
<a className="dropdown-toggle dropdown-toggle-1 mb-1 text-white" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
<i className="icon text-white bi-envelope"></i> Mailbox
</a>
<div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
<a className="dropdown-item" href="/inbox"><i className="icon bi-inbox"></i>  Inbox</a>
<a className="dropdown-item" href="/outbox"><i className="icon bi-envelope-open"></i> Outbox</a>
</div>
</div>
</div>
	</li>
	<li className="list-inline-item mr-10">
	<div className="btn-group">
<div className="dropdown pt-4">
<a className="dropdown-toggle dropdown-toggle-1 mb-1 text-white" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
<i className="icon text-white bi-envelope-open"></i> Messages
</a>
<div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
	<a className="dropdown-item" href="/telephone"><i className="icon bi-chat-left-dots"></i> Call</a>
<a className="dropdown-item" href="#" onClick={handleMessageModalShow}><i className="icon bi-envelope-open"></i> SMS</a>
</div>
</div>
</div>
	</li>
	{renderPatientMenu()}
  {renderClinicalDataMenu()}
              {renderVitalMenu()}
	
<li className="list-inline-item">
<a href="#" data-bs-toggle="modal"data-bs-target="#searchPagesModal" onClick={()=>handleSearchOpen()}>
	<i className="icon text-white bi-search"></i>
</a>
</li>
{/* <li className="list-inline-item">{renderpatientSearch()}</li> */}

{(window.location.href.indexOf("patient-summary") <=0)?
<li className="list-inline-item">
<a href="#" data-bs-toggle="dropdown" data-bs-target="#notifications" aria-haspopup="true" aria-expanded="false" className="notification-button">
<div className="position-relative d-inline-flex">
<i className="icon text-white bi-bell"></i>
<span className="notificaion-show badge bg-danger">{notificationValue.length}</span>
</div>
</a>
{count1}
</li>:null}
	
	
</ul>
<div className="menu-container flex-grow-1">
<ul id="menu" className="menu">


</ul>
</div>
<div className="mobile-buttons-container">
<a href="#" id="scrollSpyButton" className="spy-button" data-bs-toggle="dropdown">
<i className="icon bi-list text-white display-3"></i>
	
</a>
<div className="dropdown-menu dropdown-menu-end" id="scrollSpyDropdown"></div>
<a href="#" id="mobileMenuButton" className="menu-button">
<i className="icon bi-list text-white display-3"></i>
</a>
</div>
</div>
<div className="nav-shadow"></div>
</div>

        <Modal
          show={coreContext.showPatientConfirmationModal}
          onHide={coreContext.handlePatientConfirmationModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Verification Code</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Enter the verification code sent on your Email ID {userName}</p>
            <input
              type="text"
              className="form-control"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() =>
                coreContext.verifyProviderVerificationCode(
                  verificationCode,
                  userName
                )
              }>
              Submit
            </Button>
            <Button
              variant="secondary"
              onClick={coreContext.handleProviderModalClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={showSearch}
          onHide={handleSearchClose}>
          <Modal.Header closeButton>
            <Modal.Title>Search Patient</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
 (localStorage.getItem("userType")!== "patient")?
     
        <Form inline>
          <div className="col-sm-12">
            {/* <input
                name="name"
                type="text"
                style={{  height: '38px', width: '200px' }}
                onKeyPress={event => {
                    setPatientName(event);
                   }}
                placeholder="Search patients..."
              /> */}
            {renderPatients()}
            <div className="col-sm-12">
              <header>
                <div style={{ width: "100%" }}>
                  <ReactSearchAutocomplete
                    items={coreContext.patients}
                    onSearch={handleOnSearch}
                    onHover={handleOnHover}
                    onSelect={handleOnSelect}
                    onFocus={handleOnFocus}
                    autoFocus
                  />
                </div>
              </header>
            </div>
            {/* <input
                name="name"
                type="button"
                width="380" value="Search" style={{ marginLeft: '5px',  height: '38px', width: '200px' }}
                onClick={onSearch}
              /> */}
          </div>

          {/* <FormControl 
            placeholder="Search patients..."
            aria-label="Search patients..."
            aria-describedby="basic-addon1" onKeyPress={event => {
                if (event.key === "Enter") {
                  search(event);
                }}}
          
        /> */}
        </Form>
     :null
}
          </Modal.Body>
          
        </Modal>

        <Modal show={showMessageModal} onHide={handleMessageModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Send SMS</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Mobile Number*</Form.Label>
              {/* <Form.Control
maxLength="50" size="sm" type="text" onChange={e => setMobilePhone(e.target.value)} value={mobilePhone} placeholder="Enter mobile number" /> */}

              {renderPatients()}
              <div className="rowC">
                <header>
                  <div style={{ width: 420 }}>
                    <ReactSearchAutocomplete
                      items={coreContext.patients}
                      onSearch={handleOnSearch}
                      onHover={handleOnHover}
                      onSelect={handleOnSelect}
                      onFocus={handleOnFocus}
                      fuseOptions={{ keys: ["name", "mobile_phone"] }}
                      autoFocus
                    />
                  </div>
                </header>
                <div>
                  <Nav.Link href="#" onClick={handleAddPatient}>
                    <PersonPlusFill />
                  </Nav.Link>
                </div>
              </div>

              {/* <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                    /> */}
            </Form.Group>
            <Form.Group>
              <Form.Label>Description*</Form.Label>
              <Form.Control
maxLength="50"
                type="reset"
                size="sm"
                as="textarea"
                rows={3}
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                placeholder="Enter message"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={onSendMessage}>
              Send SMS
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal size="lg" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Patient</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Email*</Form.Label>
                  <Form.Control
maxLength="50"
                    size="sm"
                    type="email"
                    placeholder="Email"
                    onChange={onEmailChangedHandler}
                    value={email}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Password*</Form.Label>
                  <Form.Control
maxLength="50"
                    size="sm"
                    type="password"
                    onChange={(e) => setpwd(e.target.value)}
                    value={pwd}
                    placeholder="Enter Password"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
maxLength="50"
                    size="sm"
                    readOnly={true}
                    type="text"
                    value={userName}
                    placeholder="Enter user name"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>First Name*</Form.Label>
                  <Form.Control
maxLength="50"
                    size="sm"
                    type="text"
                    onChange={(e) => setfirstName(e.target.value)}
                    value={firstName}
                    placeholder="Enter First name"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Middle Name</Form.Label>
                  <Form.Control
maxLength="50"
                    size="sm"
                    type="text"
                    onChange={(e) => setmiddleName(e.target.value)}
                    value={middleName}
                    placeholder="Enter Middle name"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Last Name*</Form.Label>
                  <Form.Control
maxLength="50"
                    size="sm"
                    type="text"
                    onChange={(e) => setlastName(e.target.value)}
                    value={lastName}
                    placeholder="Enter Last Name"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Date of Birth*</Form.Label>
                  <Form.Control
maxLength="50"
                    size="sm"
                    type="date"
                    placeholder="Enter date"
                    onChange={(e) => setBirthDate(e.target.value)}
                    value={birthDate}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Gender*</Form.Label>
                  <Form.Control
maxLength="50"
                    onChange={(e) => setGender(e.target.value)}
                    value={gender}
                    size="sm"
                    as="select">
                    <option value=""></option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Language</Form.Label>
                  <Form.Control
maxLength="50"
                    onChange={(e) => setLanguage(e.target.value)}
                    value={language}
                    size="sm"
                    as="select">
                    <option value=""></option>
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>

                    {/* <option value='Hindi'>Hindi</option> */}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Diagnosis</Form.Label>
                  {
                  dcount.map((curr,index)=>{
                    return(
                      <>
                      <Form.Control
maxLength="50"
                    onChange={(e) => handledcount(index,e.target.value)}
                    value={dcount[index]}
                    size="sm"
                    type="text"
                    placeholder="Enter Diagnosis"
                  
                  />
                 
                  </>
                    )
                  })}
                   <Button onClick={()=>setdcount([...dcount,""])}>+</Button>
                  
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>Enrolled in Program</Col>
              <Col>
                <Form.Check
                  type="checkbox"
                  label="CCM"
                  onChange={toggleIsccm}
                  value={isccm}
                />
              </Col>
              <Col>
                <Form.Check
                  type="checkbox"
                  label="PCM"
                  onChange={toggleIspcm}
                  value={ispcm}
                />
              </Col>
              <Col>
                <Form.Check
                  type="checkbox"
                  label="RPM"
                  onChange={toggleIsrpm}
                  value={isrpm}
                />
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col>
                <h6>Care Team</h6>
              </Col>
            </Row>
            <Row>
              <Col>
                <form>
                  <Form.Label>Care Coordinator</Form.Label>
                  <Input
                    name="coordinator"
                    required={false}
                    register={register}
                    value={pcm}
                    elementType="select"
                    options={coreContext.careCoordinatorOptions}
                    onChange={(e) => setPcm(e.target.value)}
                  />
                </form>
                {/* <Form.Group>
                            <Form.Label>Care Coordinator</Form.Label>
                            <Form.Control
maxLength="50" size="sm" as="select" onChange={e => setPcm(e.target.value)} value={pcm}>
                                <option value=""></option>
                                <option value="Dykes, Kami">Dykes, Kami</option>
                                <option value="Ortiz, Lisa">Ortiz, Lisa</option>
                                <option value="Ortiz, Lisa">Ortiz, Lisa</option>

                            </Form.Control>
                        </Form.Group> */}
              </Col>
              <Col>
                <form>
                  <Form.Label>Provider</Form.Label>
                  <Input
                    name="provider"
                    required={false}
                    register={register}
                    value={pp}
                    elementType="select"
                    options={coreContext.providerOptions}
                    onChange={(e) => {handlechangeprovider(e.target.value)}}
                    
                  />
                </form>
                {/* <Form.Group>
                            <Form.Label>Providers</Form.Label>
                            <Form.Control
maxLength="50" size="sm" as="select" onChange={e => setPp(e.target.value)} value={pp} options={coreContext.providerOptions} >
                            
                            </Form.Control>
                        </Form.Group> */}
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col>
                <h6>Contact Information</h6>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Home Phone</Form.Label>
                  <Form.Control
maxLength="50"
                    size="sm"
                    type="text"
                    placeholder="Enter home phone"
                    onChange={(e) => setHomePhone(e.target.value)}
                    value={homePhone}
                  />
                </Form.Group>
              </Col>{" "}
              <Col>
                <Form.Group>
                  <Form.Label>Mobile Phone</Form.Label>
                  <Form.Control
maxLength="50"
                    size="sm"
                    type="text"
                    placeholder="Enter mobile phone"
                    onChange={(e) => setMobilePhone(e.target.value)}
                    value={mobilePhone}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Work Phone</Form.Label>
                  <Form.Control
maxLength="50"
                    size="sm"
                    type="text"
                    placeholder="212-333-1234-123"
                    onChange={(e) => setWorkPhone(e.target.value)}
                    value={workPhone}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group>
              <Row>
                <Col>Preferred Phone</Col>
                <Col>
                  <Form.Control
maxLength="50"
                    size="sm"
                    as="select"
                    onChange={(e) => setPreferred(e.target.value)}
                    value={preferred}>
                    <option value=""></option>
                    <option value="Home">Home</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Work">Work</option>
                  </Form.Control>
                </Col>
              </Row>
            </Form.Group>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Phone Notes</Form.Label>
                  <Form.Control
maxLength="50"
                    size="sm"
                    type="text"
                    placeholder="Phone Notes"
                    onChange={(e) => setPhoneNotes(e.target.value)}
                    value={phoneNotes}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              {/* <Col md='2'>
                        <Form.Check
                            type='checkbox'
                            label='Has Mobile'
                            onChange={toggleHasMobile}
                            value={hasMobile}
                        />

                    </Col> */}
              <Col md="2">
                <Form.Check
                  type="checkbox"
                  label="Send SMS"
                  onChange={toggleSendSms}
                  value={sendSms}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Mailing address</Form.Label>
                  <Form.Control
maxLength="50"
                    size="sm"
                    type="text"
                    placeholder="Enter Street Location"
                    onChange={(e) => setStreet(e.target.value)}
                    value={street}
                    
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Zip Code</Form.Label>
                  <Form.Control
maxLength="50"
                    size="sm"
                    type="text"
                    placeholder="Enter ZIP"
                    onChange={(e) => setZip(e.target.value)}
                    value={zip}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>City</Form.Label>
                  <Form.Control
maxLength="50"
                    size="sm"
                    type="text"
                    placeholder="Enter City"
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>State</Form.Label>
                  <Form.Control
maxLength="50"
                    size="sm"
                    type="text"
                    placeholder="Enter State"
                    onChange={(e) => setState(e.target.value)}
                    value={state}
                  />
                </Form.Group>
              </Col>
            </Row>
            {/* <Row style={{ marginTop: 20 }}>
                    <Col>
                        <h6>Additional</h6>
                    </Col>
                </Row> */}
            {/* <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>POS</Form.Label>
                            <Form.Control
maxLength="50" size="sm" as="select" onChange={e => setPos(e.target.value)} value={pos}>
                                <option value=""></option>
                                <option value="Home">Home</option>
                                <option value="Office">Office</option>
                                <option value="Public Health Clinic">Public Health Clinic</option>
                                <option value="Rural Health Clinic">Rural Health Clinic</option>
                                <option value="Assisted Living Facility">Assisted Living Facility</option>
                                <option value="Walk In Retail Health Clinic">Walk In Retail Health Clinic</option>
                                <option value="Urgent Care Facility">Urgent Care Facility</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Risk Scope</Form.Label>
                            <Form.Control
maxLength="50" size="sm" type="text" placeholder="Enter RAF" onChange={e => setRaf(e.target.value)} value={raf} />
                        </Form.Group>
                    </Col>
                </Row> */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={onCreatePatientSubmit}>
              Create Patient
            </Button>
          </Modal.Footer>
        </Modal>
        <div><BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        style={{marginLeft:"70%"}}
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose1}>
          Notifications
        </BootstrapDialogTitle>
        <BootstrapDialogTitle>
         
        <div className="row" style={{float:"right"}}>
      <Button style={{float:"right",fontSize:"14px"}} onClick={()=>{markasread();handleClose1()}}>
                    
              Mark All as Read
              
                  </Button>
                  </div>
       </BootstrapDialogTitle>
        <DialogContent dividers>
         
          
          {count1}
        </DialogContent>
        
      </BootstrapDialog>
    </div>    </React.Fragment>
    </>
  );
};

export default TopMenu;
