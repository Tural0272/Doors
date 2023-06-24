/* eslint-disable */
import { Helmet } from "react-helmet";
import { Box, Container } from "@material-ui/core";
import FaqListResults from "src/components/faq/FaqListResults";
import FaqListToolbar from "src/components/faq/FaqListToolbar";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const FaqList = () => {
  const [search, setSearch] = useState("");
  const [questions, setQuestions] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [allIds, setAllIds] = useState([]);
  useEffect(() => {
    db.collection("suallar")
      .orderBy("priority", "asc")
      .onSnapshot((snapshot) =>
        setQuestions(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        )
      );
  }, []);

  useEffect(() => {
    setAllIds(questions.map((qst) => qst.id));
  }, [questions]);

  return (
    <>
      <Helmet>
        <title>Suallar</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <FaqListToolbar
            setSearch={setSearch}
            // type="colors"
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            allIds={allIds}
          />
          <Box sx={{ pt: 3 }}>
            <FaqListResults
              data={questions}
              search={search}
              //   type="colors"
              setSelectedIds={setSelectedIds}
              selectedIds={selectedIds}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default FaqList;
