import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export const getAllMedicamentsPrescritsToPatient = createAsyncThunk(
  "medicament/medicaments",
  async ( id) => {
    try {

      const response = await axios.get(
        `http://localhost:4000/MedicaNet/medicaments/${id}`
      );

      if (!response.data) {
        throw new Error(response.data.error);
      }
console.log("response",response.data )

      return response.data;
    } catch (error) {
      toast.error(`Error: ${error.message}`);
      throw error;
    }
  }
);


const medicamentSlice = createSlice({
  name: "medicament",
  initialState: {
    data: [],
    status: "loading", //  loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllMedicamentsPrescritsToPatient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllMedicamentsPrescritsToPatient.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getAllMedicamentsPrescritsToPatient.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

   
  },
});

// Exportez le réducteur
export default medicamentSlice.reducer;
