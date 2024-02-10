import React, { useEffect } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import * as yup from "yup";

import {
  editPatientAsync,
  getPatientByIdAsync,
} from "../../Redux/Patient/patientSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

const schema = yup.object().shape({
mailPatient: yup
    .string()
    .email("You must enter a valid email"),
    
  adresse: yup.string(),
  notePatient: yup.string(),
 
  numeroTelephone: yup
    .string()
    .matches(
      /^[2-57943]\d{7}$/,
      "Phone number must start with 2, 5, 9, 4, 7, or 3 and must contain exactly 8 digits."
    )
    
 
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
function ModifPatient() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { id } = useParams();


  const patient = useSelector((state) => state.patient.patient);

  useEffect(() => {
    dispatch(getPatientByIdAsync(id));
  }, [dispatch, id]);



  const { control, formState, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
    shouldUnregister: true,
  });

  const { errors, setError } = formState;

  async function onSubmit({

    adresse,
    mailPatient,
    numeroTelephone,
    notePatient,
    image,
  }) {
    try {
       
            dispatch(
                editPatientAsync({
                  data: {
                    adresse,
                    mailPatient,
                    numeroTelephone,
                    notePatient,
                    image,
                  },
                  idPatient: id,
                })
              );

     
navigate(`/index/${id}`)

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
    <section className="h-100 " style={{ width: "100vw" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div className="card card-registration my-4">
              <div className="row g-0">
                <div className="col-xl-6 d-none d-xl-block">
                  <img
                    src={patient.image}
                    alt="Sample car "
                    className="img-fluid w-100 h-100"
                    style={{
                      borderTopLeftRadius: ".25rem",
                      borderBottomLeftRadius: ".25rem",
                    }}
                  />
                </div>
                <div className="col-xl-6">
                  <div className="card-body p-md-5 text-black">
                    <h3 className="mb-5 text-uppercase">
                      Modifier les informations du {patient.prenom}{" "}
                      {patient.nom}
                    </h3>
                    <form
                      name="modifForm"
                      noValidate
                      className="flex flex-col justify-center w-full mt-32"
                      onSubmit={handleSubmit(onSubmit)}
                    >
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
                              inputProps={{ accept: "image/*" }}
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

                      <div className="d-flex justify-content-end pt-3">
                        <Button
                          variant="contained"
                          color="secondary"
                          className="w-full mt-24"
                          aria-label="Register"
                          type="submit"
                          size="large"
                        >
                          Modifier
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ModifPatient;
