import BarraSuperior from "./barraSuperior";
import { useState, useEffect } from "react";
import "../css/dash.css";
function Dashboard() {
  const [pendingEarning, setIPendingEarning] = useState([]);
  const [inpectorsMonth, setInpectorsmMonth] = useState([]);
  const [servicesToCustomers, setServicesTocustomers] = useState([]);
  const [stickerAvailable, setStickerAvailable] = useState([]); 
 

  //get inspector
  useEffect(() => {
    fetch("http://devcompuservi.ddns.net:8080/service/getmonthdashnumber")
      .then((res) => res.json())
      .then(
        (result) => {
          setIPendingEarning(result);
        },
        (error) => {}
      );
  }, []);

  //get inspections inpectors per month
  useEffect(() => {
    fetch(
      "http://devcompuservi.ddns.net:8080/service/getmonthinspectorsservices"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setInpectorsmMonth(result);
        },
        (error) => {}
      );
  }, []);

    //get inspections inpectors per month
    useEffect(() => {
      fetch(
        "http://devcompuservi.ddns.net:8080/service/getcustomersnumbers"
      )
        .then((res) => res.json())
        .then(
          (result) => {
            setServicesTocustomers(result);
          },
          (error) => {}
        );
    }, []);

        //get inspections inpectors per month
        useEffect(() => {
          fetch(
            "http://devcompuservi.ddns.net:8080/sticker/getavailablestickers"
          )
            .then((res) => res.json())
            .then(
              (result) => {
                setStickerAvailable(result);
              },
              (error) => {}
            );
        }, []);
        
    

  return (
    <div className="divFa">
      <BarraSuperior />
      <div style={{ height: "100vh" }} className="container row mt-5">
        <div className="col-md-11 container mt-5">
          <div className="row">
            <h1 className="col-md-10">Dashboard</h1>
            <div className="col-md-3 mt-4">
              <div
                className="card shadow-lg text-white bg-danger mb-3"
                style={{ maxWidth: "100%" }}
              >
                <div className="card-header">Total Peding</div>
                <div className="card-body">
                  <h5 className="card-title">${pendingEarning.pending}</h5>
                  <h5 className="text-success">.</h5>
                </div>
              </div>
            </div>
            <div className="col-md-3 mt-4">
              <div
                className="card shadow-lg text-white bg-success mb-3"
                style={{ maxWidth: "100%" }}
              >
                <div className="card-header">Total Earning</div>
                <div className="card-body">
                  <h5 className="card-title">${pendingEarning.income}</h5>
                  <h5 className="text-success">.</h5>
                </div>
              </div>
            </div>
            <div className="col-md-3 mt-4">
              <div
                className="card shadow-lg text-white bg-info mb-3"
                style={{ maxWidth: "100%" }}
              >
                <div className="card-header">This Month</div>
                <div className="card-body">
                  <h5 className="card-title">
                    Total Pending: ${pendingEarning.pending}
                  </h5>
                  <h5 className="card-title">
                    Total Earning: ${pendingEarning.income}
                  </h5>
                </div>
              </div>
            </div>
            <div className="col-md-3 mt-4">
              <div
                className="card shadow-lg text-white bg-info mb-3"
                style={{ maxWidth: "100%" }}
              >
                <div className="card-header">Sticker Available</div>
                <div className="card-body">
                  <h5 className="card-title">{stickerAvailable.value}</h5>
                  <h5 className="text-info">.</h5>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <h5 className="col-md-6 mb-1">Inpections Inpectors This Month</h5>
              <h5 className="col-md-6 mb-1">Services Customers This Month</h5>
              <div className="col-md-4">
                <div className="table-responsive table-wrapperD">
                  <table className="table table-striped bg-white">
                    <thead className="">
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Services</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inpectorsMonth.map((item) => (
                        <tr key={item.name}>
                          <td>{item.name}</td>
                          <td>{item.services}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-md-8">
                <div className="table-responsive table-wrapperD">
                  <table className="table table-striped bg-white">
                    <thead className="">
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Salvige</th>
                        <th scope="col">Emission</th>
                        <th scope="col">TotalInspections</th>
                        <th scope="col">Paid</th>
                        <th scope="col">Pending</th>
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                     
                      {servicesToCustomers.map((item) => (
                        <tr key={item.name}>
                          <td>{item.name}</td>
                          <td>{item.salvige}</td>
                          <td>{item.emmision}</td>
                          <td>{item.salvige + item.emmision}</td>
                          <td>{item.paid}</td>
                          <td>{item.pending}</td>
                          <td>{item.totalEarned}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
