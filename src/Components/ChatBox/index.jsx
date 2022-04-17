import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  SearchOutlined,
  MoreVert,
  InsertEmoticon,
  Mic,
} from "@material-ui/icons";
import {
  collection,
  onSnapshot,
  doc,
  getDocs,
  getDoc,
  orderBy,
  addDoc,
  serverTimestamp,
  query,
} from "firebase/firestore";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import db from "../../firebase";
import { useStateValue } from "../../Store/StateProvider";
import "./chat.scss";
function ChatBox() {
  const [input, setInput] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const { roomID } = useParams();
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    console.log(roomID);

    if (roomID) {
      // saving document based on ID in docRef variable
      const docRef = doc(db, "rooms", roomID);
      // getting document based on ID in docRef variable
      getDoc(docRef).then((res) => setRoomName(res.data().name));
      // getting all documents from the collection messages
      onSnapshot(
        query(collection(docRef, "messages"), orderBy("timestamp", "asc")),
        (snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
          console.log(
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, [roomID]);
  const sendMessage = (e) => {
    e.preventDefault();
    const docRef = doc(db, "rooms", roomID);
    addDoc(collection(docRef, "messages"), {
      name: user.displayName,
      timestamp: serverTimestamp(),
      message: input,
    });
    console.log("MSg >>>", input);
    setInput("");
  };

  return (
    <section className="chat">
      <header className="chat__header">
        <Avatar src={`https://i.pravatar.cc/150?u=${roomID}`} />
        <div className="chat__header__info">
          <h3>{roomName}</h3>
          <p>
            {messages.length > 0 &&
              new Date(
                messages[messages.length - 1].timestamp?.toDate()
              ).toUTCString()}
          </p>
        </div>
        <div className="chart__header_right">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </header>
      <div className="chat__body">
        {messages.map((message) => (
          <p
            key={message.id}
            className={`chat__body__msg chat__body${
              message.name === user.displayName && "__msgReceiver"
            }`}
          >
            <span className="msg__name">{message.name}</span>
            {message.message}
            <span className="msg__timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <footer className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            type="text"
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <Mic />
      </footer>
    </section>
  );
}

export default ChatBox;
