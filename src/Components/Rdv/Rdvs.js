import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  listPrecedentRdvAsync,
  listProchainRdvAsync,
} from "../../Redux/Rdv/rdvSlice";
import {
  MDBCardBody,
  MDBCard,
  MDBCol,
  MDBRow,
  MDBCardText,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import RdvItem from "./RdvItem";

function Rdvs({ status }) {
  const { id } = useParams();
  const dispatch = useDispatch();

  const listRdvs = useSelector((state) => state.rdv.data);
  const list = useSelector((state) => state.rdv.dataprev);


  useEffect(() => {
    if (status === "prochain") {
      dispatch(listProchainRdvAsync({ id, status }));
    } else {
      dispatch(listPrecedentRdvAsync({ id, status }));
    }

  }, [dispatch, id, status]);

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
                        {status === "prochain"
                          ? "Liste des prochains RDV"
                          : "Liste des RDV précédents"}
                      </h3>
                  

                    <MDBCard style={{ width: "100%" }}>
                      <MDBCardBody>
                        <MDBRow>
                          <MDBCol sm="4">
                            <MDBCardText
                              style={{ fontWeight: "bold" }}
                              className=" text-uppercase"
                            >
                              rdv
                            </MDBCardText>
                          </MDBCol>

                          <MDBCol sm="4">
                            <MDBCardText
                              style={{ fontWeight: "bold" }}
                              className="text-uppercase"
                            >
                              Date
                            </MDBCardText>
                          </MDBCol>
                          <MDBCol sm="4">
                            <MDBCardText
                              style={{ fontWeight: "bold" }}
                              className="text-uppercase"
                            >
                              Note
                            </MDBCardText>
                          </MDBCol>
                        </MDBRow>
                        <hr />
                        {status === "prochain"
                          ? Array.isArray(list) &&
                            list.map((item, key) => {
                              return (
                                <>
                                  <RdvItem
                                    key={key}
                                    rdvItem={item}
                                    action={"non"}
                                  />
                                  <hr />
                                </>
                              );
                            })
                          : Array.isArray(listRdvs) &&
                            listRdvs.map((item, key) => {
                              return (
                                <>
                                  <RdvItem
                                    key={key}
                                    rdvItem={item}
                                    action={"non"}
                                  />
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

export default Rdvs;
