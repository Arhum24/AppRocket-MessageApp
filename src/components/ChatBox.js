import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

const ChatBox = ({ match, socket }) => {
  const chatId = match.params.id;
  const chatroomName = match.params.name;
  const [messages, setMessages] = React.useState([]);
  const messageRef = React.useRef();

  const [userId, setUserId] = React.useState("");

  const sendMessage = () => {
    if (socket) {
      socket.emit("MessageinChat", {
        chatId,
        message: messageRef.current.value,
      });

      messageRef.current.value = "";
    } else {
      alert("No socket");
    }
  };
  const getInitalHistory = () => {
      var token = localStorage.getItem('token');
    fetch("https://approcketmessaging-node.herokuapp.com/api/message/" + chatId, {
        method: 'GET',
        headers: {
            'x-access-token': token, "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        console.log(response.data, " = response");
        const newMessages = [...messages, ...response.data];
        setMessages(newMessages);
      })
      .catch((err) => {
        console.log(err);
        setTimeout(getInitalHistory, 11000);
      });
  };

  React.useEffect(() => {
    getInitalHistory();
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload.id);
    }
    if (socket) {
      socket.on("newMessage", (message) => {
        const newMessages = [...messages, message];
        setMessages(newMessages);
      });
      socket.on("broadcast", (message) => {
        const newMessages = [...messages, message];
        setMessages(newMessages);
      });
    }
  }, [messages]);

  React.useEffect(() => {
    if (socket) {
      socket.emit("JoinChat", {
        chatId,
      });
    }
  }, []);

  return (
    <div className="">
      <Link to="/ChatPage" style={{ textDecoration: "none" }}>
        <p style={{ marginLeft: "98%", fontSize: 30 }}>X</p>
      </Link>
      <div className="">
        <div className="cardHeader">Group: {chatroomName}</div>
        <div className="">
          {messages.map((message, i) => (
            <div key={i} className="message">
              <span
                className={
                  userId === message.user ? "ownMessage" : "otherMessage"
                }
              >
                {message.userName}:
              </span>{" "}
              {message.message}
            </div>
          ))}
        </div>
        <div className="chatroomActions">
          <div>
            <input
              type="text"
              name="message"
              placeholder="Say something!"
              ref={messageRef}
            />
          </div>
          <div>
            <button className="join" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ChatBox);
