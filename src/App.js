import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "react-datepicker/dist/react-datepicker.css";
import IndexApp from "./Components/IndexApp";
import ListPatients from "./Components/Patient/ListPatients";

import Index from "./Components/Patient/Index";
import ListRdvs from "./Components/Rdv/ListRdvs";
import ListMedicament from "./Components/Medicament/ListMedicament";
import ListPrecRdvs from "./Components/Rdv/ListPrecRdvs";
import DetailPatient from "./Components/Patient/DetailPatient";
import ModifPatient from "./Components/Patient/ModifPatient";
import "primeicons/primeicons.css";
import AddOrdonance from "./Components/Ordonance/AddOrdonance";
import AddPatient from "./Components/Patient/AddPatient";
function App() {
  return (
    <>
      {" "}
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexApp />} />
          <Route path="/listPatients" element={<ListPatients />} />
          <Route path="/addPatient" element={<AddPatient />} />
          <Route path="/index/:id" element={<Index />}>
            <Route index element={<DetailPatient />} />
            <Route path="/index/:id/edit" element={<ModifPatient />} />
            <Route path="/index/:id/medicaments" element={<ListMedicament />} />
            <Route path="/index/:id/rdvs" element={<ListRdvs />} />
            <Route path="/index/:id/rdv" element={<ListPrecRdvs />} />
            <Route path="/index/:id/ordonance" element={<AddOrdonance />} />
          </Route>
        </Routes>
      </BrowserRouter>{" "}
    </>
  );
}

export default App;
