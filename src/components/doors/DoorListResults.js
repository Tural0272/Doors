/* eslint-disable */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import { db } from "src/firebase";
import { makeStyles } from "@material-ui/styles";
import Select from "react-select";
import UploadFile from "../UploadFile";
import deleteImageByUrl from "src/utils/deleteImageByUrl";
import ModalApprove from 'src/components/ModalApprove'
import OtaqDialog from './OtaqDialog'
import GirisDialog from "./GirisDialog";

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

const DoorListResults = ({
  doors,
  countries,
  uzlenmeler,
  terkibler,
  colors,
  search,
  selectedIds,
  type,
  subtypes,
  setSelectedIds,
  ...rest
}) => {
  const [selectedDoorIds, setSelectedDoorIds] = useState(selectedIds);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [searchDoors, setSearchDoors] = useState(doors);
  const [displayedDoors, setDisplayedDoors] = useState(doors);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false)
  const [toDelete, setToDelete] = useState(null);
  const [editDoor, setEditDoor] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      doors.filter((door) =>
        door.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, doors]);

  useEffect(() => {
    setDisplayedDoors(searchDoors.slice(page * limit, (page + 1) * limit));
  }, [page, limit, searchDoors]);

  useEffect(() => {
    setSelectedIds(selectedDoorIds);
  }, [selectedDoorIds]);

  useEffect(() => {
    setSelectedDoorIds(selectedIds);
  }, [selectedIds]);

  const handleDelete = (e) => {
    e.preventDefault();
    toDelete.images.forEach((img) => {
      if (toDelete.isObjectFile) {
        deleteImageByUrl(img.url)
      } else {
        deleteImageByUrl(img)
      }
    });
    db.collection(type)
      .doc(toDelete.id)
      .delete()
      .then(() => {
        setSelectedDoorIds([]);
        handleCloseDelete();
      })
      .catch((err) => alert(err));
  };

  const handleCloseDelete = () => setOpenDelete(false);
  const handleCancelDelete = () => {
    handleCloseDelete();
    setToDelete(null)
  }

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedDoorIds.length === doors.length}
                    color="primary"
                    indeterminate={
                      selectedDoorIds.length > 0 &&
                      selectedDoorIds.length < doors.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Country</TableCell>
                {type === 'otaq' && (
                  <TableCell>Type</TableCell>
                )}
                <TableCell>Price</TableCell>
                <TableCell>Edit</TableCell>
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
                  <TableCell>{door.country.az}</TableCell>
                  {type === 'otaq' && (
                    <TableCell>{door.subtype?.az}</TableCell>
                  )}
                  <TableCell>{door.price}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        setEditDoor(door);
                        handleOpen();
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      color="secondary"
                      onClick={() => {
                        setToDelete(door);
                        setOpenDelete(true)
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {type === 'otaq' && (
                <OtaqDialog confirmText='Edit' handleCancel={handleClose} open={open} type={type} subtypes={subtypes} uzlenmeler={uzlenmeler} countries={countries} terkibler={terkibler} colors={colors} toEdit={editDoor} />
              )}
              {type === 'giris' && (
                <GirisDialog confirmText='Edit' handleCancel={handleClose} open={open} type={type} uzlenmeler={uzlenmeler} countries={countries} terkibler={terkibler} toEdit={editDoor} />
              )}
            </TableBody>
          </Table>
          <ModalApprove handleApprove={handleDelete} handleCancel={handleCancelDelete} handleClose={handleCloseDelete} open={openDelete} />
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={doors.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

DoorListResults.propTypes = {
  doors: PropTypes.array.isRequired,
};

export default DoorListResults;
