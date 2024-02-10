import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import patientSlice, { getPatientByIdAsync } from "../Patient/patientSlice";




export const addOrdonanceAsync = createAsyncThunk(
  "ordonnances/addordonnance",
  async (data, { dispatch, getState }) => {
    console.log("data", data);

    try {
      const response = await axios.post(
        "http://localhost:4000/MedicaNet/ordonnance",
        data
      );

    
   if (response.data.ordonnance) {
     
    toast.success("ordonance added Successfully 😊", response.data);
  
      } else {
        
        console.log(response.data.error);
      }

      return response.data.ordonnance;
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      throw error;
    }
  }
);

export const getOrdonnaceByIdRDVAsync = createAsyncThunk(
  "ordonnances/getOrdonnaceByIdRDV",
  async (idRDV) => {

    try {
      if (idRDV!== undefined) {
        const response = await axios.get(`http://localhost:4000/MedicaNet/ordonnance/${idRDV}`);

        return response.data;
      }
    } catch (error) {
   
      throw error;
    }
  }
);






const ordonanceSlice = createSlice({
  name: "ordonnances",
  initialState: {
    data: [],
    ordonnance: {},
    status: "loading", //  loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addOrdonanceAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addOrdonanceAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.push(action.payload);
      })
      .addCase(addOrdonanceAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getOrdonnaceByIdRDVAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrdonnaceByIdRDVAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ordonnance= action.payload;
      })
      .addCase(getOrdonnaceByIdRDVAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

  
  },
});

// Exportez le réducteur
export default ordonanceSlice.reducer;