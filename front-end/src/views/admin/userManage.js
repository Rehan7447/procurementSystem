import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Card from "../../components/admin/statsCard";
import UserTable from "../../components/admin/userTable";

export default function UserManage() {
  const navigate = useNavigate();
  const [totalUsers, setTotalUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);
  const [merchants, setMerchants] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: false,
    department: "",
  });

  const createUser = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post("/admin/createUser", newUser, config)
      .then((res) => {
        alert("User Created Successfully");
        getAllUsers();
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  const getAllUsers = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios.get("/admin/getAllUsers", config).then((data) => {
      setTotalUsers(data.data);
      setAdmins(data.data.filter((user) => user.isAdmin === true));
      setUsers(
        data.data.filter(
          (user) => user.department !== "merchant" && user.isAdmin === false
        )
      );
      setMerchants(
        data.data.filter(
          (user) => user.department === "merchant" && user.isAdmin === false
        )
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
    getAllUsers();
  }, [navigate]);

  return (
    <div className="adminMain">
      <div className="header">
        <h1 className="screenTitle">Admin Dashboard</h1>
        <div>
          <button
            className="primary-button"
            onClick={() => {
              navigate("/admin");
            }}
          >
            Manage Requests
          </button>
          <button
            className="primary-button"
            onClick={() => {
              navigate("/adminItems");
            }}
          >
            Manage Items
          </button>
          <button className="primary-button" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
      <div className="adminBody">
        <div className="createUserForm">
          <Form
            className="m-0 requestForm"
            onSubmit={(e) => {
              e.preventDefault();
              createUser();
              e.target.reset();
            }}
          >
            <div className="row requestForm">
              <Form.Group className="mb-3 col" controlId="name">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  onChange={(event) => {
                    setNewUser({ ...newUser, name: event.target.value });
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3 col" controlId="Email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="User Email"
                  onChange={(event) => {
                    setNewUser({ ...newUser, email: event.target.value });
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3 col" controlId="Password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(event) => {
                    setNewUser({ ...newUser, password: event.target.value });
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3 col" controlId="isAdmin">
                <Form.Label>Admin</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(event) => {
                    setNewUser({ ...newUser, isAdmin: event.target.value });
                  }}
                >
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3 col" controlId="department">
                <Form.Label>Department</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(event) => {
                    setNewUser({ ...newUser, department: event.target.value });
                  }}
                >
                  <option value="supervisor">Supervisor</option>
                  <option value="customer">Customer</option>
                  <option value="merchant">Merchant</option>
                </Form.Control>
              </Form.Group>
            </div>
            <div className="d-flex justify-content-end m-4">
              <Button variant="primary" className="m-1" type="submit">
                Create User
              </Button>
            </div>
          </Form>
        </div>
        <div className="requestsStats row">
          <Card title="Total Users" value={totalUsers.length} />
          <Card title="Admins" value={admins.length} />
          <Card title="Users" value={users.length} />
          <Card title="Merchants" value={merchants.length} />
        </div>
        <div className="currentRequests">
          <div className="header">
            <h2>All Users</h2>
          </div>
          <UserTable requests={totalUsers} />
        </div>
      </div>
    </div>
  );
}
