import NavBar from "src/components/main/NavBar";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import { Typography, Divider } from "@material-ui/core";
import { useContext } from "react";
import LanguageContext from "src/stores/languageContext";

import PhotoLinks from "src/components/main/PhotoLinks";
import AboutHome from "src/components/main/AboutHome";
import Partners from "src/components/main/Partners";
import OurWorks from "src/components/main/OurWorks";
import ChatButton from "src/components/main/ChatButton";
import CountdownCalendar from '../components/CountdownCalendar'

import "../styles/HomePage.css";
import Social from "src/components/main/Social";
import { Helmet } from 'react-helmet'
import Countdown from "src/components/Countdown";

function HomePage() {
  const { lang } = useContext(LanguageContext);
  const theme = useTheme();
  const useStyles = makeStyles({
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      // padding: theme.spacing(3),
      // margin: "15px",
    },
  });

  const translations = {
    about: {
      az: "Haqqımızda",
      ru: "О нас",
      en: "About us",
    },
    works: {
      az: "Bizim işlərimiz",
      ru: "Наши работы",
      en: "Our works",
    },
    social: {
      az: "Sosial şəbəkələr",
      ru: "Социальные сети",
      en: "Social media",
    },
    partners: {
      az: "Tərəfdaşlarımız",
      ru: "Наши партнеры",
      en: "Our partners",
    },
  };

  const classes = useStyles();
  return (
    <div style={{ overflowX: "hidden" }}>
      <Helmet>
        <title>Qapiaz.az</title>
        <meta name="description" content="Ən keyfiyyətli otaq və qiriş qapıları, ən ucuz qiymətlərlə, zəmanətlə yalnız bizdə." />
      </Helmet>
      <NavBar>
        <main className={classes.content}>
          <div className="home__parallax home__parallaxOne">
            <PhotoLinks />
            <Divider />
          </div>
          <div style={{ width: '80%', margin: '0 auto' }}>
            {window.innerWidth < 900 ? (
              <CountdownCalendar />
            ) : (
              <Countdown />
            )}
          </div>
          <div className="home__parallax home__parallaxTwo">
            <div style={{ textAlign: "center" }}>
              <Typography
                style={{ fontSize: "2rem", margin: "20px 0", color: "white" }}
                component="a"
              // href="/haqqimizda"
              >
                {translations.about[lang]}
              </Typography>
            </div>
            {/* <Divider /> */}
            <AboutHome />
            <Divider />
          </div>
          {/* <Divider /> */}
          <div className="home__parallax home__parallaxOne">
            <div style={{ textAlign: "center" }}>
              <Typography
                style={{ fontSize: "2rem", margin: "20px 0", color: "black" }}
                component="a"
                href={`${lang}/islerimiz`}
              >
                {translations.works[lang]}
              </Typography>
            </div>
            <OurWorks />
            <Divider />
          </div>
          <div className="home__parallax home__parallaxTwo">
            <div style={{ textAlign: "center" }}>
              <Typography
                style={{ fontSize: "2rem", margin: "20px 0", color: "white" }}
                component="a"
                href={`${lang}/elaqe`}
              >
                {translations.social[lang]}
              </Typography>
            </div>
            <Social />
            <Divider />
          </div>
          <div className="home__parallax home__parallaxOne">
            <div style={{ textAlign: "center" }}>
              <Typography
                style={{ fontSize: "2rem", margin: "20px 0", color: "black" }}
                component="a"
              // href={`${lang}/terefdaslarimiz`}
              >
                {translations.partners[lang]}
              </Typography>
            </div>
            {/* <Divider /> */}
            <Partners />
          </div>
          <ChatButton />
        </main>
      </NavBar>
    </div>
  );
}

export default HomePage;
