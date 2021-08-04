import React, { useState, useContext, useEffect } from 'react';
import { CoreContext } from '../context/core-context';
import { DataGrid } from '@material-ui/data-grid';

const BloodGlucose = props => {

    const coreContext = useContext(CoreContext);

    useEffect(coreContext.checkLocalAuth, []);

    
    const [patientId, setPatientId] = useState('');

    const fetchBloodGlucose = () => {
       // const patientId =  localStorage.getItem("userId");
        let userType = localStorage.getItem("userType");
        let patientId = localStorage.getItem("userId");
        // check page if left side menu.
        if(window.location.href.substring('bloodglucose')> 0)
        {

        }
        if(window.location.href.indexOf('patient-summary') >0 )
        {
            patientId = localStorage.getItem("ehrId");
            userType = 'patient';
            // clear this otherwise will be problem
            localStorage.removeItem("ehrId");
        }
        coreContext.fetchBloodGlucose(patientId,userType);
    }

    useEffect(fetchBloodGlucose,  [coreContext.bloodglucoseData.length]);
   
    const columns = [
        { 
          field: 'UserName', 
          headerName: 'Patient Name', 
          width: 200 ,  
          type: 'string',
          renderCell: (params) => (
            <a  href={`/patient-summary/${btoa(params.row.userId)}`}> {params.row.UserName} </a>
          )
        },
        {
          field: 'reading',
          headerName: 'Reading',
          type: 'number',
          editable: false,
          width: 200
        },
        {
          field: 'meal',
          headerName: 'Before/After Meal',
          width: 110,
          editable: false,
          width: 200
        },
        {
            field: 'timeSlots',
            headerName: 'Recorded TimeSlot',
            width: 110,
            editable: false,
            width: 200
          },
          {
            field: 'date_recorded',
            headerName: 'Date Recorded',
            editable: false,
            width: 200
          },
          {
            field: 'reading_id',
            headerName: 'Reading Id',
            type: 'number',
            width: 200,
            editable: false,
          },
          {
            field: 'battery',
            headerName: 'Battery',
            type: 'number',
            width: 200,
            editable: false,
          },
          
          
      ];

    const renderBloodGlucose = () => {
        if (coreContext.bloodglucoseData.length > 0) {
            return (
                <div style={{ height: 680, width: '100%' }}>
                  <DataGrid
                    rows={coreContext.bloodglucoseData}
                    columns={columns}
                    pageSize={10}
                  />
                </div>
              );
            }
    }

    return <div className='card'>
        <h4 className="card-header">BLOOD GLUCOSE INFORMATION</h4>
        <div className="card-body">
        {renderBloodGlucose()}
        </div>
    </div >
}


export { BloodGlucose }