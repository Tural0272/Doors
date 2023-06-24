/* eslint-disable */
import { Helmet } from "react-helmet";
import { Box, Container } from "@material-ui/core";
import SelectListResults from "src/components/selectOptions/SelectListResults";
import SelectListToolbar from "src/components/selectOptions/SelectListToolbar";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const CountryList = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [allIds, setAllIds] = useState([]);
  useEffect(() => {
    db.collection("countries").onSnapshot((snapshot) =>
      setCountries(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );
  }, []);

  useEffect(() => {
    setAllIds(countries.map((country) => country.id));
  }, [countries]);

  return (
    <>
      <Helmet>
        <title>Olkeler</title>
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
            type="countries"
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            allIds={allIds}
          />
          <Box sx={{ pt: 3 }}>
            <SelectListResults
              data={countries}
              search={search}
              type="countries"
              setSelectedIds={setSelectedIds}
              selectedIds={selectedIds}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CountryList;
