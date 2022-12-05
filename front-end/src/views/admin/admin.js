import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/admin/statsCard";
import RecordsTable from "../../components/table";
import "./home.css";

export default function Admin() {
  const navigate = useNavigate();
  const [allRequests, setAllRequests] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [rejectedRequests, setRejectedRequests] = useState([]);

  const getAllRequests = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios.get("/admin/getAllRequests", config).then((data) => {
      setAllRequests(data.data);
      setPendingRequests(
        data.data.filter(
          (request) => request.status === "Pending" && request.bids.length >= 1
        )
      );
      setApprovedRequests(
        data.data.filter((request) => request.status === "Completed")
      );
      setRejectedRequests(
        data.data.filter((request) => request.status === "Rejected")
      );
    });
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    } else if (
      JSON.parse(localStorage.getItem("user")).isAdmin === false &&
      JSON.parse(localStorage.getItem("user")).department.toLowerCase() !==
        "merchant"
    ) {
      navigate("/userHome");
    } else if (
      JSON.parse(localStorage.getItem("user")).department.toLowerCase() ===
      "merchant"
    ) {
      navigate("/merchHome");
    }
    getAllRequests();
  }, [navigate]);

  return (
    <div className="adminMain">
      <div className="header">
        <h1 className="screenTitle">Admin Dashboard</h1>
        <div>
          <button
            className="primary-button"
            onClick={() => {
              navigate("/adminItems");
            }}
          >
            Manage Items
          </button>
          <button
            className="primary-button"
            onClick={() => {
              navigate("/adminUsers");
            }}
          >
            Manage Users
          </button>
          <button className="primary-button" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
      <div className="adminBody">
        <div className="requestsStats row">
          <Card title="Total Requests" value={allRequests.length} />
          <Card title="Pending Requests" value={pendingRequests.length} />
          <Card title="Completed Requests" value={approvedRequests.length} />
          <Card title="Rejected Requests" value={rejectedRequests.length} />
        </div>
        <div className="currentRequests">
          <div className="header">
            <h2>Awaiting Approval</h2>
          </div>
          <RecordsTable requests={pendingRequests} />
        </div>
        <div className="allRequests">
          <div className="header">
            <h2>All Requests</h2>
          </div>
          <RecordsTable requests={allRequests} />
        </div>
      </div>
    </div>
  );
}
