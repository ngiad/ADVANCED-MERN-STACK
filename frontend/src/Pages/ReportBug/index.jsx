import React, { useState } from "react";
import HeaderContener from "../../Component/HeaderContener";
import "./ReportBug.css";
import { AiFillPhone } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import Requestbase from "../../utils/request";
import { toast } from "react-toastify";

const ReportBug = () => {
  const User = useSelector((state) => state.Token);
  const [Message, setMessage] = useState({
    message: "",
    subject: "",
  });

  const OnchangeMessage = (e) => {
    setMessage({ ...Message, [e.target.id]: e.target.value });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();

    if (!Message.message || !Message.subject) {
      return toast.warning("Import full information");
    }

    try {
      const res = await Requestbase.post("api/users/reportbug", Message, {
        headers: {
          token: User.token,
        },
      });

      if (res.data.success) {
        toast.success("Send Report Bug done !!");
        setMessage({
          message: "",
          subject: "",
        });
      }
    } catch (error) {
      toast.warning(error.response.data.message);
    }
  };

  return (
    <div className="MainReportBug">
      <HeaderContener />
      <h1 className="titleReportBug">Report bug</h1>
      <div className="Contactus">
        <form onSubmit={HandleSubmit}>
          <label htmlFor="subject">Subject</label>
          <input
            placeholder="Subject"
            onChange={OnchangeMessage}
            value={Message.subject}
            type="text"
            id="subject"
          />
          <label htmlFor="message">Message</label>
          <textarea
            onChange={OnchangeMessage}
            value={Message.message}
            id="message"
          ></textarea>
          <button>Send message</button>
        </form>
        <div className="Card_card__ReportBug">
          <h2>Our Contact Information</h2>
          <p>Fill the form or contact us via other channels listed below</p>

          <div className="bottomCardReportBug">
            <p>
              <AiFillPhone /> 0962673018
            </p>
            <p>
              <MdEmail /> devwebdainghia@gmail.com
            </p>
            <p>
              <FaMapMarkerAlt /> Hanoi, Viet nam
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportBug;
