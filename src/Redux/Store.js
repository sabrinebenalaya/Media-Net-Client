import { configureStore } from '@reduxjs/toolkit';
import patientReducer from './Patient/patientSlice';
import ordonanceReducer from './Ordonance/ordonanceSlice'
import rdvReducer from './Rdv/rdvSlice'
export default configureStore({
  reducer: {
    patient: patientReducer,
    rdv: rdvReducer,
    ordonance: ordonanceReducer,
  },
});