/* eslint-disable */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";
import { db } from "src/firebase";
import { makeStyles } from "@material-ui/styles";
import deleteImageByUrl from "src/utils/deleteImageByUrl";

const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "white",
    boxShadow: "0 0 1px 0 rgba(0,0,0,0.31), 0 4px 6px -2px rgba(0,0,0,0.25)",
    padding: "16px 32px 24px",
  },
}));

const WorksVideoResults = ({
  videos,
  selectedIds,
  setSelectedIds,
  search,
  ...rest
}) => {
  const [selectedDoorIds, setSelectedDoorIds] = useState(selectedIds);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [searchDoors, setSearchDoors] = useState(videos);
  const [displayedDoors, setDisplayedDoors] = useState(videos);

  const handleSelectAll = (event) => {
    let newSelectedDoorIds;

    if (event.target.checked) {
      newSelectedDoorIds = doors.map((door) => door);
    } else {
      newSelectedDoorIds = [];
    }

    setSelectedDoorIds(newSelectedDoorIds);
  };
  const handleSelectOne = (event, doc) => {
    const selectedIndex = selectedDoorIds.indexOf(doc);
    let newSelectedDoorIds = [];

    if (selectedIndex === -1) {
      newSelectedDoorIds = newSelectedDoorIds.concat(selectedDoorIds, doc);
    } else if (selectedIndex === 0) {
      newSelectedDoorIds = newSelectedDoorIds.concat(selectedDoorIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedDoorIds = newSelectedDoorIds.concat(
        selectedDoorIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedDoorIds = newSelectedDoorIds.concat(
        selectedDoorIds.slice(0, selectedIndex),
        selectedDoorIds.slice(selectedIndex + 1)
      );
    }

    setSelectedDoorIds(newSelectedDoorIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    setSearchDoors(
      videos.filter((door) =>
        door.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, videos]);

  useEffect(() => {
    setDisplayedDoors(searchDoors.slice(page * limit, (page + 1) * limit));
  }, [page, limit, searchDoors]);

  useEffect(() => {
    setSelectedIds(selectedDoorIds);
  }, [selectedDoorIds]);

  useEffect(() => {
    setSelectedDoorIds(selectedIds);
  }, [selectedIds]);

  const handleDelete = (e, doc) => {
    e.preventDefault();
    if (doc.isObjectFile) {
      deleteImageByUrl(doc.src.url)
    } else {
      deleteImageByUrl(doc.src)
    }
    db.collection("worksVideo")
      .doc(doc.id)
      .delete()
      .then(() => setSelectedDoorIds([]))
      .catch((err) => alert(err));
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedDoorIds.length === videos.length}
                    color="primary"
                    indeterminate={
                      selectedDoorIds.length > 0 &&
                      selectedDoorIds.length < videos.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedDoors.slice(0, limit).map((door) => (
                <TableRow
                  hover
                  key={door.id}
                  selected={selectedDoorIds.indexOf(door.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedDoorIds.indexOf(door) !== -1}
                      onChange={(event) => handleSelectOne(event, door)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Typography color="textPrimary" variant="body1">
                        {door.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Button
                      color="secondary"
                      onClick={(e) => handleDelete(e, door)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={videos.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

WorksVideoResults.propTypes = {
  videos: PropTypes.array.isRequired,
};

export default WorksVideoResults;
