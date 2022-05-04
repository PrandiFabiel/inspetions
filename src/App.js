import { BrowserRouter, Routes, Route} from "react-router-dom";
import "./App.css";
import Dashboard from "./components/dashboard";
import Principal from "./components/principal";
import Form from "./components/formServices";
import Sidebar from "../src/components/sidebar";
import Customers from "./components/customers";
import FormCustomers from "./components/formCustomers";
import Inpectors from "./components/inpectors";
import FormInpectors from "./components/formInpectors";
import Settings from "./components/settings";
import FormState from "./components/formState";
import FormCities from "./components/formCities";
import FormCustomerType from "./components/formCustomerType";
import FormInpectorType from "./components/formInpectorType";
import FormBrand from "./components/formBrand";
import FormDrivetrain from "./components/formDrivetrain";
import FormModel from "./components/formModel";
import FormVehicleType from "./components/formVehicleType";
import FormColor from "./components/formColors";

function App() {
  return (
    <div style={{ display: "flex", overflowY: "hidden"}}>
      <BrowserRouter>
        <Sidebar />
          <Routes>
            <Route path="/" element={<Principal />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/services" element={<Form />} />
            <Route path="/customers" element={<Customers/>} />
            <Route path="/FormCustomers" element={<FormCustomers/>} />
            <Route path="/inpectors" element={<Inpectors/>} />
            <Route path="/formInpectors" element={<FormInpectors/>} />
            <Route path="/settings" element={<Settings/>} />
            <Route path="/state" element={<FormState/>} />
            <Route path="/cities" element={<FormCities/>} />
            <Route path="/custoType" element={<FormCustomerType/>} />
            <Route path="/inpectType" element={<FormInpectorType/>} />
            <Route path="/brand" element={<FormBrand/>} />
            <Route path="/drivetrain" element={<FormDrivetrain/>} />
            <Route path="/Model" element={<FormModel/>} />
            <Route path="/vehicleType" element={<FormVehicleType/>} />
            <Route path="/color" element={<FormColor/>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
