import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const addRdvAsync = createAsyncThunk("rdv/addrdv", async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/MedicaNet/rdv",
      data
    );

    if (response.data) {
      toast.success("rdv added Successfully 😊");
    }

    return data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      toast.error(
        "Un rendez-vous existe déjà pour ce patient à cette date. ❌"
      );
    }

    throw error;
  }
});

export const listrdvAsync = createAsyncThunk(
  "rdv/listrdv",
  async (idPatient) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/MedicaNet/rdv/${idPatient}`
      );

      if (!response.data) {
        throw new Error(response.data.error);
      } 

      return response.data;
    } catch (error) {
      toast.error(`Error: ${error.message}`);
      throw error;
    }
  }
);

export const deleterdvByIdAsync = createAsyncThunk(
  "rdv/deleterdvById",
  async (id) => {
    try {
      if (id !== undefined) {
        const response = await axios.delete(
          `http://localhost:4000/MedicaNet/rdv/${id}`
        );

        return response.data;
      }
    } catch (error) {
      throw error;
    }
  }
);

export const editRdvAsync = createAsyncThunk(
  "rdv/editrdvById",
  async ({ data, id }) => {
    try {
      if (id !== undefined) {
        const response = await axios.put(
          `http://localhost:4000/MedicaNet/rdv/${id}`,
          data
        );

        return response.data;
      }
    } catch (error) {
      throw error;
    }
  }
);

export const listProchainRdvAsync = createAsyncThunk(
  "rdv/rdvs",
  async ({ id, status }) => {
    try {

      const response = await axios.get(
        `http://localhost:4000/MedicaNet/rdv/${id}/${status}`
      );

      if (!response.data) {
        throw new Error(response.data.error);
      }

      return response.data;
    } catch (error) {
      toast.error(`Error: ${error.message}`);
      throw error;
    }
  }
);


export const listPrecedentRdvAsync = createAsyncThunk(
  "rdv/prevrdvs",
  async ({ id, status }) => {
    try {

      const response = await axios.get(
        `http://localhost:4000/MedicaNet/rdv/${id}/${status}`
      );

      if (!response.data) {
        throw new Error(response.data.error);
      }

      return response.data;
    } catch (error) {
      toast.error(`Error: ${error.message}`);
      throw error;
    }
  }
);

export const getRdvByIdAsync = createAsyncThunk(
  "rdv/getrdv",
  async (id) => {
    try {

      const response = await axios.get(
        `http://localhost:4000/MedicaNet/rdvs/${id}`
      );

      if (response.data) {
        toast.success("list des rdvs  😊");
      } else {
        throw new Error(response.data.error);
      }

      return response.data;
    } catch (error) {
      toast.error(`Error: ${error.message}`);
      throw error;
    }
  }
);

const rdvSlice = createSlice({
  name: "rdv",
  initialState: {
    data: [],
    dataprev:[],
    dataRdv:{},
    status: "loading", //  loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addRdvAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addRdvAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.push(action.payload);
      })
      .addCase(addRdvAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(getRdvByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getRdvByIdAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dataRdv =action.payload;
      })
      .addCase(getRdvByIdAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(listProchainRdvAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(listProchainRdvAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dataprev = action.payload;
      })
      .addCase(listProchainRdvAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(listPrecedentRdvAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(listPrecedentRdvAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(listPrecedentRdvAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(editRdvAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editRdvAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(editRdvAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(listrdvAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(listrdvAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(listrdvAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(deleterdvByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleterdvByIdAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(deleterdvByIdAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Exportez le réducteur
export default rdvSlice.reducer;
