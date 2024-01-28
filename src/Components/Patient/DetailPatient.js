import React, { useEffect } from 'react';
import { useDispatch} from 'react-redux';

import { getPatientByIdAsync } from '../../Redux/Patient/patientSlice';
import { useParams } from 'react-router-dom';
import Rdvs from '../Rdv/Rdvs';

function DetailPatient() {
     
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPatientByIdAsync(id));
  }, [dispatch, id]);
  return (
 
    
    <div style={{backgroundColor: '#eee'}} >
   
    <Rdvs status={"prochain"}/>
    
    <Rdvs status={"passer"}/>
   
   {/**  <ListMedicament/> */} 
    </div>
    

  )
}

export default DetailPatient