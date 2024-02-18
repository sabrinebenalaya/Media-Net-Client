import React, { useEffect, useState } from "react";
import { rdvstatusStyle, styleModal } from "../../Constante/Style";
import { BiEditAlt, BiReceipt} from "react-icons/bi";
import { useDispatch } from "react-redux";
import { BsFillTrashFill } from "react-icons/bs";
import { deleterdvByIdAsync, editRdvAsync } from "../../Redux/Rdv/rdvSlice";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Controller, useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import * as yup from "yup";

import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "react-datepicker";
import { MDBBtn, MDBCol, MDBRow, MDBCardText } from "mdb-react-ui-kit";
import AddOrdonance from "../Ordonance/AddOrdonance";
import { getOrdonnaceByIdRDVAsync } from "../../Redux/Ordonance/ordonanceSlice";

const schema = yup.object().shape({
  title: yup.string(),

  note: yup.string(),
});

const defaultValues = {
  title: "",
  date: "",
  note: "",
};
function RdvItem({ rdvItem, action }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdonnaceByIdRDVAsync(rdvItem._id));
  }, [dispatch, rdvItem._id]);

  



  let jourFormate = "";
  let heureFormatee = "";

  if (rdvItem.date) {
    const date = new Date(rdvItem.date);

    if (!isNaN(date.getTime())) {
      // Extraire le jour (au format "01-02-2024")
      jourFormate = new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(date);

      // Extraire l'heure (au format "14:30")
      heureFormatee = new Intl.DateTimeFormat("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } else {
      console.error("La date n'est pas valide");
    }
  }

  let statusStyle = {};
  if (rdvItem.status === "attente") {
    statusStyle = {
      backgroundColor: "#ADD8E6",
      width: `${rdvItem.status.length * 10}px`,
    };
  }
  if (rdvItem.status === "avant72") {
    statusStyle = {
      backgroundColor: "#90EE90",
      width: `${rdvItem.status.length * 10}px`,
    };
  }
  if (rdvItem.status === "avant24") {
    statusStyle = {
      backgroundColor: "#FFFF00",
      width: `${rdvItem.status.length * 10}px`,
    };
  }
  if (rdvItem.status === "fait") {
    statusStyle = {
      backgroundColor: "#9370DB",
      width: `${rdvItem.status.length * 10}px`,
    };
  }
  if (rdvItem.status === "passer") {
    statusStyle = {
      backgroundColor: "#FF0000",
      width: `${rdvItem.status.length * 10}px`,
    };
  }
  if (rdvItem.status === "Termine") {
    statusStyle = {
      backgroundColor: "#808080",
      
      width: `${rdvItem.status.length * 10}px`,
    };
  }
  const handleDeleteIcon = () => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ce RDV ?"
    );

    if (confirmDelete) {
      dispatch(deleterdvByIdAsync(rdvItem._id));
    }
    
  };



  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openOrdonance, setOpenOrdonance] = useState(false);
  const handleOpenOrdonance = () => setOpenOrdonance(true);
  const handleCloseOrdonance = () => setOpenOrdonance(false);

  const { control, formState, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
    shouldUnregister: true,
  });
 
  const {  setError } = formState;
  const [selectedDate, setSelectedDate] = useState("");
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  async function onSubmit({ note, date }) {
    try {
      dispatch(
        editRdvAsync({
          data: {
            date,
            note,
          },
          id: rdvItem._id,
        })
      );

      handleClose();
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
    <MDBRow>
    <MDBCol sm={action === "oui" ? "3" : "4"}>
        <MDBCardText className="text-muted">{rdvItem.title}</MDBCardText>
      </MDBCol>
      <MDBCol sm={action === "oui" ? "3" : "4"}>
        <MDBCardText className="text-muted">
          {jourFormate} à {heureFormatee}
        </MDBCardText>
      </MDBCol>
      <MDBCol sm={action === "oui" ? "3" : "4"}>

        <MDBCardText className="text-muted">{rdvItem.note}</MDBCardText>
      </MDBCol>
      {action === "oui" && (
        <>
          <MDBCol sm="1">
            <MDBCardText
              className="text-muted"
              style={{ ...rdvstatusStyle, ...statusStyle }}
            >
              {rdvItem.status}
            </MDBCardText>
          </MDBCol>
          <MDBCol sm="2">
            <MDBCardText className="text-muted">
            {rdvItem.status !== "fait" && rdvItem.status !== "Termine" && (
              <BiEditAlt
              style={{ color: "green", fontSize: "2rem", marginRight: "5px" }}
              onClick={handleOpen}
            />
            )}
            { rdvItem.status !== "Termine" && (
              
              <BsFillTrashFill
                style={{ color: "red", fontSize: "2rem" }}
                onClick={handleDeleteIcon}
              />)}
              {rdvItem.status === "fait" && (
                <BiReceipt
                  style={{ color: "blue", fontSize: "2rem", marginLeft: "5px" }}
                  onClick={handleOpenOrdonance}
                />
              )}
            </MDBCardText>
          </MDBCol>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={styleModal} style={{ width: "50vw" }}>
              <h3 className="mb-5">
                Modifier le RDV :{" "}
                <span className="text-primary">{rdvItem.title}</span>
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
                    <div className="form-outline mb-4 d-flex align-items-center">
                      <label className="mr-2" style={{ marginRight: "10px" }}>
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
                        Enregistrer
                      </MDBBtn>
                    </div>
                  </div>
                </form>
              </div>
            </Box>
          </Modal>




          <Modal
          open={openOrdonance}
          onClose={handleCloseOrdonance}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
      <AddOrdonance idRdv={rdvItem._id} handleCloseOrdonance={handleCloseOrdonance}/>
           
             
        </Modal>
        </>
      )}
       
   
    </MDBRow>
  );
}

export default RdvItem;
