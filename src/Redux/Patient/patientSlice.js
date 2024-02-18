import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


 export const sendConfirmationEmail = async ({ email, message, Objet }) => {
  
  try {
    await axios.post('http://localhost:4000/MedicaNet/sendConfirmationEmail', { email, message, Objet });
  
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'e-mail de confirmation :', error);
  }
};


export const addPatientAsync = createAsyncThunk(
  "patient/addPatient",
  async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data.image);
      formData.append("nom", data.nom);
      formData.append("prenom", data.prenom);
      formData.append("adresse", data.adresse);
      formData.append("notePatient", data.notePatient);
      formData.append("age", data.age);
      formData.append("mailPatient", data.mailPatient);
      formData.append("numeroTelephone", data.numeroTelephone);
      formData.append("sexe", data.sexe);

      const response = await axios.post(
        "http://localhost:4000/MedicaNet/patients",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.user) {
        const message = `Cher(e) ${data.prenom},

        Nous sommes ravis de vous informer que votre inscription sur la plateforme MediaNet a bien été enregistrée avec succès.
        
        Votre compte a été créé et vous pouvez désormais accéder à toutes les fonctionnalités offertes par notre plateforme. 
        
        N'hésitez pas à explorer nos services et à profiter de notre contenu varié.
        
        Si vous avez des questions ou avez besoin d'assistance, n'hésitez pas à nous contacter à l'adresse email support@medianet.com.
        
        Merci de faire partie de la communauté MediaNet !

        Cordialement,
        L'équipe MediaNet"`
        
      
       await sendConfirmationEmail({ email: data.mailPatient, message: message, Objet: "Confirmation d'inscription sur MediaNet" });
        toast.success("Patient added Successfully 😊");
      } else {
        
        throw new Error(response.data.error);
      }
      return data;
    } catch (error) {
      toast.error(`Error: ${error.message}`);
      throw error;
    }
  }
);

export const listPatientAsync = createAsyncThunk(
  "patient/listPatient",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/MedicaNet/patients"
      );

      if (response.data) {
        toast.success("list des patients  😊");
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


export const getPatientByIdAsync = createAsyncThunk(
    "patient/getPatientById",
    async (idPatient) => {
  
      try {
        if (idPatient!== undefined) {
          const response = await axios.get(`http://localhost:4000/MedicaNet/patients/${idPatient}`);

          return response.data;
        }
      } catch (error) {
        throw error;
      }
    }
  );


  export const deletePatientByIdAsync = createAsyncThunk(
    "patient/deletePatientById",
    async (idPatient) => {
  
      try {
        if (idPatient!== undefined) {
          const response = await axios.delete(`http://localhost:4000/MedicaNet/patients/${idPatient}`);

          return response.data;
        }
      } catch (error) {
        throw error;
      }
    }
  );

  export const editPatientAsync = createAsyncThunk(
    "patient/editPatientById",
    async ({data,idPatient}) => {
      try {

        const formData = new FormData();
      formData.append("image", data.image);
      formData.append("adresse", data.adresse);
      formData.append("notePatient", data.notePatient);
    
      formData.append("mailPatient", data.mailPatient);
      formData.append("numeroTelephone", data.numeroTelephone);
    


        if (idPatient!== undefined) {
          const response = await axios.put(
            `http://localhost:4000/MedicaNet/patients/${idPatient}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          return response.data;
        }
      
      } catch (error) {
        throw error;
      }
    }
  );

const patientSlice = createSlice({
  name: "patient",
  initialState: {
    data: [],
    patient: {},
    status: "loading", //  loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPatientAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editPatientAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(listPatientAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPatientByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePatientByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addPatientAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.push(action.payload);
      })
      .addCase(getPatientByIdAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.patient = action.payload;
      })
      .addCase(editPatientAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(deletePatientByIdAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(listPatientAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload; // Mise à jour des données du patient
      })
      .addCase(listPatientAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      }) 
      .addCase(getPatientByIdAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editPatientAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deletePatientByIdAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addPatientAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Exportez le réducteur
export default patientSlice.reducer;
