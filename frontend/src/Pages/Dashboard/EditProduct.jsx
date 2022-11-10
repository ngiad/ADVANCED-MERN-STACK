import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { update } from "../../Redux/SliceRedux/user";
import Requestbase from "../../utils/request";

const EditProduct = ({ product, handleChange, setProduct }) => {
  const User = useSelector((state) => state.Token);
  const Dispatch = useDispatch();
  const [Edit, setEdit] = useState({});

  const [fileData, setFileData] = useState();
  const [Urlfile, setUrlFile] = useState(product.image);

  const fileChange = (e) => {
    if (!e.target.files[0]) {
      return;
    }

    if (!e.target.files[0].type.includes("image")) {
      return toast.warning("File support jpeg, png, jpg");
    }

    setUrlFile(URL.createObjectURL(e.target.files[0]));

    setFileData(e.target.files[0]);
  };

  useEffect(() => {
    setEdit(product);
  }, []);

  const handleChangInput = (e) => {
    setEdit({ ...Edit, [e.target.id]: e.target.value });
  };

  const handleClick = () => {
    setEdit({});
    handleChange();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fileData) {
      try {
        const res = await Requestbase.post("api/users/updateproduct", Edit, {
          headers: {
            token: User.token,
          },
        });

        Dispatch(update(res.data));
        setProduct(res.data.shop);
        handleChange();
        return toast.success("Update product done !!");
      } catch (error) {
        toast.warning(error.response.data.message);
      }
    }

    const File = new FormData();
    File.append("image", fileData);

    try {
      const Url = await Requestbase.post("single", File);

      const res = await Requestbase.post(
        "api/users/updateproduct",
        { ...Edit, image: Url.data.img },
        {
          headers: {
            token: User.token,
          },
        }
      );

      Dispatch(update(res.data));
      setProduct(res.data.shop);
      handleChange();
      return toast.success("Update product done !!");
    } catch (error) {
      toast.warning(error.response.data.message);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await Requestbase.post("api/users/deleteproduct", Edit, {
        headers: {
          token: User.token,
        },
      });

      Dispatch(update(res.data));
      setProduct(res.data.shop);
      handleChange();
      return toast.success("Delete product done !!");
    } catch (error) {
      toast.warning(error.response.data.message);
    }
  };

  return (
    <div className="EditProduct shadow-drop-center">
      <button className="closeEditProduct" onClick={handleClick}>
        X
      </button>
      <form onSubmit={handleSubmit}>
        <label htmlFor="#imgUpload">Product Image</label>
        <input
          onChange={fileChange}
          onClick={() => {
            setFileData(undefined);
            setUrlFile(product.image);
          }}
          type="file"
          id="imgUpload"
        />
        {Urlfile && <img className="srcImage" src={Urlfile} alt="imgUpload" />}
        <label htmlFor="#name">Product Name</label>
        <input
          onChange={handleChangInput}
          value={Edit.name}
          type="text"
          id="name"
          placeholder="Name Product"
        />

        <label htmlFor="#price">Product price</label>
        <input
          onChange={handleChangInput}
          value={Edit.price}
          type="text"
          id="price"
          placeholder="Price Product"
        />

        <label htmlFor="#amount">Product Amount</label>
        <input
          onChange={handleChangInput}
          type="text"
          value={Edit.amount}
          id="amount"
          placeholder="Product Amount"
        />

        <label htmlFor="#describe">Product Description</label>
        <input
          onChange={handleChangInput}
          type="text"
          value={Edit.describe}
          id="describe"
          placeholder="Product Description"
        />
      </form>
      <div className="buttonFormEdit">
        <button onClick={handleSubmit}>Save</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default EditProduct;
