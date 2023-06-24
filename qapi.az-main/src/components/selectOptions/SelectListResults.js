/* eslint-disable */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Backdrop,
  Box,
  Button,
  Card,
  Checkbox,
  Fade,
  Grid,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import { db } from "src/firebase";
import { makeStyles } from "@material-ui/styles";

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

const SelectListResults = ({
  data,
  selectedIds,
  setSelectedIds,
  search,
  type,
  ...rest
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedDoorIds, setSelectedDoorIds] = useState(selectedIds);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [searchDoors, setSearchDoors] = useState(data);
  const [displayedDoors, setDisplayedDoors] = useState(data);
  const [editElement, setEditElement] = useState({});
  const [az, setAz] = useState("");
  const [ru, setRu] = useState("");
  const [en, setEn] = useState("");
  const [label, setLabel] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSelectAll = (event) => {
    let newSelectedDoorIds;

    if (event.target.checked) {
      newSelectedDoorIds = data.map((customer) => customer.id);
    } else {
      newSelectedDoorIds = [];
    }

    setSelectedDoorIds(newSelectedDoorIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedDoorIds.indexOf(id);
    let newSelectedDoorIds = [];

    if (selectedIndex === -1) {
      newSelectedDoorIds = newSelectedDoorIds.concat(selectedDoorIds, id);
    } else if (selectedIndex === 0) {
      newSelectedDoorIds = newSelectedDoorIds.concat(selectedDoorIds.slice(1));
    } else if (selectedIndex === selectedDoorIds.length - 1) {
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
      data.filter((door) =>
        door.az.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, data]);

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
    db.collection(type).doc(doc.id).delete();
  };

  useEffect(() => {
    setAz(editElement.az || "");
    setRu(editElement.ru || "");
    setEn(editElement.en || "");
    setLabel(editElement.label || "");
  }, [editElement]);

  const handleEdit = (e) => {
    e.preventDefault();
    db.collection(type)
      .doc(editElement.id)
      .update({
        az: az,
        ru: ru,
        en: en,
        label: label,
      })
      .then(() => {
        setEditElement({});
        setAz("");
        setRu("");
        setEn("");
        setLabel("");
      });
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
                    checked={selectedDoorIds.length === data.length}
                    color="primary"
                    indeterminate={
                      selectedDoorIds.length > 0 &&
                      selectedDoorIds.length < data.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Az</TableCell>
                <TableCell>Ru</TableCell>
                <TableCell>En</TableCell>
                <TableCell>Label</TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedDoors.slice(0, limit).map((doc) => (
                <TableRow
                  hover
                  key={doc.id}
                  selected={selectedDoorIds.indexOf(doc.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedDoorIds.indexOf(doc.id) !== -1}
                      onChange={(event) => handleSelectOne(event, doc.id)}
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
                        {doc.az}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{doc.ru}</TableCell>
                  <TableCell>{doc.en}</TableCell>
                  <TableCell>{doc.label}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        setEditElement(doc);
                        handleOpen();
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      color="secondary"
                      onClick={(e) => handleDelete(e, doc)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <div
                    className={classes.paper}
                    style={{ backgroundColor: "white", zIndex: 1400 }}
                  >
                    <h2 id="transition-modal-title">Add {type}</h2>
                    <form
                      className="list__modalForm"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        lineHeight: 1.5,
                      }}
                      onSubmit={(e) => {
                        handleEdit(e);
                        handleClose();
                      }}
                    >
                      <Grid container spacing={3}>
                        <Grid item sm={12} md={6} className="list__gridItem">
                          <TextField
                            label="Az"
                            value={az}
                            onChange={(e) => setAz(e.target.value)}
                            required
                            className="list__modalInput"
                          />
                        </Grid>
                        <Grid item sm={12} md={6} className="list__gridItem">
                          <TextField
                            label="Ru"
                            value={ru}
                            onChange={(e) => setRu(e.target.value)}
                            required
                            className="list__modalInput"
                          />
                        </Grid>
                        <Grid item sm={12} md={6} className="list__gridItem">
                          <TextField
                            label="En"
                            value={en}
                            onChange={(e) => setEn(e.target.value)}
                            required
                            className="list__modalInput"
                          />
                        </Grid>
                        <Grid item sm={12} md={6} className="list__gridItem">
                          <TextField
                            label="Label"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            required
                            className="list__modalInput"
                          />
                        </Grid>
                      </Grid>
                      <div style={{ marginLeft: "auto" }}>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Edit</Button>
                      </div>
                    </form>
                  </div>
                </Fade>
              </Modal>
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={data.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

SelectListResults.propTypes = {
  data: PropTypes.array.isRequired,
};

export default SelectListResults;
