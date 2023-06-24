import { Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import otaq from "../../images/otaq.jpeg";
import giris from "../../images/giris.jpeg";
import phoneOtaq from "../../images/doors.jpeg";
import phoneGiris from "src/images/phone_giris.jpeg";
import "../../styles/PhotoLinks.css";
import { useContext } from "react";
import LanguageContext from "src/stores/languageContext";

function PhotoLinks() {
  const [otaqToShow, setOtaqToShow] = useState(phoneOtaq);
  const [girisToShow, setGirisToShow] = useState(phoneGiris);
  const [width, setWidth] = useState(window.innerWidth);
  const { lang } = useContext(LanguageContext);
  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);
    };

    window.addEventListener("resize", updateWindowDimensions);

    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  useEffect(() => {
    setOtaqToShow(width < 600 ? phoneOtaq : otaq);
    setGirisToShow(width < 600 ? phoneGiris : giris);
  }, [width]);

  const translations = {
    otaq: {
      az: "Otaq qapıları",
      ru: "Комнатные двери",
      en: "Room doors",
    },
    giris: {
      az: "Giriş qapıları",
      ru: "Входные двери",
      en: "Entry doors",
    },
  };

  return (
    <Grid
      container
      spacing={3}
      style={{
        textAlign: "center",
        marginBottom: "30px",
        marginLeft: "-15px",
        paddingTop: "20px",
      }}
    >
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
          paddingLeft: 0,
        }}
      >
        <a href={`/${lang}/otaq`}>
          <img
            src={otaqToShow}
            alt="otaq"
            className="photoLink__img"
            style={{ width: width < 600 ? "100vw" : "25vw" }}
          />
        </a>
        <Typography
          component="a"
          href={`/${lang}/otaq`}
          style={{ fontSize: "2.2rem" }}
          color="black"
        >
          {translations.otaq[lang]}
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
          paddingLeft: 0,
        }}
      >
        <a href={`/${lang}/giris`}>
          <img
            src={girisToShow}
            alt="giris"
            className="photoLink__img"
            style={{ width: width < 600 ? "100vw" : "25vw" }}
          />
        </a>
        <Typography
          component="a"
          href={`/${lang}/giris`}
          style={{ fontSize: "2.2rem" }}
          color="black"
        >
          {translations.giris[lang]}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PhotoLinks;
