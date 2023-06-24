/* eslint-disable */
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { useState } from "react";
import { Search as SearchIcon } from "react-feather";
import UploadFile from "../UploadFile";
import "../../styles/DoorsList.css";
import Select from "react-select";
import { db } from "src/firebase";
import deleteImageByUrl from "src/utils/deleteImageByUrl";
import handleSubmit from "src/utils/handleSubmit";
import ModalApprove from "../ModalApprove";
import OtaqDialog from './OtaqDialog'
import GirisDialog from './GirisDialog'

const DoorListToolbar = ({
  setSearch,
  doors,
  selectedIds,
  setSelectedIds,
  countries,
  uzlenmeler,
  terkibler,
  colors,
  subtypes,
  type,
  ...rest
}) => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [toDelete, setToDelete] = useState([])

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeleteSelected = (e) => {
    e.preventDefault();
    toDelete.forEach((doc) => {
      doc.images.forEach((img) => {
        if (doc.isObjectFile) {
          deleteImageByUrl(img.url)
        } else {
          deleteImageByUrl(img)
        }
      });
      db.collection(type)
        .doc(doc.id)
        .delete()
        .then(() => setSelectedIds([]))
        .catch((err) => alert(err));
    });
    handleCloseDelete()
  };

  const handleCloseDelete = () => setOpenDelete(false);
  const handleCancelDelete = () => {
    handleCloseDelete();
    setToDelete([])
  }

  return (
    <Box {...rest}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button color="primary" variant="contained" onClick={handleOpen}>
          Add Door
        </Button>
        <Button
          color="secondary"
          onClick={() => { setOpenDelete(true); setToDelete(selectedIds) }}
        >
          Delete Selected
        </Button>
        <Button
          sx={{ mx: 1 }}
          color="secondary"
          onClick={() => { setOpenDelete(true); setToDelete(doors) }}
        >
          Delete All
        </Button>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Search Door"
                variant="outlined"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
      {type === 'otaq' && (
        <OtaqDialog confirmText='Add' handleCancel={handleClose} open={open} type={type} subtypes={subtypes} uzlenmeler={uzlenmeler} countries={countries} terkibler={terkibler} colors={colors} />
      )}
      {type === 'giris' && (
        <GirisDialog confirmText='Add' handleCancel={handleClose} open={open} type={type} uzlenmeler={uzlenmeler} countries={countries} terkibler={terkibler} />
      )}
      <ModalApprove open={openDelete} handleCancel={handleCancelDelete} handleApprove={handleDeleteSelected} handleClose={handleClose} />
    </Box>
  );
};

DoorListToolbar.propTypes = {
  setSearch: PropTypes.func.isRequired,
};

export default DoorListToolbar;
