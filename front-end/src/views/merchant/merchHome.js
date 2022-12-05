import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecordsTable from "../../components/table";

export default function MerchHome() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [prevRequests, setPrevRequests] = useState([]);

  const getRequests = async () => {
    const data = await axios.get("/merch/getAvailableRequests");
    if (data) {
      setRequests(data.data);
      const email = JSON.parse(localStorage.getItem("user")).email;
      axios.get("/merch/getOwnBids", { params: { email } }).then((res) => {
        const temp = res.data;
        for (let i = 0; i < temp.length; i++) {
          axios
            .get("/user/getRequestDetails", {
              params: { id: temp[i].request },
            })
            .then((res) => {
              setPrevRequests((prevRequests) => [...prevRequests, res.data]);
            });
        }
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    } else if (JSON.parse(localStorage.getItem("user")).isAdmin === true) {
      navigate("/admin");
    } else if (
      JSON.parse(localStorage.getItem("user")).department.toLowerCase() !==
      "merchant"
    ) {
      navigate("/userHome");
    }
    getRequests();
  }, [navigate]);

  return (
    <div className="mainDiv">
      <div className="header">
        <h1 className="screenTitle">User Home</h1>
        <button className="primary-button" onClick={logout}>
          Logout
        </button>
      </div>
      <div className="uhBodyMain row">
        <div className="uhBodyLeft col-md-6 col-12">
          <h2>Generate New Request</h2>
          <RecordsTable requests={requests} />
        </div>
        <div className="uhBodyRight col-md-6 col-12">
          <h2>Requests Record</h2>
          <RecordsTable requests={prevRequests} />
        </div>
      </div>
    </div>
  );
}
