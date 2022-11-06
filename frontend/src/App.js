import { Route, Routes } from "react-router-dom";
import ContenerLayout from "./Layout/ContenerLayout";
import HomeLayout from "./Layout/HomeLayout";
import Account from "./Pages/Account";
import AddProduct from "./Pages/AddProduct";
import Dashboard from "./Pages/Dashboard";
import ForgotPassword from "./Pages/ForgotPassword";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ReportBug from "./Pages/ReportBug";
import UpdatePassword from "./Pages/UpdatePassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<HomePage />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/forgotPassword/:token" element={<UpdatePassword />} />
      <Route path="/dashboard" element={<ContenerLayout />}>
        <Route index element={<Dashboard />} />
        <Route  path="/dashboard/addproduct" element={<AddProduct />} />
        <Route  path="/dashboard/account" element={<Account />} />
        <Route  path="/dashboard/reportbug" element={<ReportBug />} />
      </Route>
    </Routes>
  );
}

export default App;
