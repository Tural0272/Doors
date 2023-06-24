import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { dbChat } from "../firebase";
import Messages from "src/components/Messages";
import styled from "styled-components";
import firebase from "firebase";
import { Button } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Helmet } from "react-helmet";

function AdminChatPage() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [seenByUser, setSeenByUser] = useState(false);
  const endOfMessagesRef = useRef(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    dbChat
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      );
    dbChat.collection("chats").doc(id).update({
      seenByAdmin: true,
    });

    dbChat
      .collection("chats")
      .doc(id)
      .onSnapshot((snapshot) => {
        let data = snapshot.data();
        setSeenByUser(data.seenByUser);
      });
    scrollToBottom();
  }, [id]);

  const handleSend = (e) => {
    e.preventDefault();
    dbChat.collection("chats").doc(id).collection("messages").add({
      message: message,
      sender: "admin",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    dbChat.collection("chats").doc(id).update({
      seenByUser: false,
      seenByAdmin: true,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setMessage("");
    scrollToBottom();
  };

  return (
    <div>
      <Helmet>
        <title>Chat</title>
      </Helmet>
      {messages.map((msg) => (
        <Messages message={msg} user="admin" />
      ))}
      {seenByUser && (
        <p
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            marginRight: "10px",
          }}
        >
          <VisibilityIcon style={{ width: "20px", marginRight: "10px" }} />{" "}
          Görüldü
        </p>
      )}
      <div ref={endOfMessagesRef} style={{ width: "100%", height: "100px" }} />
      <div className="chat__inputs">
        <InputContainer>
          <Input value={message} onChange={(e) => setMessage(e.target.value)} />
          <Button disabled={!message} type="submit" onClick={handleSend}>
            Göndər
          </Button>
        </InputContainer>
      </div>
    </div>
  );
}

const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 10px;
  padding: 20px;
  background-color: lightgray;
  margin-left: 15px;
  margin-right: 15px;
`;

const InputContainer = styled.form`
  display: flex;
  align-items: flex;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: #f4f6f8;
  z-index: 100;
`;

export default AdminChatPage;
