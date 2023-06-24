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
} from "@material-ui/core";
import PropTypes from "prop-types";
import { useState } from "react";
import { Search as SearchIcon } from "react-feather";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/styles";
import UploadFile from "../UploadFile";
import "../../styles/DoorsList.css";
import { db, storage } from "src/firebase";
import deleteImageByUrl from "src/utils/deleteImageByUrl";
import handleSubmit from "src/utils/handleSubmit";

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

const WorksVideoToolbar = ({
  setSearch,
  videos,
  selectedIds,
  setSelectedIds,
  ...rest
}) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [name, setName] = useState("");

  const [files, setFiles] = useState([]);
  const [fileLink, setFileLink] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const resetFunc = () => {
    handleClose();
    setName("");
    setFileLink([]);
  };

  const handleDeleteSelected = (e, data) => {
    e.preventDefault();
    data.forEach((doc) => {
      if (doc.isObjectFile) {
        deleteImageByUrl(doc.src.url)
      } else {
        deleteImageByUrl(doc.src)
      }
      db.collection("worksVideo")
        .doc(doc.id)
        .delete()
        .then(() => setSelectedIds([]))
        .catch((err) => alert(err));
    });
  };

  return (
    <Box {...rest}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button color="primary" variant="contained" onClick={handleOpen}>
          Add Video
        </Button>
        <Button
          color="secondary"
          onClick={(e) => handleDeleteSelected(e, selectedIds)}
        >
          Delete Selected
        </Button>
        <Button
          sx={{ mx: 1 }}
          color="secondary"
          onClick={(e) => handleDeleteSelected(e, videos)}
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
                placeholder="Search Image"
                variant="outlined"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
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
            <h2 id="transition-modal-title">Add video</h2>
            <form
              className="list__modalForm"
              style={{
                display: "flex",
                flexDirection: "column",
                lineHeight: 1.5,
              }}
              onSubmit={(e) => {
                handleSubmit(
                  e,
                  "worksVideo",
                  {
                    name: name,
                    src: fileLink[0],
                    timestamp: new Date(),
                    isObjectFile: typeof (fileLink[0]) === 'object'
                  },
                  resetFunc
                );
              }}
            >
              <Grid container spacing={3}>
                <Grid item sm={12} md={6} className="list__gridItem">
                  <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="list__modalInput"
                  />
                </Grid>
                <Grid item sm={12} md={6} className="list__gridItem">
                  <UploadFile
                    files={files}
                    setFiles={setFiles}
                    fileLink={fileLink}
                    setFileLink={setFileLink}
                    type="video"
                  />
                </Grid>
              </Grid>
              <div style={{ marginLeft: "auto" }}>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Add</Button>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </Box>
  );
};

WorksVideoToolbar.propTypes = {
  setSearch: PropTypes.func.isRequired,
};

export default WorksVideoToolbar;
