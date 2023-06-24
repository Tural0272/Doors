/* eslint-disable */
import { Helmet } from "react-helmet";
import { Box, Container } from "@material-ui/core";
import SelectListResults from "src/components/selectOptions/SelectListResults";
import SelectListToolbar from "src/components/selectOptions/SelectListToolbar";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const TerkiblerList = ({ type }) => {
  const [search, setSearch] = useState("");
  const [terkibler, setTerkibler] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [allIds, setAllIds] = useState([]);
  useEffect(() => {
    db.collection(type).onSnapshot((snapshot) =>
      setTerkibler(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );
  }, []);

  useEffect(() => {
    setAllIds(terkibler.map((terkib) => terkib.id));
  }, [terkibler]);

  return (
    <>
      <Helmet>
        <title>Terkibler</title>
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
              data={terkibler}
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

export default TerkiblerList;
