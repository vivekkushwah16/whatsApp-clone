import { Avatar, IconButton } from "@material-ui/core";
import { Chat, DonutLarge, MoreVert, SearchOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import db from "../../firebase";
import "./sidebar.scss";
import SidebarChat from "./SidebarChat";
import { doc, onSnapshot, collection } from "firebase/firestore";
import { useStateValue } from "../../Store/StateProvider";
function Sidebar() {
  const [rooms, setRooms] = useState([]);
 const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "rooms"),
      (snapshot) => {
        setRooms(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
        console.log(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      },
      (error) => {
        console.log(error);
      }
    );
    console.log(user.photoURL)
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <aside className="sidebar">
      <header className="sidebar__header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar__header__right">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </header>
      <div className="sidebar__search">
        <div className="sidebar__search__container">
          <SearchOutlined />
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {rooms.length > 0 &&
          rooms.map((room) => (
            <SidebarChat key={room.id} name={room.data.name} id={room.id} />
          ))}
      </div>
    </aside>
  );
}

export default Sidebar;
