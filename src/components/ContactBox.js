import React from "react";
import doubleCheck from "../assets/done_all.svg";
import Avatar from "./avatar";
import { Link } from "react-router-dom";

export default function ContactBox({ chat }) {
  function truncate(text, length) {
    return text.length > length ? `${text.substring(0, length)} ...` : text;
  }
  return (
    <React.Fragment>
      <Link to={"/chat/" + chat._id}>
        <div key={chat._id} className="contact-box">
          <Avatar />
          <div className="right-section">
            <div className="contact-box-header">
            </div>
            <div className="last-msg">
              <img src={doubleCheck} alt="" className="icon-small" />
              <span className="text">{truncate("...........", 30)}</span>
            </div>
          </div>
        </div>
      </Link>
    </React.Fragment>
  );
}
