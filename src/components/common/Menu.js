/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { GiCook, GiAbstract071, GiAcid, GiWeight, GiAerialSignal, GiOrangeSlice, GiCagedBall } from 'react-icons/gi';
import { PersonFill } from 'react-bootstrap-icons';
import { NavDropdown } from 'react-bootstrap';
import Footer from './Footer'
const Menu = (props) => {


    const renderCareTeamInformation = () => {

        const userType = localStorage.getItem("userType");
        if (userType === 'admin') {
            return(
                <li className="border-bottom">
                <a href="#" data-bs-target="#account">
                <i className="icon bi-person-circle"></i>
                <span className="label">Care Team</span>
                </a>
                <ul>
                <li>
                <a href="/provider">
                <i className="icon bi-hdd"></i>
                <span className="label"> Provider</span>
                </a>
                </li>
                <li>
                <a href="/care-coordinator">
                <i className="icon bi-person-badge"></i>
                <span className="label"> Care Coordinator</span>
                </a>
                </li>
                    <li>
                <a href="/coach">
                <i className="icon bi-person-circle"></i>
                <span className="label"> Coach</span>
                </a>
                </li>
                
                </ul>
                </li>
            )
        }
        
        // return <React.Fragment>
        //     <NavDropdown title={<div style={{ display: "inline-block" }}><GiCook size={20} /> Care Team </div>} id="collasible-nav-dropdown">
        //         {/* <NavDropdown.Item href="/dashboard"> Dashboard</NavDropdown.Item> */}
        //         <NavDropdown.Item href="/provider"> Provider</NavDropdown.Item>
        //         <NavDropdown.Item href="/care-coordinator" > Care Coordinator</NavDropdown.Item>
        //         <NavDropdown.Item href="/coach"> Coach</NavDropdown.Item>
        //     </NavDropdown>
        //     <NavDropdown.Divider />
        // </React.Fragment>
        // return '';
    }
    const renderAverage = () => {

        const userType = localStorage.getItem("userType");
        if (userType !== 'patient') return <React.Fragment>
            <NavDropdown title={<div style={{ display: "inline-block" }}><GiCook size={20} /> Average </div>} id="collasible-nav-dropdown">
                {/* <NavDropdown.Item href="/dashboard"> Dashboard</NavDropdown.Item> */}
                <NavDropdown.Item href="/bloodpressureaverage"> Blood Pressure</NavDropdown.Item>
                <NavDropdown.Item href="/bloodglucoseaverage"> Blood Glucose</NavDropdown.Item>
                <NavDropdown.Item href="/weightaverage"> Weight</NavDropdown.Item>
                
            </NavDropdown>
            <NavDropdown.Divider />
        </React.Fragment>
        return '';
    }

    const renderOrderInformation = () => {

        const userType = localStorage.getItem("userType");
        if (userType === 'admin' || userType === 'patient'){
            return(
                <li className="border-bottom">
                <a href="#">
                <i className="icon bi-bag-fill"></i>
                <span className="label">  Orders</span>
                </a>
                </li>
            )
        }
        
        // return <React.Fragment> <li className="nav-item">
        //     <a className="nav-link" href="#"><GiOrangeSlice size={20} /> Orders</a>
        // </li>
        //     <NavDropdown.Divider />
        // </React.Fragment>

        // return '';
    }

    const renderDeviceInformation = () => {

        const userType = localStorage.getItem("userType");
        if (userType === 'admin') {
            return(
                <li>
<a href="/device-info">
<i className="icon bi-tablet-fill"></i>
<span className="label"> Device information</span>
</a>
</li>
            )
        }
        
        
        // return <React.Fragment> <li className="nav-item">
        //     <a className="nav-link" href="/device-info"><GiCagedBall size={20} /> Device information</a>
        // </li>
        //     <NavDropdown.Divider />
        // </React.Fragment>

        // return '';
    }

  
    const renderPatientInformation = () => {

        const userType = localStorage.getItem("userType");
        if (userType !== 'patient') {
            return(
<li className="border-bottom">
<a href="/patients">
<i className="icon bi-person"></i>
<span className="label"> Patient Information</span>
</a>
</li>

            )
        }
       
        // <React.Fragment> <li className="nav-item" >
        //     <a className="nav-link" href="/patients"><PersonFill size={20} /> Patient Information</a>
        // </li>
        //     <NavDropdown.Divider />
        // </React.Fragment>
        
      
    }

    const renderDashboard = () => {

        const userType = localStorage.getItem("userType");
        const userId = localStorage.getItem("userId");
        const dUrl = userType === 'patient' ? '/patient-profile/' + userId.split("_").pop() : '/dashboard';
        if (userType === 'doctor') return <React.Fragment> <li className="nav-item">
            <a className="nav-link" href={dUrl}><GiCagedBall size={20} /> Dashboard</a>
        </li>
            <NavDropdown.Divider />
        </React.Fragment>
        else if (userType === 'patient') return <React.Fragment> <li className="nav-item">
            <a className="nav-link" href={dUrl}><GiCagedBall size={20} /> Dashboard</a>
        </li>
            <NavDropdown.Divider />
        </React.Fragment>
        return '';
    }

    return (
        
    // <nav className="navbar sidemenu" variant='light' style={{ backgroundColor: "rgb(1, 41, 113)" }} >

    //     <ul className="navbar-nav col-12 pr-2" style={{  height: "900px" }}>

    //         {renderDashboard()}


    //         {renderPatientInformation()}

    //         {renderCareTeamInformation()}

    //         <li className="nav-item">
    //             <a className="nav-link" href="/bloodpressure"><GiAbstract071 size={20} /> Blood Pressure</a>
    //         </li>
    //         <NavDropdown.Divider />
    //         <li className="nav-item">
    //             <a className="nav-link" href="/bloodglucose"><GiAcid size={20} /> Blood Glucose</a>
    //         </li>
    //         <NavDropdown.Divider />
    //         <li className="nav-item">
    //             <a className="nav-link" href="/weight"><GiWeight size={20} /> Weight</a>
    //         </li>
    //         <NavDropdown.Divider />
    //         {(localStorage.getItem("userType")==="admin")?<><li className="nav-item">
    //             <a className="nav-link" href="/thresold"><GiAerialSignal size={20} /> Thresold</a>
    //         </li> <NavDropdown.Divider /></>:""}
    //        {/* /<NavDropdown.Divider /> */}
    //         {renderOrderInformation()}
    //         {/* {renderAverage()} */}
    //         {renderDeviceInformation()}
    //     </ul>

    // </nav>
    <>
    
    <div className="col-auto d-none d-lg-flex">
<ul className="sw-25 side-menu mb-0 primary" id="menuSide">
{renderPatientInformation()}
{renderCareTeamInformation()}

<li className="border-bottom">
<a href="/bloodpressure">
<i className="icon bi-heart-half"></i>
<span className="label"> Blood Pressure</span>
</a>
</li>
	<li className="border-bottom">
<a href="/bloodglucose">
<i className="icon bi-file-medical"></i>
<span className="label"> Blood Glucose</span>
</a>
</li>
		<li className="border-bottom">
<a href="/weight">
<i className="icon bi-speedometer"></i>
<span className="label"> Weight</span>
</a>
</li>

         {(localStorage.getItem("userType")==="admin")?<>
         		<li className="border-bottom">
<a href="/thresold">
<i className="icon bi-align-bottom"></i>
<span className="label"> Thresold</span>
</a>
</li> </>:""}
           

{renderOrderInformation()}
{renderDeviceInformation()}
</ul>
</div>

    
    </>
    )
}

export default Menu;