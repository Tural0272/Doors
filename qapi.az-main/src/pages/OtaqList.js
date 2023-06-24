/* eslint-disable */
import { Helmet } from "react-helmet";
import { Box, Container } from "@material-ui/core";
import DoorListResults from "src/components/doors/DoorListResults";
import DoorListToolbar from "src/components/doors/DoorListToolbar";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const OtaqList = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [uzlenmeler, setUzlenmeler] = useState([]);
  const [terkibler, setTerkibler] = useState([]);
  const [colors, setColors] = useState([]);
  const [otaq, setOtaq] = useState([]);
  const [subtypes, setSubtypes] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  useEffect(() => {
    db.collection("countries").onSnapshot((snapshot) =>
      setCountries(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );
    db.collection("uzlenmeler").onSnapshot((snapshot) =>
      setUzlenmeler(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );
    db.collection("terkibler").onSnapshot((snapshot) =>
      setTerkibler(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );
    db.collection("colors").onSnapshot((snapshot) =>
      setColors(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );
    db.collection("otaq").onSnapshot((snapshot) =>
      setOtaq(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );
    db.collection("subtypes").onSnapshot((snapshot) =>
      setSubtypes(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );
  }, []);

  return (
    <>
      <Helmet>
        <title>Otaq Qapilari</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <DoorListToolbar
            setSearch={setSearch}
            countries={countries}
            uzlenmeler={uzlenmeler}
            terkibler={terkibler}
            colors={colors}
            subtypes={subtypes}
            type="otaq"
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            doors={otaq}
          />
          <Box sx={{ pt: 3 }}>
            <DoorListResults
              doors={otaq}
              search={search}
              countries={countries}
              uzlenmeler={uzlenmeler}
              terkibler={terkibler}
              colors={colors}
              subtypes={subtypes}
              type="otaq"
              setSelectedIds={setSelectedIds}
              selectedIds={selectedIds}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default OtaqList;
