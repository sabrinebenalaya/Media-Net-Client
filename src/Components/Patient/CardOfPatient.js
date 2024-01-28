import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';

import {  useNavigate } from "react-router-dom";

function CardOfPatient({patientItem}) {
    const navigate = useNavigate();
    const handleNavigate = (route) => {
      console.log(route)
          navigate(route);
        };
  return (
    <div>
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol  className="mt-5">
            <MDBCard style={{ borderRadius: '15px', backgroundColor: '#93e2bb' }}>
              <MDBCardBody className="p-4 text-black">
                <div>
                  <MDBTypography tag='h6'>{patientItem.prenom} {patientItem.nom}</MDBTypography>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <p className="small mb-0"><MDBIcon far icon="clock me-2" />{patientItem.sexe}</p>
                    <p className="fw-bold mb-0">{patientItem.age} ans</p>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <div className="flex-shrink-0">
                    <MDBCardImage
                    style={{ width: '100px', height: '100px' }}
                      className="img-fluid rounded-circle border border-dark border-3"
                      src={patientItem.image}
                      alt='Generic placeholder image'
                      fluid />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <div>
                    <p className="mb-0 me-2 fw-bold">{patientItem.adresse}</p>
                    <p className="mb-0 me-2">{patientItem.mailPatient}</p>
                    <p className="mb-0 me-2">{patientItem.numeroTelephone}</p>
                    </div>
                  </div>
                </div>
                <hr />
                <MDBCardText>{patientItem.notePatient}</MDBCardText>
                <MDBBtn color="success" rounded block size="lg"  onClick={() =>handleNavigate(`/index/${patientItem._id}`)}>
                  Detail patient
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  )
}

export default CardOfPatient