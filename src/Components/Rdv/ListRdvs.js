import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { addRdvAsync, listrdvAsync } from "../../Redux/Rdv/rdvSlice";

import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import {
  MDBBtn,
  MDBCardBody,
  MDBCard,
  MDBCol,
  MDBRow,
  MDBCardText,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { getPatientByIdAsync } from "../../Redux/Patient/patientSlice";
import { bloc_flex_spBetw, styleModal } from "../../Constante/Style";
import RdvItem from "./RdvItem";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";

import DatePicker from "react-datepicker";

const schema = yup.object().shape({
  title: yup.string(),

  note: yup.string(),
});

const defaultValues = {
  title: "",
  date: new Date(),
  note: "",
};
function ListRdvs() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const listRdvs = useSelector((state) => state.rdv.data);
  const patientgeted = useSelector((state) => state.patient.data);

  useEffect(() => {
    dispatch(getPatientByIdAsync(id));

    dispatch(listrdvAsync(id));
  }, [dispatch, id]);



  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date); // Mettez à jour l'état lors du changement de date
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { control, formState, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
    shouldUnregister: true,
  });

  const { errors, setError } = formState;
  async function onSubmit({ title, date, note }) {
    try {
      const patient = id;
      const status = "attente";
      dispatch(addRdvAsync({ title, date, note, patient, status }));
      handleClose();
      navigate(`/index/${id}/rdvs`);
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
          <div className="col-xl-6" style={{ width: "100%" }}>
            <div
              className="card card-registration my-4"
              style={{ width: "100%" }}
            >
              <div className="row g-0" style={{ width: "100%" }}>
                <div className="col-xl-6" style={{ width: "100%" }}>
                  <div
                    className="card-body p-md-5 text-black"
                    style={{ width: "100%" }}
                  >
                    <div style={bloc_flex_spBetw}>
                      <h3 className="mb-5 text-uppercase">
                        List des RDV de <span className="text-danger">{patientgeted.prenom} {patientgeted.nom}</span>
                      </h3>
                      <MDBBtn
                        color="danger"
                        className="w-full mt-24 mb-5 "
                        style={{
                          transform: "none",
                          transition: "none",
                          fontSize: "initial",
                        }}
                        onClick={handleOpen}
                      >
                        Ajouter
                      </MDBBtn>
                    </div>

                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={styleModal} style={{ width: "50vw" }}>
                        <h3 className="mb-5">
                          Ajouter un RDV à{" "}
                          <span className="text-primary">
                            {patientgeted.prenom} {patientgeted.nom}
                          </span>
                        </h3>

                        <div>
                          <form
                            name="addRdv"
                            noValidate
                            className="flex flex-col justify-center w-full mt-32"
                            onSubmit={handleSubmit(onSubmit)}
                          >
                            <div class="row">
                              <div class="form-outline mb-4">
                                <Controller
                                  name="title"
                                  control={control}
                                  render={({ field }) => (
                                    <TextField
                                      {...field}
                                      className="mb-24"
                                      label="Titre"
                                      type="text"
                                      error={!!errors.title}
                                      helperText={errors?.title?.message}
                                      variant="outlined"
                                      required
                                      fullWidth
                                    />
                                  )}
                                />
                              </div>

                              <div className="form-outline mb-4 d-flex align-items-center">
                                <label
                                  className="mr-2"
                                  style={{ marginRight: "10px" }}
                                >
                                  Date
                                </label>

                                <Controller
                                  name="date"
                                  control={control}
                                  defaultValue={null}
                                  render={({ field }) => (
                                    <DatePicker
                                      selected={selectedDate}
                                      onChange={(date) => {
                                        field.onChange(date);
                                        handleDateChange(date);
                                      }}
                                      showTimeSelect
                                      timeIntervals={15}
                                      dateFormat="d MMMM, yyyy h:mm aa"
                                      className="form-control"
                                    />
                                  )}
                                />
                              </div>

                              <div class="form-outline mb-4">
                                <Controller
                                  name="note"
                                  control={control}
                                  render={({ field }) => (
                                    <TextField
                                      {...field}
                                      className="mb-24"
                                      label="Note"
                                      placeholder="Note du rdv..."
                                      rows={5}
                                      multiline
                                      autoFocus
                                      variant="outlined"
                                      required
                                      fullWidth
                                    />
                                  )}
                                />
                              </div>

                              <div className="d-flex justify-content-end pt-3">
                                <MDBBtn
                                  className="w-full mt-24 mb-2 "
                                  style={{
                                    transform: "none",
                                    transition: "none",
                                    fontSize: "initial",
                                  }}
                                  outline
                                >
                                  Ajouter
                                </MDBBtn>
                              </div>
                            </div>
                          </form>
                        </div>
                      </Box>
                    </Modal>

                    <MDBCard style={{ width: "100%" }}>
                      <MDBCardBody>
                      <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText style={{ fontWeight: 'bold' }} className=" text-uppercase">rdv</MDBCardText>
                      </MDBCol>
                      
                      <MDBCol sm="3">
                      <MDBCardText  style={{ fontWeight: 'bold' }} className="text-uppercase">
                      Date
                      </MDBCardText>
                    </MDBCol>
                    <MDBCol sm="3">
                        <MDBCardText style={{ fontWeight: 'bold' }} className="text-uppercase">
                       Note
                        </MDBCardText>
                      </MDBCol>
                      <MDBCol sm="1">
                      <MDBCardText style={{ fontWeight: 'bold' }} className="text-uppercase">
                 Status
                      </MDBCardText>
                    </MDBCol>
                    <MDBCol sm="2">
                    <MDBCardText style={{ fontWeight: 'bold' }} className=" text-uppercase">
                   Action
                    </MDBCardText>
                  </MDBCol>
                    </MDBRow>
                    <hr />
                        {Array.isArray(listRdvs) &&
                          listRdvs.map((item, key) => {
                            return (
                              <>
                                <RdvItem key={key} rdvItem={item} action={'oui'}  />
                                <hr />
                              </>
                            );
                          })}
                      </MDBCardBody>
                    </MDBCard>
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

export default ListRdvs;
