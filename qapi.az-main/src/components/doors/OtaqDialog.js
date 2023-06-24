import {
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    TextField,
    Button,
    Checkbox
} from '@material-ui/core'
import handleSubmit from 'src/utils/handleSubmit';
import Select from "react-select";
import UploadFile from '../UploadFile';
import { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/styles";
import { db } from 'src/firebase';

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

function OtaqDialog({ open, confirmText, handleCancel, type, subtypes, uzlenmeler, countries, terkibler, colors, toEdit }) {
    const classes = useStyles();
    const [name, setName] = useState(toEdit?.name);
    const [price, setPrice] = useState(toEdit?.price);
    const [country, setCountry] = useState(toEdit?.country);
    const [subtype, setSubtype] = useState(toEdit?.subtype);
    const [uzlenme, setUzlenme] = useState(toEdit?.uzlenme);
    const [terkib, setTerkib] = useState(toEdit?.terkib);
    const [color, setColor] = useState(toEdit?.color);
    const [kecme, setKecme] = useState(!!toEdit?.connection);
    const [metaDescription, setMetaDescription] = useState(toEdit?.metaDescription)
    const [files, setFiles] = useState([]);
    const [fileLink, setFileLink] = useState([]);

    useEffect(() => {
        setName(toEdit?.name)
        setPrice(toEdit?.price)
        setCountry(toEdit?.country)
        setSubtype(toEdit?.subtype)
        setUzlenme(toEdit?.uzlenme)
        setTerkib(toEdit?.terkib)
        setColor(toEdit?.color)
        setMetaDescription(toEdit?.metaDescription)
        setFileLink(toEdit?.images)
    }, [toEdit])

    const resetFunc = () => {
        handleCancel();
        setName("");
        setPrice("0");
        setCountry({});
        setUzlenme({});
        setTerkib({});
        setColor([]);
        setFileLink([]);
        setSubtype({});
        setFileLink([])
    };

    const handleAdd = (e) => {
        handleSubmit(
            e,
            type,
            {
                name,
                price,
                country,
                uzlenme,
                terkib,
                color,
                images: fileLink,
                subtype,
                subtypeValue: subtype.value,
                metaDescription,
                isObjectFile: typeof (fileLink[0]) === 'object'
            },
            resetFunc
        );
    }

    const handleEdit = (e) => {
        e.preventDefault();
        db.collection(type)
            .doc(toEdit.id)
            .update({
                name,
                price,
                country,
                images: fileLink,
                uzlenme,
                terkib,
                color,
                connection: kecme,
                subtype,
                subtypeValue: subtype.value,
                metaDescription,
                isObjectFile: typeof (fileLink[0]) === 'object'
            })
            .then(() => handleCancel());
    };

    const onSubmit = toEdit ? handleEdit : handleAdd;

    return (
        <Dialog
            open={open}
            onClose={handleCancel}
            scroll="paper"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            maxWidth="lg"
            style={{ marginTop: "30px" }}
        >
            <DialogTitle id="scroll-dialog-title">Add door to {type}</DialogTitle>
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
                            if (fileLink.length === 0) {
                                alert('Upload Images');
                                return;
                            }
                            onSubmit(e)
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
                                <TextField
                                    label="Price"
                                    type="number"
                                    InputProps={{ inputProps: { min: 0 } }}
                                    value={price}
                                    onChange={(e) => setPrice((+e.target.value).toString())}
                                    required
                                    className="list__modalInput"
                                />
                            </Grid>
                            <Grid item sm={12} md={6} className="list__gridItem">
                                <label htmlFor="kecme">Kecme</label>
                                {console.log(kecme)}
                                <Checkbox id='kecme' checked={kecme} onChange={(e) => setKecme(e.target.checked)} />
                            </Grid>
                            <Grid item sm={12} md={6} className="list__gridItem">
                                <TextField
                                    label="Meta description"
                                    value={metaDescription}
                                    onChange={(e) => setMetaDescription(e.target.value)}
                                    required
                                    className="list__modalInput"
                                />
                            </Grid>
                            <Grid item sm={12} md={6} className="list__gridItem">
                                <label>Subtype</label>
                                <Select
                                    options={subtypes}
                                    value={subtype}
                                    onChange={(selectedOption) => setSubtype(selectedOption)}
                                    isSearchable
                                />
                            </Grid>
                            <Grid
                                item
                                sm={12}
                                md={6}
                                className="list__gridItem"
                                style={{ display: "flex", flexDirection: "column" }}
                            >
                                <label htmlFor="uzlenme">Uzlenmeler</label>
                                <Select
                                    id="uzlenme"
                                    options={uzlenmeler}
                                    className="list__modalInput"
                                    value={uzlenme}
                                    onChange={(selectedOption) => setUzlenme(selectedOption)}
                                    isSearchable
                                />
                            </Grid>
                            <Grid
                                item
                                sm={12}
                                md={6}
                                className="list__gridItem"
                                style={{ display: "flex", flexDirection: "column" }}
                            >
                                <label htmlFor="countries">Olke</label>
                                <Select
                                    id="countries"
                                    options={countries}
                                    className="list__modalInput"
                                    value={country}
                                    onChange={(selectedOption) => setCountry(selectedOption)}
                                    isSearchable
                                />
                            </Grid>
                            <Grid
                                item
                                sm={12}
                                md={6}
                                className="list__gridItem"
                                style={{ display: "flex", flexDirection: "column" }}
                            >
                                <label htmlFor="terkibler">Terkib</label>
                                <Select
                                    id="terkibler"
                                    options={terkibler}
                                    className="list__modalInput"
                                    value={terkib}
                                    onChange={(selectedOption) => setTerkib(selectedOption)}
                                    isSearchable
                                />
                            </Grid>
                            <Grid
                                item
                                sm={12}
                                md={6}
                                className="list__gridItem"
                                style={{ display: "flex", flexDirection: "column" }}
                            >
                                <label htmlFor="colors">Reng</label>
                                <Select
                                    id="colors"
                                    options={colors}
                                    className="list__modalInput"
                                    value={color}
                                    onChange={(selectedOption) => setColor(selectedOption)}
                                    isSearchable
                                    isMulti
                                />
                            </Grid>
                            <Grid item sm={12} md={6} className="list__gridItem">
                                <UploadFile
                                    files={files}
                                    setFiles={setFiles}
                                    fileLink={fileLink}
                                    setFileLink={setFileLink}
                                    multiple
                                />
                            </Grid>
                        </Grid>
                        <div style={{ marginLeft: "auto" }}>
                            <Button onClick={handleCancel}>Cancel</Button>
                            <Button type="submit">{confirmText}</Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default OtaqDialog
