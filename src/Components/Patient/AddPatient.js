import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import {  MenuItem, Select, InputLabel, FormControl } from "@mui/material/";

import { useDispatch } from 'react-redux';
import { addPatientAsync } from '../../Redux/Patient/patientSlice';
import { toast } from "react-toastify";

import { imgSingUp, styleCard } from "../../Constante/Style";
const schema = yup.object().shape({
  prenom: yup.string().required("You must enter your first name"),
  nom: yup.string().required("You must enter your last name"),
  mailPatient: yup
    .string()
    .email("You must enter a valid email")
    .required("You must enter a email"),
  adresse: yup.string().required("You must enter your Adresse"),
  notePatient: yup.string(),
  age: yup
    .string()
    .matches(/^\d+$/, "Age must contain only digits")
    .length(2, "Age must be exactly 2 digits long")
    .required("You must enter a Age"),
  numeroTelephone: yup
    .string()
    .matches(
      /^[2-57943]\d{7}$/,
      "Phone number must start with 2, 5, 9, 4, 7, or 3 and must contain exactly 8 digits."
    )
    .required("You must enter a phone number"),
    sexe: yup.string().required("You must enter your sexe").oneOf(['Femme', 'Homme'], 'Invalid sexe'),
 
});

const defaultValues = {
  nom: "",
  prenom: "",
  age: "",
  sexe: "",
  adresse: "",
  mailPatient: "",
  numeroTelephone: "",
  notePatient: "",
  image: null,
};

function AddPatient() {
  const { control, formState, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
    shouldUnregister: true,
  });

  const {  errors, setError } = formState;
  const dispatch = useDispatch();
  async function onSubmit({
    nom,
    prenom,
    age,
    sexe,
    adresse,
    mailPatient,
    numeroTelephone,
    notePatient,
    image,
  }) {
    try {
    
    
      dispatch(addPatientAsync( {nom,
        prenom,
        age,
        sexe,
        adresse,
        mailPatient,
        numeroTelephone,
        notePatient,
        image}));
      
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.msg);
      } else if (Array.isArray(error)) {
        error.forEach((errorItem) => {
          setError(errorItem.type, {
            type: "manual",
            message: errorItem.message,
          });
        });
      } else {
        console.error("Unexpected error:", error);
      }
    }
  }

  

  return (
    <div>
      <section class="text-center">
        <div class="p-5 bg-image" style={imgSingUp}></div>
        <div class="card mx-4 mx-md-5 shadow-5-strong" style={styleCard}>
          <div class="card-body py-5 px-md-5">
            <div class="row d-flex justify-content-center">
              <div class="col-lg-8">
                <h2 class="fw-bold mb-5">Ajoueter Patient</h2>

                <form
                  name="registerForm"
                  noValidate
                  className="flex flex-col justify-center w-full mt-32"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div class="row">
                    <div class="col-md-6 mb-4">
                      <div class="form-outline">
                        <Controller
                          name="prenom"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              className="mb-24"
                              label="Prenom"
                              autoFocus
                              type="prenom"
                              error={!!errors.prenom}
                              helperText={errors?.prenom?.message}
                              variant="outlined"
                              required
                              fullWidth
                            />
                          )}
                        />
                      </div>
                    </div>

                    <div class="col-md-6 mb-4">
                      <div class="form-outline">
                        <Controller
                          name="nom"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              className="mb-24"
                              label="Nom"
                              autoFocus
                              type="text"
                              error={!!errors.nom}
                              helperText={errors?.nom?.message}
                              variant="outlined"
                              required
                              fullWidth
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6 mb-4">
                      <div class="form-outline">
                        <Controller
                          name="age"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              className="mb-24"
                              label="age"
                              type="text"
                              error={!!errors.age}
                              helperText={errors?.age?.message}
                              variant="outlined"
                              required
                              fullWidth
                            />
                          )}
                        />
                      </div>
                    </div>
                    <div class="col-md-6 mb-4">
                      <div class="form-outline">
                      <Controller
                      name="sexe"
                      control={control}
                      render={({ field }) => (
                        <FormControl variant="outlined" fullWidth>
                          <InputLabel htmlFor="sexe">Sexe</InputLabel>
                          <Select
                            {...field}
                            label="Sexe"
                            id="sexe"
                            error={!!errors.sexe}
                            defaultValue="" // Vous pouvez définir une valeur par défaut si nécessaire
                            fullWidth
                          >
                            <MenuItem value="Femme">Femme</MenuItem>
                            <MenuItem value="Homme">Homme</MenuItem>
                          </Select>
                        </FormControl>
                      )}
                    />
                      </div>
                    </div>
                  </div>

                  <div class="form-outline mb-4">
                    <Controller
                      name="adresse"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          className="mb-24"
                          label="Adresse"
                          type="text"
                          error={!!errors.adresse}
                          helperText={errors?.adresse?.message}
                          variant="outlined"
                          required
                          fullWidth
                        />
                      )}
                    />
                  </div>

                  <div class="row">
                    <div class="col-md-6 mb-4">
                      <div class="form-outline">
                        <Controller
                          name="numeroTelephone"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              className="mb-24"
                              label="Phone"
                              type="text"
                              error={!!errors.numeroTelephone}
                              helperText={errors?.numeroTelephone?.message}
                              variant="outlined"
                              required
                              fullWidth
                            />
                          )}
                        />
                      </div>
                    </div>
                    <div class="col-md-6 mb-4">
                      <div class="form-outline">
                        <Controller
                          name="mailPatient"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              className="mb-24"
                              label="Email"
                              type="email"
                              error={!!errors.mailPatient}
                              helperText={errors?.mailPatient?.message}
                              variant="outlined"
                              required
                              fullWidth
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <div class="form-outline mb-4">
                    <Controller
                      name="notePatient"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          className="mb-24"
                          label="Note"
                          placeholder="Note de patient ..."
                          rows={5} // Notez la correction ici, il devrait être "rows" au lieu de "row"
                          multiline // Ceci indique que c'est un champ de texte multiligne
                          autoFocus
                          
                          variant="outlined"
                          required
                          fullWidth
                        />
                      )}
                    />
                  </div>

                  <div class="form-outline mb-4">
                  <Controller
                  name="image"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      className="mb-24"
                      type="file"
                      inputProps={{ accept: 'image/*' }}
                      onChange={(e) => {
                        field.onChange(e.target.files[0]);
                      }}
                    
                      variant="outlined"
                      required
                      fullWidth
                    />
                    )}
/>
                </div>

                  <Button
                    variant="contained"
                    color="secondary"
                    className="w-full mt-24"
                    aria-label="Register"
                    type="submit"
                    size="large"
                  >
                    Ajouter
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AddPatient;
