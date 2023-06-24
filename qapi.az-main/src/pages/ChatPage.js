import { dbChat, authChat } from "../firebase";
import { useState, useEffect, useRef } from "react";
import Messages from "src/components/Messages";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import NavBar from "src/components/main/NavBar";
import "../styles/ChatPage.css";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Helmet } from "react-helmet";

// CREATE COMPONENT, TO FETCH ALL DATA, SEND PROPS (MESSAGES) TO THIS COMPONENT, USE REACT.MEMO

function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      message: (
        <>
          <p>
            Salam! Nə sualınız olsa buyurun! Ən tez zamanda cavablandıracıyıq!
            24/7 xidmətinizdəyik. Davam etmək üçün 'Daxil Ol' düyməsini basın və
            mesaj göndərin.
          </p>
          <p>
            Здравствуйте! Вы можете обратиться по любому вопросу. Мы постараемся
            ответить в ближайщее время! 24/7 к вашим услугам. Чтобы продолжить,
            нажмите кнопку 'Daxil Ol' ниже
          </p>
          <p>
            Hello. You can ask all your questions here. We will try to answer as
            soon as possible. Working 24/7. To continue, please, press the
            'Daxil Ol' button below
          </p>
        </>
      ),
      sender: "admin",
      timestamp: new Date(),
      type: "welcome",
    },
  ]);
  const [user, setUser] = useState(null);
  const [seenByAdmin, setSeenByAdmin] = useState(false);
  const endOfMessagesRef = useRef(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    const unsubscribe = authChat.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user) {
      dbChat
        .collection("chats")
        .doc(user.uid)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot(
          (snapshot) =>
            !snapshot.empty &&
            setMessages(
              snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            )
        );
      dbChat.collection("chats").doc(user.uid).update({
        seenByUser: true,
      });
      dbChat
        .collection("chats")
        .doc(user.uid)
        .onSnapshot((snapshot) => {
          let data = snapshot.data();
          setSeenByAdmin(data?.seenByAdmin);
        });
    }
    // authChat.signOut();
  }, [user]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (user) {
      if (messages.length === 1 && messages[0].sender === "admin") {
        await dbChat.collection("chats").doc(user.uid).set({
          userId: user.uid,
          seenByUser: false,
          seenByAdmin: false,
        });
        console.log("setting chat");
      }
      dbChat.collection("chats").doc(user.uid).collection("messages").add({
        message: message,
        sender: "user",
        timestamp: new Date(),
      });

      dbChat.collection("chats").doc(user.uid).update({
        seenByUser: true,
        seenByAdmin: false,
        timestamp: new Date(),
      });
    }
    setMessage("");

    // Scroll to bottom
    scrollToBottom();
  };

  return (
    <NavBar>
      <Helmet>
        <title>Chat</title>
      </Helmet>
      <div style={{ width: "100%" }}>
        {messages.map((msg) => (
          <Messages message={msg} user="user" />
        ))}
        {seenByAdmin && (
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
        <div ref={endOfMessagesRef} />
        {user && (
          <div className="chat__inputs" style={{ zIndex: 9999 }}>
            <InputContainer>
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button disabled={!message} type="submit" onClick={handleSend}>
                Göndər
              </Button>
            </InputContainer>
          </div>
        )}
        {!user && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button onClick={() => authChat.signInAnonymously()}>
              Daxil ol
            </Button>
          </div>
        )}
      </div>
    </NavBar>
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
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: #f4f6f8;
  z-index: 100;
  max-width: 100%;
`;

export default ChatPage;
