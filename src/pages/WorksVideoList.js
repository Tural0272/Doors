/* eslint-disable */
import { Helmet } from "react-helmet";
import { Box, Container } from "@material-ui/core";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import WorksVideoToolbar from "src/components/worksVideo/WorksVideoToolbar";
import WorksVideoResults from "src/components/worksVideo/WorksVideoResults";

const WorksVideoList = () => {
  const [search, setSearch] = useState("");
  const [videos, setVideos] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  useEffect(() => {
    db.collection("worksVideo")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setVideos(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      );
  }, []);

  return (
    <>
      <Helmet>
        <title>Islerimiz - videolar</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <WorksVideoToolbar
            setSearch={setSearch}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            videos={videos}
          />
          <Box sx={{ pt: 3 }}>
            <WorksVideoResults
              videos={videos}
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

export default WorksVideoList;
