/* eslint-disable */
import { Helmet } from "react-helmet";
import { Box, Container } from "@material-ui/core";
import SelectListResults from "src/components/selectOptions/SelectListResults";
import SelectListToolbar from "src/components/selectOptions/SelectListToolbar";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const UzlenmelerList = ({ type }) => {
  const [search, setSearch] = useState("");
  const [uzlenmeler, setUzlenmeler] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [allIds, setAllIds] = useState([]);
  useEffect(() => {
    db.collection(type).onSnapshot((snapshot) =>
      setUzlenmeler(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );
  }, [type]);

  useEffect(() => {
    setAllIds(uzlenmeler.map((terkib) => terkib.id));
  }, [uzlenmeler]);

  return (
    <>
      <Helmet>
        <title>Uzlenmeler</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <SelectListToolbar
            setSearch={setSearch}
            type={type}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            allIds={allIds}
          />
          <Box sx={{ pt: 3 }}>
            <SelectListResults
              data={uzlenmeler}
              search={search}
              type={type}
              setSelectedIds={setSelectedIds}
              selectedIds={selectedIds}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default UzlenmelerList;
