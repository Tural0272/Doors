/* eslint-disable */
import { Helmet } from "react-helmet";
import { Box, Container } from "@material-ui/core";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import WorksPhotoToolbar from "src/components/worksPhotos/WorksPhotoToolbar";
import WorksPhotoResults from "src/components/worksPhotos/WorksPhotoResults";

const WorksPhotoList = () => {
  const [search, setSearch] = useState("");
  const [photos, setPhotos] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  useEffect(() => {
    db.collection("worksPhoto")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPhotos(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      );
  }, []);

  return (
    <>
      <Helmet>
        <title>Islerimiz - sekiller</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <WorksPhotoToolbar
            setSearch={setSearch}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            images={photos}
          />
          <Box sx={{ pt: 3 }}>
            <WorksPhotoResults
              images={photos}
              search={search}
              setSelectedIds={setSelectedIds}
              selectedIds={selectedIds}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default WorksPhotoList;
