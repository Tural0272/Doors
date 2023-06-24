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
import { makeStyles } from "@material-ui/styles";
import "../../styles/DoorsList.css";
import { db } from "src/firebase";
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

const FaqListToolbar = ({
  setSearch,
  selectedIds,
  setSelectedIds,
  allIds,
  countries,
  type,
  ...rest
}) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [az, setAz] = useState("");
  const [ru, setRu] = useState("");
  const [en, setEn] = useState("");
  const [azAns, setAzAns] = useState("");
  const [ruAns, setRuAns] = useState("");
  const [enAns, setEnAns] = useState("");
  const [priority, setPriority] = useState(1);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleReset = () => {
    handleClose();
    setAz("");
    setRu("");
    setEn("");
    setAzAns("");
    setRuAns("");
    setEnAns("");
  };

  const handleDeleteSelected = (e, data) => {
    e.preventDefault();
    data.forEach((id) => {
      db.collection("suallar").doc(id).delete();
    });
    setSelectedIds([]);
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
          Sual elave edin
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
          onClick={(e) => handleDeleteSelected(e, allIds)}
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
                placeholder="Search Question"
                variant="outlined"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
      {/* <Modal
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
        <Fade in={open}> */}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="lg"
        style={{ marginTop: "30px" }}
      >
        <DialogTitle id="scroll-dialog-title">Sual elave edin</DialogTitle>
        <DialogContent dividers>
          <div
            className={classes.paper}
            style={{ backgroundColor: "white", zIndex: 1400 }}
          >
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
                  "suallar",
                  {
                    az,
                    ru,
                    en,
                    azAns,
                    ruAns,
                    enAns,
                    priority,
                  },
                  handleReset
                );
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
                    multiline
                    maxRows={5}
                  />
                </Grid>
                <Grid item sm={12} md={6} className="list__gridItem">
                  <TextField
                    label="Az Answer"
                    value={azAns}
                    onChange={(e) => setAzAns(e.target.value)}
                    required
                    className="list__modalInput"
                    multiline
                    maxRows={5}
                  />
                </Grid>
                <Grid item sm={12} md={6} className="list__gridItem">
                  <TextField
                    label="Ru"
                    value={ru}
                    onChange={(e) => setRu(e.target.value)}
                    required
                    className="list__modalInput"
                    multiline
                    maxRows={5}
                  />
                </Grid>
                <Grid item sm={12} md={6} className="list__gridItem">
                  <TextField
                    label="Ru Answer"
                    value={ruAns}
                    onChange={(e) => setRuAns(e.target.value)}
                    required
                    className="list__modalInput"
                    multiline
                    maxRows={5}
                  />
                </Grid>
                <Grid item sm={12} md={6} className="list__gridItem">
                  <TextField
                    label="En"
                    value={en}
                    onChange={(e) => setEn(e.target.value)}
                    required
                    className="list__modalInput"
                    multiline
                    maxRows={5}
                  />
                </Grid>
                <Grid item sm={12} md={6} className="list__gridItem">
                  <TextField
                    label="En Answer"
                    value={enAns}
                    onChange={(e) => setEnAns(e.target.value)}
                    required
                    className="list__modalInput"
                    multiline
                    maxRows={5}
                  />
                </Grid>
                <Grid item sm={12} md={6} className="list__gridItem">
                  <TextField
                    label="Priority"
                    type="number"
                    value={+priority}
                    onChange={(e) => {
                      if (+e.target.value < 1) {
                        setPriority(1);
                      } else {
                        setPriority(+e.target.value);
                      }
                    }}
                    required
                    className="list__modalInput"
                    InputProps={{ inputProps: { min: 1 } }}
                  />
                </Grid>
              </Grid>
              <div style={{ marginLeft: "auto" }}>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Add</Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      {/* </Fade>
      </Modal> */}
    </Box>
  );
};

FaqListToolbar.propTypes = {
  setSearch: PropTypes.func.isRequired,
};

export default FaqListToolbar;
