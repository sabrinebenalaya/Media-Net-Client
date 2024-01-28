import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarItem,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router";
import {
  deletePatientByIdAsync,
  getPatientByIdAsync,
} from "../../Redux/Patient/patientSlice";
import { useDispatch, useSelector } from "react-redux";
function Index() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const patient = useSelector((state) => state.patient.data);

  useEffect(() => {
    dispatch(getPatientByIdAsync(id));
  }, [dispatch, id]);

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ce patient ?"
    );

    if (confirmDelete) {
      dispatch(deletePatientByIdAsync(id));
      navigate("/listPatients");
    }
  };


  const handleNavigate = (route) => {
   
        navigate(route);
      };
  return (
    <div style={{ display: "flex", backgroundColor: '#eee'}}>
      <div>
        <MDBNavbar className="vh-100" style={{ backgroundColor: "#eee" }}>
          <MDBContainer fluid className="flex-column ">
            <MDBNavbarItem style={{ listStyleType: "none" }}>
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  <MDBCardImage
                    src={patient.image}
                    alt="patient"
                    className="rounded-circle"
                    style={{ width: "150px", height: "150px" }}
                    fluid
                  />
                  <p className="text-muted mb-1">
                    {patient.prenom} {patient.nom}
                  </p>
                  <p className="text-muted mb-1">{patient.mailPatient}</p>
                  <p className="text-muted mb-1">{patient.numeroTelephone}</p>
                  <div className="d-flex justify-content-center mb-2">
                    <MDBBtn onClick={() =>handleNavigate(`/index/${patient._id}/edit`)}>Modifier</MDBBtn>
                    <MDBBtn
                      color="danger"
                      className="ms-1"
                      onClick={handleDelete}
                      style={{
                        transform: "none",
                        transition: "none",
                        fontSize: "initial",
                      }}
                    >
                      Suprimer
                    </MDBBtn>
                  </div>
                  <div className="d-flex justify-content-center mb-2">
                    <MDBBtn outline onClick={() =>handleNavigate(`/index/${patient._id}/rdvs`)}>RDV</MDBBtn>
                    <MDBBtn outline className="ms-1">
                      Medicament
                    </MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBNavbarItem>
          </MDBContainer>
        </MDBNavbar>
      </div>
      <Outlet />
    </div>
  );
}

export default Index;
