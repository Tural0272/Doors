import { Chat as ChatIcon } from "@material-ui/icons";

function ChatButton() {
  return (
    <div style={{ position: "absolute", bottom: "30px", right: "30px" }}>
      <a href="/chats">
        <button
          style={{
            border: "none",
            color: "white",
            padding: "10px",
            borderRadius: "50%",
            backgroundColor: "red",
            cursor: "pointer",
            width: "70px",
            height: "70px",
          }}
        >
          <ChatIcon style={{ width: "30px", height: "30px" }} />
        </button>
      </a>
    </div>
  );
}

export default ChatButton;
