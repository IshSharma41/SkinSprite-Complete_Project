import React from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../../GlobalFiles/Sidebar';
import { Navigate } from 'react-router-dom';

const PatientProfile = () => {
  const { data } = useSelector((store) => store.auth);

  if (data?.isAuthenticated === false) {
    return <Navigate to={'/'} />;
  }

  if (data?.user.userType !== 'patient') {
    return <Navigate to={'/dashboard'} />;
  }

  return (
    <div className="container">
      <Sidebar />
      <div className="AfterSideBar">
        <div className="mainPatientProfile">
          <div className="firstBox">
            <div>
              <img src={data?.user?.image} alt="patientimg" />
            </div>
            <hr />
            <div className="singleitemdiv">
              <h2>Patient Name: {data?.user?.patientName}</h2>
              {/* Add other basic patient details here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
