import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import RecordsTable from "../../components/table";
import "./home.css";

export default function UserHome() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [requestName, setRequestName] = useState("");
  const [requestDescription, setRequestDescription] = useState("");
  const [requestAmount, setRequestAmount] = useState(0);
  const [user] = useState(JSON.parse(localStorage.getItem("user")));
  const [items, setItems] = useState([]);

  const getAllitems = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios.get("/admin/getAllItems", config).then((data) => {
      setItems(data.data);
    });
  };

  const getRequests = async () => {
    const email = JSON.parse(localStorage.getItem("user")).email;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = await axios.get(
      "/user/getOwnRequests",
      { params: { email } },
      config
    );
    setRequests(data.data);
  };

  const generateRequests = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = {
      email: user.email,
      department: user.department,
      name: requestName,
      desc: requestDescription,
      amount: requestAmount,
    };
    const data = await axios.post("/user/makeRequest", body, config);
    console.log(data);
    if (data.status === 200) {
      alert("Request Generated Successfully");
      getRequests();
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
      JSON.parse(localStorage.getItem("user")).department.toLowerCase() ===
      "merchant"
    ) {
      navigate("/merchHome");
    }
    getRequests();
    getAllitems();
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
          <Form
            className="m-0 requestForm"
            onSubmit={(e) => {
              e.preventDefault();
              generateRequests();
              e.target.reset();
            }}
          >
            <div className="row requestForm">
              <Form.Group className="mb-3 col" controlId="name">
                <Form.Label>Items</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(event) => {
                    setRequestName(event.target.value);
                  }}
                >
                  {items.map((item, i) => {
                    return (
                      <option key={i} value={item.name}>
                        {item.name}
                      </option>
                    );
                  })}
                </Form.Control>
                <Form.Text className="text-muted">
                  Choose an item from the list of avaiable items
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3 col" controlId="amount">
                <Form.Label>Total amount/number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Amount"
                  onChange={(event) => {
                    setRequestAmount(event.target.value);
                  }}
                />
                <Form.Text className="text-muted">
                  Enter the number of items you want to request
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="details">
                <Form.Label>Detail</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Details about the request"
                  style={{ height: "155px" }}
                  onChange={(event) => {
                    setRequestDescription(event.target.value);
                  }}
                />
              </Form.Group>
            </div>
            <Button variant="primary" className="m-1" type="submit">
              Submit Request
            </Button>
          </Form>
        </div>
        <div className="uhBodyRight col-md-6 col-12">
          <h2>Requests Record</h2>
          <RecordsTable requests={requests} />
        </div>
      </div>
    </div>
  );
}
