import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/authenticiation/login";
import UserHome from "./views/user/home";
import Admin from "./views/admin/admin";
import UserManage from "./views/admin/userManage";
import MerchHome from "./views/merchant/merchHome";
import ItemManage from "./views/admin/itemManage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/userHome" element={<UserHome />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/adminUsers" element={<UserManage />} />
          <Route path="/merchHome" element={<MerchHome />} />
          <Route path="/adminItems" element={<ItemManage />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
