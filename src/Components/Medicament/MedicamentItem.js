import React from 'react'
import {
    MDBCol,
    MDBRow,
    MDBCardText,
  } from "mdb-react-ui-kit";
function MedicamentItem({medicament}) {
  return (
    <MDBRow>
    <MDBCol sm="4">
      <MDBCardText
        style={{ fontWeight: "bold" }}
        className=" text-uppercase"
      >
        {medicament.nom}
      </MDBCardText>
    </MDBCol>

    <MDBCol sm="2">
      <MDBCardText
        style={{ fontWeight: "bold" }}
        className="text-uppercase"
      >
      {medicament.matin ?? 0}
      </MDBCardText>
    </MDBCol>
    <MDBCol sm="2">
    <MDBCardText style={{ fontWeight: "bold" }} className="text-uppercase">
    {medicament.midi ?? 0}
  </MDBCardText>
    </MDBCol>
    <MDBCol sm="2">
    <MDBCardText style={{ fontWeight: "bold" }} className="text-uppercase">
    {medicament.apres_midi ?? 0}
  </MDBCardText>
    </MDBCol>
    <MDBCol sm="2">
      <MDBCardText
        style={{ fontWeight: "bold" }}
        className="text-uppercase"
      >
      {medicament.soir ?? 0}
      
      </MDBCardText>
    </MDBCol>
  </MDBRow>
  )
}

export default MedicamentItem