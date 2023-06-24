/* eslint-disable */
import {
    Box,
    Button,
    TextField,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    Container,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import "../styles/DoorsList.css";
import { db } from "src/firebase";
import handleSubmit from "src/utils/handleSubmit";
import moment from 'moment'

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
    const [untilDate, setUntilDate] = useState(new Date());
    const [data, setData] = useState({})

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleReset = () => {
        handleClose();
        setAz("");
        setRu("");
        setEn("");
        setUntilDate(new Date());
    };

    useEffect(() => {
        db.collection('sales').onSnapshot(snapshot => setData(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0]));
    }, []);

    useEffect(() => {
        setAz(data?.az);
        setRu(data?.ru);
        setEn(data?.en);
        setUntilDate(new Date(data?.untilDate?.seconds * 1000))
    }, [data])

    return (
        <Box
            sx={{
                backgroundColor: "background.default",
                minHeight: "100%",
                py: 3,
            }}
        >
            <Container maxWidth={false}>
                <Box {...rest}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Button color="primary" variant="contained" onClick={handleOpen}>
                            Endirimi redakt edin
                        </Button>
                    </Box>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        scroll="paper"
                        aria-labelledby="scroll-dialog-title"
                        aria-describedby="scroll-dialog-description"
                        maxWidth="lg"
                        style={{ marginTop: "30px", marginBottom: '100px' }}
                    >
                        <DialogTitle id="scroll-dialog-title">Endirimi redakt edin</DialogTitle>
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
                                    onSubmit={async (e) => {
                                        e.preventDefault();
                                        const idToDelete = data.id;
                                        handleSubmit(
                                            e,
                                            "sales",
                                            {
                                                az,
                                                ru,
                                                en,
                                                untilDate: new Date(untilDate)
                                            },
                                            handleReset
                                        );
                                        await db.collection('sales').doc(idToDelete).delete();
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
                                            <input
                                                style={{ width: '100%', height: '100%' }}
                                                type='date'
                                                value={untilDate}
                                                onChange={(e) => setUntilDate(e.target.value)}
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
                </Box>
                <Box sx={{ pt: 3 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Az</TableCell>
                                <TableCell>Ru</TableCell>
                                <TableCell>En</TableCell>
                                <TableCell>Until date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{data?.az}</TableCell>
                                <TableCell>{data?.ru}</TableCell>
                                <TableCell>{data?.en}</TableCell>
                                <TableCell>{moment(data?.untilDate?.seconds * 1000).format("dddd, MMMM Do YYYY, h:mm:ss a")}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Box>
            </Container>
        </Box>
    );
};

FaqListToolbar.propTypes = {
    setSearch: PropTypes.func.isRequired,
};

export default FaqListToolbar;
