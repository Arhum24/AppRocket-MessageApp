import React from "react";
import Avatar from "./avatar";
import Search from "./search";
import ContactBox from "./contacts";
import Welcome from "./Welcome";
import Options from "./Options";
import { withRouter } from "react-router-dom";
import "../App.css";

const ChatPage = (socket) => {
  const [chatcon, setChatcon] = React.useState([]);

  React.useEffect(() => {
    var token = localStorage.getItem("token");
    fetch("https://approcketmessaging-node.herokuapp.com/api/allusersdata", {
    method: 'GET',    
    headers: {
          'x-access-token': token, "Access-Control-Allow-Origin": "*",
      },
      })
      .then((response) => {
        setChatcon(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <div className="app">
      <aside>
        <header>
          <Avatar user={{}} />
        </header>
        <Options/>
        <Search />
        <div className="contact-boxes">
          {chatcon.map((chatcon) => (
            <ContactBox chat={chatcon} />
          ))}
        </div>
      </aside>
      <div style={{ width: "100%" }}>
        <Welcome />
      </div>
    </div>
  );
};

export default withRouter(ChatPage);
