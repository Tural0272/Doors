import styled from "styled-components";
import moment from "moment";

function Messages({ message, user }) {
  const TypeOfMessage = user === message.sender ? Sender : Receiver;
  return (
    <Container>
      <TypeOfMessage style={{ maxWidth: "70%" }}>
        {message.message}
        <Timestamp>
          {message.timestamp
            ? message.type === "welcome"
              ? message.timestamp.toLocaleTimeString()
              : moment(message.timestamp?.toDate()).format("LT")
            : "..."}
        </Timestamp>
      </TypeOfMessage>
    </Container>
  );
}

const Container = styled.div``;

const MessageElement = styled.p`
  width: fit-content;
  padding: 15px;
  border-radius: 8px;
  margin: 10px;
  min-width: 60px;
  padding-bottom: 26px;
  position: relative;
  text-align: right;
`;

const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #dcf8c6;
`;

const Receiver = styled(MessageElement)`
  background-color: rgb(225, 225, 225);
  text-align: left;
`;

const Timestamp = styled.span`
  color: gray;
  padding: 10px;
  font-size: 9px;
  position: absolute;
  bottom: 0;
  text-align: right;
  right: 0;
`;

export default Messages;
