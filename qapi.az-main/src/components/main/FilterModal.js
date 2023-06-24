import { useEffect, useState, useContext } from "react";
import {
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Radio,
  FormControl,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";
import Select from "react-select";
import isEmptyObject from "src/utils/isEmptyObject";
import LanguageContext from "src/stores/languageContext";
import { useNavigate } from "react-router";

function FilterModal({
  open,
  handleClose,
  uzlenmeler,
  terkibler,
  olkeler,
  rengler,
  data,
  setFilteredData,
  setPriceOrder,
  priceOrder,
  setPage
}) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [uzlenme, setUzlenme] = useState({});
  const [olke, setOlke] = useState({});
  const [terkib, setTerkib] = useState({});
  const [reng, setReng] = useState({});
  const { lang } = useContext(LanguageContext);

  const navigate = useNavigate();

  useEffect(() => {
    setPage(0);
    navigate(`?p=${1}`);
  }, [minPrice, maxPrice, uzlenme, olke, terkib, reng])

  const handleReset = () => {
    setMinPrice(0);
    setMaxPrice(Infinity);
    setUzlenme({});
    setOlke({});
    setTerkib({});
    setReng({});
    setPriceOrder("cte");
    handleClose();
  };
  useEffect(() => {
    setFilteredData(
      data
        .filter((el) => +el.price >= +minPrice && +el.price <= +maxPrice)
        .filter(
          (el) => isEmptyObject(uzlenme) || el.uzlenme.value === uzlenme.value
        )
        .filter((el) => isEmptyObject(olke) || el.country.value === olke.value)
        .filter(
          (el) => isEmptyObject(terkib) || el.terkib.value === terkib.value
        )
        .filter(
          (el) =>
            isEmptyObject(reng) ||
            el.color.filter((clr) => clr.id === reng.id).length > 0
        )
    );
  }, [minPrice, maxPrice, uzlenme, olke, terkib, reng, data, setFilteredData]);

  const translations = {
    colors: {
      az: "Rənglər",
      ru: "Цвета",
      en: "Colors",
    },
    compositions: {
      az: "Tərkiblər",
      ru: "Составы",
      en: "Compositions",
    },
    facings: {
      az: "Üzlənmələr",
      ru: "Облицовка",
      en: "Facings",
    },
    countries: {
      az: "Ölkələr",
      ru: "Страны",
      en: "Countries",
    },
    price: {
      az: "Qiymət",
      ru: "Цена",
      en: "Price",
    },
    minPrice: {
      az: "Minimum qiymət",
      ru: "Минимальная цена",
      en: "Minimum price",
    },
    maxPrice: {
      az: "Maksimum qiymət",
      ru: "Максимальная цена",
      en: "Maximum price",
    },
    order: {
      az: "Qiymət ardıcıllıqı",
      ru: "Порядок цен",
      en: "Price order",
    },
    cte: {
      az: "Ucuzdan bahaya",
      ru: "С дешевой на дорогую",
      en: "From cheap to expensive",
    },
    etc: {
      az: "Bahadan ucuza",
      ru: "С дорогой на дешевую",
      en: "From expensive to cheaper",
    },
    cancel: {
      az: "Sıfırla",
      ru: "Обнулить",
      en: "Cancel",
    },
    save: {
      az: "Yadda saxla",
      ru: "Сохранить",
      en: "Save",
    },
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="lg"
        style={{ marginTop: "30px" }}
      >
        <DialogTitle id="scroll-dialog-title">Filter</DialogTitle>
        <DialogContent dividers>
          <form
            style={{
              width: "50vw",
              display: "flex",
              flexDirection: "column",
              lineHeight: 1.5,
            }}
          >
            <Grid container spacing={3}>
              {rengler && (
                <Grid item xs={12} md={6}>
                  <label>{translations.colors[lang]}</label>
                  <Select
                    options={rengler}
                    value={reng}
                    onChange={(selectedOption) => setReng(selectedOption || {})}
                    isSearchable
                    isClearable
                  />
                </Grid>
              )}
              <Grid item xs={12} md={6}>
                <label>{translations.compositions[lang]}</label>
                <Select
                  options={terkibler}
                  value={terkib}
                  onChange={(selectedOption) => setTerkib(selectedOption || {})}
                  isSearchable
                  isClearable
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <label>{translations.facings[lang]}</label>
                <Select
                  options={uzlenmeler}
                  value={uzlenme}
                  onChange={(selectedOption) =>
                    setUzlenme(selectedOption || {})
                  }
                  isSearchable
                  isClearable
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <label>{translations.countries[lang]}</label>
                <Select
                  options={olkeler}
                  value={olke}
                  onChange={(selectedOption) => setOlke(selectedOption || {})}
                  isSearchable
                  isClearable
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <label>{translations.price[lang]}</label>
                <div>
                  <TextField
                    style={{ width: "40%", marginRight: "15px" }}
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    placeholder={translations.minPrice[lang]}
                    value={minPrice === 0 ? "" : minPrice}
                    onChange={(e) => setMinPrice(+e.target.value || 0)}
                  />
                  <TextField
                    style={{ width: "40%" }}
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    placeholder={translations.maxPrice[lang]}
                    value={
                      maxPrice === Infinity || maxPrice === 0 ? "" : maxPrice
                    }
                    onChange={(e) => setMaxPrice(+e.target.value || Infinity)}
                  />
                </div>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <label>{translations.order[lang]}</label>
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    aria-label="qiymet"
                    name="qiymet"
                    value={priceOrder}
                    onChange={(e) => setPriceOrder(e.target.value)}
                  >
                    <FormControlLabel
                      value="cte"
                      control={<Radio />}
                      label={translations.cte[lang]}
                    />
                    <FormControlLabel
                      value="etc"
                      control={<Radio />}
                      label={translations.etc[lang]}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <DialogActions>
              <Button onClick={handleReset} color="primary">
                {translations.cancel[lang]}
              </Button>
              <Button onClick={handleClose} color="primary">
                {translations.save[lang]}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default FilterModal;
