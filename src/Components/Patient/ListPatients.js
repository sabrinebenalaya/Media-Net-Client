import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { listPatientAsync } from '../../Redux/Patient/patientSlice';
import LoadingPage from '../../Constante/LoadingPage';
import { bloc_flex } from '../../Constante/Style';
import CardOfPatient from './CardOfPatient';

function ListPatients() {
  const dispatch = useDispatch();
  const listPatient = useSelector((state) => state.patient.data);

  useEffect(() => {
    dispatch(listPatientAsync());
  }, [dispatch]);
  
  return (
    <>
      {listPatient.length === 0 ? (
        <LoadingPage />
      ) : (
        <div className="vh-100" style={bloc_flex}>
        {Array.isArray(listPatient) && listPatient.map((item, key) => {
            return (
              <CardOfPatient
                key={key}
                patientItem={item}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

export default ListPatients;