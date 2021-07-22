import React, { useState, useContext, useEffect } from 'react';
import { CoreContext } from '../context/core-context';
import { DataGrid } from '@material-ui/data-grid';

const Deviceinfo = props => {

    const coreContext = useContext(CoreContext);

    useEffect(coreContext.checkLocalAuth, []);
      const fetchDevice = () => {
      const patient = JSON.parse(localStorage.getItem('app_patient'));
      let patientId =  localStorage.getItem("userId");
      let userType = localStorage.getItem("userType");
      let userName = localStorage.getItem("userName");
      if(patient != undefined){
        if(patient.ehrId !== undefined)
        {
          patientId =patient.ehrId;
          userType = 'patient';
          userName = patient.name;
        }
        
      }
     
      if(patientId !==undefined){
        if(userType =="admin")
        {
          coreContext.fetchPateintListfromApi('admin',null);
          if(coreContext.patients.length >0)
          {
            coreContext.fetchDeviceData(patientId,userName,userType, '' , coreContext.patients);
          }
        }
      }
   }

    
    useEffect(fetchDevice, [coreContext.patients.length]);
    
    
   
    const columns = [
        { field: 'username', headerName: 'Patient Name', width: 300 ,  type: 'string'},
        {
          field: 'deviceID',
          headerName: 'Device ID',
          editable: false,
          width: 300
        },
        {
            field: 'DeviceType',
            headerName: 'Device Type',
            width: 310,
            editable: false,
          },
          
      ];
      
      //https://material-ui.com/components/data-grid/

    const renderdeviceinfo = () => {
        if (coreContext.deviceData.length > 0){
        return (
            <div style={{ height: 680, width: '100%' }}>
              <DataGrid
                rows={coreContext.deviceData}
                columns={columns}
                pageSize={10}
                sortModel={[{ field: 'deviceID', sort: 'asc' }]}
              />
            </div>
          );
        }
       
    }

    return <div className='card'>
        <h4 className="card-header">Device information</h4>
       
        <div className="card-body">
        {renderdeviceinfo()}
        </div>
    </div >
}



export { Deviceinfo }