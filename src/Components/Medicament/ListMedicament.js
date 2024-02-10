import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  MDBCardBody,
  MDBCard,
  MDBCol,
  MDBRow,
  MDBCardText,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { getAllMedicamentsPrescritsToPatient } from "../../Redux/Medicament/medicamentSlice";
import MedicamentItem from "./MedicamentItem";
function ListMedicament() {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const listMedicament = useSelector((state) => state.medicament.data);


  useEffect(() => {
    dispatch(getAllMedicamentsPrescritsToPatient(id));

  }, [dispatch, id]);

  console.log("list", listMedicament)
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
                      className="mb-5 text-uppercase"
                      style={{ color: "red" }}
                    >
                    Liste des medicaments
                    </h3>
                

                  <MDBCard style={{ width: "100%" }}>
                    <MDBCardBody>
                      <MDBRow>
                        <MDBCol sm="4">
                          <MDBCardText
                            style={{ fontWeight: "bold" }}
                            className=" text-uppercase"
                          >
                            Nom
                          </MDBCardText>
                        </MDBCol>

                        <MDBCol sm="2">
                          <MDBCardText
                            style={{ fontWeight: "bold" }}
                            className="text-uppercase"
                          >
                            Matin
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol sm="2">
                          <MDBCardText
                            style={{ fontWeight: "bold" }}
                            className="text-uppercase"
                          >
                           Midi
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol sm="2">
                          <MDBCardText
                            style={{ fontWeight: "bold" }}
                            className="text-uppercase"
                          >
                           Après-Midi
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol sm="2">
                          <MDBCardText
                            style={{ fontWeight: "bold" }}
                            className="text-uppercase"
                          >
                           Soir
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      {Array.isArray(listMedicament) &&
                        listMedicament.map((item, key) => {
                          return (
                            <>
                              <MedicamentItem key={key} medicament={item}  />
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
  )
}

export default ListMedicament