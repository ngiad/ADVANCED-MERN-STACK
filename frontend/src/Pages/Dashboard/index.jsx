import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import HeaderContener from "../../Component/HeaderContener";
import { update } from "../../Redux/SliceRedux/user";
import Requestbase from "../../utils/request";
import ContenerDashboard from "./ContenerDashboard";
import "./Dashboard.css";
import EditProduct from "./EditProduct";

const Dashboard = () => {
  const User = useSelector((state) => state.Token);
  const Dispatch = useDispatch();
  const [Products, setProduct] = useState([]);
  const [EditProductState, setditProductState] = useState(false);

  const [product, setproduct] = useState({});

  const handleChange = () => {
    setditProductState(!EditProductState);
  };

  const getDataUser = async () => {
    try {
      const res = await Requestbase.get("api/users/getuser", {
        headers: {
          token: User.token,
        },
      });

      const data = await res.data;

      Dispatch(update(data));
      setProduct(data.shop);
    } catch (error) {
      toast.warning(error.response.data.message);
    }
  };

  useEffect(() => {
    getDataUser();
  }, []);

// if(User.shop) 

return (
    <div>
      <HeaderContener />
      <div className="DashboardContent">
        <div className="topDashboardContent">
          <h2>Inventory Stats</h2>
          <div className="info-summary">
            <button>
              Total Products (
              {User.shop?.reduce((total, num) => total + num.amount, 0)})
            </button>
            <button>
              Total Store Value (
              { new Intl.NumberFormat().format(
                User.shop?.reduce(
                  (total, num) => total + num.price * num.amount,
                  0
                )
              )}{" "}
              đ)
            </button>
            <button>
              Out of Stock (
              {User.shop?.filter((product) => product.amount === 0).length})
            </button>
            <button>All Categories ({User.shop?.length})</button>
          </div>
        </div>
        <ContenerDashboard
          setditProductState={setditProductState}
          EditProductState={EditProductState}
          setproduct={setproduct}
          Products={Products}
          getDataUser={getDataUser}
          setProduct={setProduct}
        />
        {/* <PaginationProducts shop={User.shop} setProduct={setProduct} /> */}
      </div>
      {EditProductState && (
        <EditProduct
          setProduct={setProduct}
          handleChange={handleChange}
          product={product}
        />
      )}
    </div>
  );
};

export default Dashboard;
