import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

export default function ItemManage() {
  const navigate = useNavigate();
  const [totalItems, setTotalItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
  });

  const createItem = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post("/admin/createItem", newItem, config)
      .then((res) => {
        alert("Item Created Successfully");
        getAllItems();
        setNewItem({ name: "" });
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  const getAllItems = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios.get("/admin/getAllItems", config).then((data) => {
      setTotalItems(data.data);
    });
  };

  const deleteItem = (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .delete("/admin/deleteItem", { data: { id: id }, config })
      .then((res) => {
        alert(res.data.message);
        getAllItems();
      })
      .catch((err) => {
        alert(err.response.data);
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
    getAllItems();
  }, []);

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
      <div className="adminBody adminFlex">
        <div className="adminBodyLeft">
          <h2 className="adminBodyTitle">Create New Item</h2>
          <div className="adminBodyLeftContent">
            <div className="adminBodyLeftContentItem">
              <label htmlFor="name">Item Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={newItem.name}
                onChange={(e) => {
                  setNewItem({ ...newItem, name: e.target.value });
                }}
              />

              <button
                className="primary-button createButton"
                onClick={createItem}
              >
                Create Item
              </button>
            </div>
          </div>
        </div>
        <div className="adminBodyRight">
          <h2 className="adminBodyTitle">All Items</h2>
          <div className="adminBodyRightContent">
            <table className="recordsTable">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {totalItems.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{item.name}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            deleteItem(item._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
