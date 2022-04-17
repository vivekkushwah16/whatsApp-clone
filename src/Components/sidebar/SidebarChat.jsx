import { Avatar } from "@material-ui/core";
import {
  collection,
  addDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import db from "../../firebase";
import "./SidebarChat.scss";
function SidebarChat({ addNewChat, name, id }) {
  const [messages, setMessages] = useState([]);
  const creatChat = () => {
    const roomName = prompt("Please enter name for chat room");
    if (roomName) {
      addDoc(collection(db, "rooms"), {
        name: roomName,
      });
    }
  };
  useEffect(() => {
    if (id) {
      const docRef = doc(db, "rooms", id);
      onSnapshot(
        query(collection(docRef, "messages"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, [id]);
  return !addNewChat ? (
    <Link to={`/rooms/${id}`} className="sidebar__link">
      <div className="sidebar__chat">
        <Avatar src={`https://i.pravatar.cc/150?u=${id}`} />
        <div className="sidebar__chat__info">
          <h2>{name}</h2>
          <p>{messages.length > 0 && messages[0].message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={creatChat} className="sidebar__chat">
      <h2>Add new Chat</h2>
    </div>
  );
}

export default SidebarChat;
