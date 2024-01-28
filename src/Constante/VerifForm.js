import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
export const schema = yup.object().shape({
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
      .length(8, "Age must be exactly 2 digits long")
      .required("You must enter a Age"),
    numeroTelephone: yup
      .string()
      .matches(
        /^[2-57943]\d{7}$/,
        "Phone number must start with 2, 5, 9, 4, 7, or 3 and must contain exactly 8 digits."
      )
      .required("You must enter a phone number"),
    sexe: yup.string().required("You must enter your sexe"),
  });

 export const defaultValues = {
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