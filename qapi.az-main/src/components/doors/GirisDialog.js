import {
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    TextField,
    Button
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

function GirisDialog({ open, confirmText, handleCancel, type, uzlenmeler, countries, terkibler, toEdit }) {
    const classes = useStyles();
    const [name, setName] = useState(toEdit?.name);
    const [price, setPrice] = useState(toEdit?.price);
    const [descriptionAz, setDescriptionAz] = useState(toEdit?.descriptionAz)
    const [descriptionRu, setDescriptionRu] = useState(toEdit?.descriptionRu)
    const [descriptionEn, setDescriptionEn] = useState(toEdit?.descriptionEn)
    const [country, setCountry] = useState(toEdit?.country);
    const [uzlenme, setUzlenme] = useState(toEdit?.uzlenme);
    const [terkib, setTerkib] = useState(toEdit?.terkib);
    const [metaDescription, setMetaDescription] = useState(toEdit?.metaDescription)
    const [files, setFiles] = useState([]);
    const [fileLink, setFileLink] = useState([]);

    useEffect(() => {
        setName(toEdit?.name)
        setPrice(toEdit?.price)
        setDescriptionAz(toEdit?.descriptionAz)
        setDescriptionRu(toEdit?.descriptionRu)
        setDescriptionEn(toEdit?.descriptionEn)
        setCountry(toEdit?.country)
        setUzlenme(toEdit?.uzlenme)
        setTerkib(toEdit?.terkib)
        setMetaDescription(toEdit?.metaDescription)
        setFileLink(toEdit?.images)
    }, [toEdit])

    const resetFunc = () => {
        handleCancel();
        setName("");
        setPrice("0");
        setDescriptionAz('')
        setDescriptionRu('')
        setDescriptionEn('')
        setCountry({});
        setUzlenme({});
        setTerkib({});
        setFileLink([]);
        setFileLink([])
    };

    const handleAdd = (e) => {
        handleSubmit(
            e,
            type,
            {
                name,
                price,
                description: {
                    az: descriptionAz,
                    ru: descriptionRu,
                    en: descriptionEn,
                },
                country,
                uzlenme,
                terkib,
                images: fileLink,
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
                description: {
                    az: descriptionAz,
                    ru: descriptionRu,
                    en: descriptionEn,
                },
                country,
                images: fileLink,
                uzlenme,
                terkib,
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
                                <TextField
                                    label="Description Az"
                                    value={descriptionAz}
                                    onChange={(e) => setDescriptionAz(e.target.value)}
                                    required
                                    className="list__modalInput"
                                />
                            </Grid>
                            <Grid item sm={12} md={6} className="list__gridItem">
                                <TextField
                                    label="Description Ru"
                                    value={descriptionRu}
                                    onChange={(e) => setDescriptionRu(e.target.value)}
                                    required
                                    className="list__modalInput"
                                />
                            </Grid>
                            <Grid item sm={12} md={6} className="list__gridItem">
                                <TextField
                                    label="Description En"
                                    value={descriptionEn}
                                    onChange={(e) => setDescriptionEn(e.target.value)}
                                    required
                                    className="list__modalInput"
                                />
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

export default GirisDialog
