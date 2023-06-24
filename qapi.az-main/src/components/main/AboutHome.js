import { Grid, Typography } from "@material-ui/core";
import { useEffect, useState, useContext } from "react";
import logo from "src/images/page_logo.jpeg";
import "../../styles/AboutHome.css";
import LanguageContext from "src/stores/languageContext";

function AboutHome() {
  const [width, setWidth] = useState(window.innerWidth);
  const [texts, setTexts] = useState([]);
  const { lang } = useContext(LanguageContext);
  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);
    };

    window.addEventListener("resize", updateWindowDimensions);

    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  const translations = {
    aboutText: {
      az: [
        "6 ay zəmanət.",
        "Yerli və xarici istehsal olan qapılar.",
        "Keyfiyyətli çatdırılma və quraşdırılma.",
        "Ucuz qiymətlər.",
        "24/7 online.",
      ],
      ru: [
        "6 месяцев гарантии.",
        "Двери местного и иностранного производства",
        "Качественная доставка и установка",
        "Дешевые цены",
        "24/7 онлайн",
      ],
      en: [
        "6 months warranty",
        "Doors of local and foreign production",
        "High-quality delivery and installation",
        "Cheap prices",
        "24/7 online",
      ],
    },
  };
  useEffect(() => {
    lang && setTexts(translations.aboutText[lang]);
  }, [lang]);

  return (
    <div className="aboutHome">
      <Grid container spacing={3} className="about__gridContainer">
        <Grid item sm={12} md={5} className="about__gridItem">
          <img
            src={logo}
            style={{
              width: "80%",
              display: width <= 900 ? "none" : "inline-block",
            }}
            className="about__gridImage"
            alt="haqqimizda"
          />
        </Grid>
        <Grid item sm={12} md={5} className="about__gridItem">
          {texts.map((txt) => (
            <Typography className="about__gridText" key={txt}>
              {txt}
            </Typography>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

export default AboutHome;
