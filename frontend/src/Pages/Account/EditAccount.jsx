import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { update } from "../../Redux/SliceRedux/user";
import Requestbase from "../../utils/request";

const EditAccount = ({ handleCheckEdit }) => {
  const User = useSelector((state) => state.Token);
  const Dispatch = useDispatch();
  const [EditProfile, setEditProfile] = useState({});
  const [FileAvatar, setFileAvatar] = useState(undefined);

  useEffect(() => {
    setEditProfile(User);
  }, [User]);

  const handleChangeInput = (e) => {
    setEditProfile({ ...EditProfile, [e.target.id]: e.target.value });
  };

  const HandleChangeFile = (e) => {
    if (!e.target.files[0]) {
      URL.revokeObjectURL(EditProfile.photo);
      setEditProfile({ ...EditProfile, photo: User.photo });
      setFileAvatar(undefined);
      return;
    }

    if (!e.target.files[0].type.includes("image")) {
      return toast.warning("File support jpeg, png, jpg");
    }

    setFileAvatar(e.target.files[0]);
    setEditProfile({
      ...EditProfile,
      photo: URL.createObjectURL(e.target.files[0]),
    });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    console.log(EditProfile._id);
    if (!FileAvatar) {
      try {
        const res = await Requestbase.post(
          "api/users/updateprofile",
          EditProfile,
          {
            headers: {
              token: User.token,
            },
          }
        );
        Dispatch(update(res.data));
        toast.success("Update profile done");
        return handleCheckEdit();
      } catch (error) {
        toast.warning(error.response.data.message);
      }
    }

    const File = new FormData();
    File.append("image", FileAvatar);

    try {
      const Url = await Requestbase.post("single", File);
      const res = await Requestbase.post(
        "api/users/updateprofile",
        { ...EditProfile, photo: Url.data.img },
        {
          headers: {
            token: User.token,
          },
        }
      );
      Dispatch(update(res.data));
      toast.success("Update profile done");
      return handleCheckEdit();
    } catch (error) {
      toast.warning(error.response.data.message);
    }
  };

  return (
    <div className="EditAccount shadow-drop-center">
      <h2>Edit Profile</h2>
      <div className="EditAccountContener">
        <form onSubmit={HandleSubmit}>
          <label htmlFor="photo">Image Profile</label>
          <input onChange={HandleChangeFile} type="file" id="photo" />
          <label htmlFor="">Name Profile</label>
          <input
            onChange={handleChangeInput}
            id="name"
            value={EditProfile.name}
            type="text"
          />
          <label htmlFor="">Email Profile</label>
          <input
            onChange={handleChangeInput}
            id="email"
            value={EditProfile.email}
            type="text"
          />
          <label htmlFor="">Phone Profile</label>
          <input
            onChange={handleChangeInput}
            id="phone"
            value={EditProfile.phone}
            type="text"
          />
          <label htmlFor="">Bio Profile</label>
          <input
            onChange={handleChangeInput}
            id="bio"
            value={EditProfile.bio}
            type="text"
          />
        </form>
        <img src={EditProfile.photo} alt="EditProfile avatar" />
      </div>
      <button className="constant" onClick={handleCheckEdit}>
        Constant
      </button>
      <button onClick={HandleSubmit} className="saveProfile">
        Save
      </button>
    </div>
  );
};

export default EditAccount;
