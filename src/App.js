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
import FormSticker from "./components/formSticker";
import Main from "./components/list/main";
import ListCities from "./components/list/listCities";
import ListState from "./components/list/listState";
import ListServices from "./components/list/listServices";
import ListCustomerType from "./components/list/listCustomerTypes";
import ListInspectionType from "./components/list/listInspectionTypes";
import ListBrands from "./components/list/listBrands";
import ListDriveTrain from "./components/list/listDriveTrains";
import ListVehicleModels from "./components/list/listVehicleModels";
import ListVehicleTypes from "./components/list/listVehicleTypes";
import ListColors from "./components/list/listColors";
import ListStickers from "./components/list/listStickers";


function App() {
  return (
    <div style={{ display: "flex", overflowY: "hidden"}}>
      <BrowserRouter>
        <Sidebar />
          <Routes> 
            <Route path="/" element={<Principal/>} />
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
            <Route path="/sticker" element={<FormSticker/>} />
            <Route path="/main" element={<Main/>} />
            <Route path="/listCities" element={<ListCities/>} />
            <Route path="/listState" element={<ListState/>} />
            <Route path="/listServices" element={<ListServices/>} />
            <Route path="/listCusType" element={<ListCustomerType/>} />
            <Route path="/listInsType" element={<ListInspectionType/>} />
            <Route path="/listBrands" element={<ListBrands/>} />
            <Route path="/listDrivetrains" element={<ListDriveTrain/>} />
            <Route path="/listVHModels" element={<ListVehicleModels/>} />
            <Route path="/listVHTypes" element={<ListVehicleTypes/>} />
            <Route path="/listColors" element={<ListColors/>} />
            <Route path="/listStickers" element={<ListStickers/>} />
          </Routes>
      </BrowserRouter>
    </div>
  ); 
}

export default App;
