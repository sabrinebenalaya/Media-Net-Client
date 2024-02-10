import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { getRdvByIdAsync } from "../../Redux/Rdv/rdvSlice";
import {
  MDBCardBody,
  MDBCard,
  MDBCol,
  MDBRow,
  MDBCardText,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";

import { getPatientByIdAsync, sendConfirmationEmail } from "../../Redux/Patient/patientSlice";
import { addOrdonanceAsync, sendConfirmationEmai } from "../../Redux/Ordonance/ordonanceSlice";
import { toast } from "react-toastify";
import { TextField } from "@mui/material";



function AddOrdonance({ idRdv,handleCloseOrdonance }) {
 
 


  const [medicaments, setMedicaments] = useState([{}]);

  const handleInputChange = (index, field, value) => {
    const updatedMedicaments = [...medicaments];
    updatedMedicaments[index][field] = value;
    setMedicaments(updatedMedicaments);
  };

  const { id } = useParams();

  const dispatch = useDispatch();

  const rdv = useSelector((state) => state.rdv.dataRdv);
  const patient = useSelector((state) => state.patient.patient);

  useEffect(() => {
    dispatch(getRdvByIdAsync(idRdv));
    dispatch(getPatientByIdAsync(id));
  }, [dispatch, id, idRdv]);

  let jourFormate = "";

  if (rdv.date) {
    const date = new Date(rdv.date);

    if (!isNaN(date.getTime())) {
      jourFormate = new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(date);
    } else {
      console.error("La date n'est pas valide");
    }
  }
  async function onSubmit() {
    try {
   
     
     if (Object.keys(medicaments[0]).length > 0){
   
      const idPatient = rdv.patient;
      const idRdv = rdv._id;
  
     dispatch(addOrdonanceAsync({ idPatient, idRdv, medicaments, jourFormate}));
     const listeMedicaments = medicaments.map(medicament => medicament.nom).join(', ');

     const message = `Cher(e) ${patient.prenom},

     Nous vous confirmons que votre ordonnance a bien été ajoutée à votre dossier médical. Veuillez trouver ci-dessous les détails de l'ordonnance :

     Nom du médecin : ${rdv.title}
     Date de prescription : ${jourFormate}
     Médicaments prescrits : ${listeMedicaments}

     Si vous avez des questions concernant votre ordonnance ou si vous avez besoin de plus d'informations, n'hésitez pas à nous contacter. 
     
     Notre équipe est là pour vous aider.
     
     Merci de votre confiance.
     
    Cordialement,
    L'équipe médicale`;

       await sendConfirmationEmail({ email: patient.mailPatient, message: message, Objet: "Confirmation d'ajout d'ordonnance" });

    rdv.status="Termine"
     handleCloseOrdonance(true)

     

     } else {
    
      toast.error("Vous devez ajouter au moins un médicament !");
      handleCloseOrdonance(true)
     }
 

    } catch (error) {
     
        console.log("Unexpected error:", error);
     
    }
  }
  return (
    <section style={{ width: "83vW" }}>
      <div className="container  h-100">
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
                    <h3
                      className="mb-5 text-center text-uppercase"
                      style={{ color: "red", textAlign: "center" }}
                    >
                      Ajouter une ordonnance
                    </h3>

                    <MDBCard style={{ width: "100%" }}>
                      <MDBCardBody>
                        <form
                          name="ordonanceForm"
                          noValidate
                          className="flex flex-col justify-center w-full mt-32"
                          onSubmit={onSubmit}
                        >
                          <MDBRow>
                            <MDBCol
                              sm="3"
                              style={{
                                marginBottom: "10px",
                                fontWeight: "bold",
                              }}
                            >
                              <MDBCardText>Patient :</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              <MDBCardText className="text-muted" style={{
                              
                                fontWeight: "bold",
                              }}>
                                {patient.prenom} {patient.nom}
                              </MDBCardText>
                            </MDBCol>
                          </MDBRow>

                          <MDBRow>
                            <MDBCol
                              sm="3"
                              style={{
                                marginBottom: "10px",
                                fontWeight: "bold",
                              }}
                            >
                              <MDBCardText>Nom du médecin :</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              <MDBCardText className="text-muted">
                                {rdv.title}
                              </MDBCardText>
                            </MDBCol>
                          </MDBRow>

                          <MDBRow>
                            <MDBCol sm="3">
                              <MDBCardText
                                style={{
                                  marginBottom: "10px",
                                  fontWeight: "bold",
                                }}
                              >
                              Date de prescription :
                              </MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              <MDBCardText className="text-muted">
                                {jourFormate}
                              </MDBCardText>
                            </MDBCol>
                          </MDBRow>

                          <MDBRow>
                            <MDBCol sm="3">
                              <MDBCardText
                                style={{
                                  marginBottom: "10px",
                                  fontWeight: "bold",
                                }}
                              >
                              Médicaments prescrits :
                              </MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              <MDBCardText className="text-muted">
                                {medicaments.map((medicament, index) => (
                                  <div
                                    key={index}
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      gap: "24px",
                                      alignItems: "center",
                                      marginTop:"10px"
                                    }}
                                  >
                                    <div style={{ flex: 1 }}>
                             
                                      
                                          <TextField
                                          value={medicament.nom || ''}
                                          onChange={(e) => handleInputChange(index, 'nom', e.target.value)}
                                        
                                        name={"nom"}
                                            className="mb-24"
                                            label="Medicament"
                                            type="text"
                                            variant="outlined"
                                            required
                                            fullWidth
                                          />
                                   
                                    </div>
                                    <div>
                                  
                                          <TextField
                                          name={"matin"}
                                            className="mb-24"
                                            label="Matin"
                                            type="number"
                                            variant="outlined"
                                            required
                                            value={medicament.matin || ''}
                                            onChange={(e) => handleInputChange(index, 'matin', e.target.value)}
                                            InputProps={{
                                              style: { width: "10ch" },
                                            }}
                                          />
                                     
                                    </div>
                                    <div>
                                     
                                          <TextField
                                          name={"midi"}
                                            className="mb-24"
                                            label="Midi"
                                            type="number"
                                            variant="outlined"
                                            required
                                            value={medicament.midi || ''}
                                            onChange={(e) => handleInputChange(index, 'midi', e.target.value)}
                                            InputProps={{
                                              style: { width: "10ch" },
                                            }}
                                          />
                                       
                                    </div>
                                    <div>
                                    
                                          <TextField
                                  
                                          name={"apres_midi"}
                                          value={medicament.apres_midi || ''}
                                          onChange={(e) => handleInputChange(index, 'apres_midi', e.target.value)}
                                            className="mb-24"
                                            label="Apres midi"
                                            type="number"
                                            variant="outlined"
                                            required
                                            InputProps={{
                                              style: { width: "14ch" },
                                            }}
                                          />
                                     
                                    </div>
                                    <div>
                                    
                                          <TextField
                                          name={"soir"}
                                            className="mb-24"
                                            label="Soir"
                                            type="number"
                                            variant="outlined"
                                            required
                                            value={medicament.soir || ''}
                                            onChange={(e) => handleInputChange(index, 'soir', e.target.value)}
                                            InputProps={{
                                              style: { width: "10ch" },
                                            }}
                                          />
                                      
                                    </div>
                                    <div>
                                    <FaPlus
                                    style={{
                                      color: "red",
                                      fontSize: "1.5rem",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => {
                                      setMedicaments([...medicaments, {}]); 
                                    }}
                                  />

                                   
                                    
                                    </div>
                                  </div>
                                ))}
                              </MDBCardText>
                            </MDBCol>
                          </MDBRow>
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
                        </form>
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

export default AddOrdonance;
