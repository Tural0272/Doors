import { dbChat } from "../firebase";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

function AdminChats({ ...rest }) {
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  useEffect(() => {
    dbChat
      .collection("chats")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChats(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      );
  });
  return (
    <Card {...rest}>
      <Helmet>
        <title>Chat</title>
      </Helmet>
      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Chat id</TableCell>
              <TableCell>Chata baxın</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chats.map((chat) => (
              <TableRow>
                <TableCell>{chat.id}</TableCell>
                <TableCell>
                  <Button onClick={() => navigate(`/app/chats/${chat.id}`)}>
                    Chata baxın
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
}

export default AdminChats;
