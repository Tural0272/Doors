import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import { useState, Fragment, useContext, useEffect, useRef } from "react";
import MeetingRoomRoundedIcon from "@material-ui/icons/MeetingRoomRounded";
import ContactsIcon from "@material-ui/icons/Contacts";
import HelpIcon from "@material-ui/icons/Help";
import WorkIcon from "@material-ui/icons/Work";
import PhoneIcon from "@material-ui/icons/Phone";
import HomeIcon from "@material-ui/icons/Home";
import "../../styles/NavBar.css";
import {
  WhatsApp as WhatsAppIcon,
  Instagram as InstagramIcon,
} from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import data from "src/__mocks__/data";
import Select from "react-select";
import LanguageContext from "src/stores/languageContext";

const drawerWidth = 200;

function ResponsiveDrawer({ children, style }) {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] = useState({
    value: "az",
    label: "Azərbaycan",
  });
  const bodyRef = useRef(null)

  useEffect(() => {
    if (lang === "az") {
      setSelectedLang({
        value: "az",
        label: "Azərbaycan",
      });
      return;
    }
    if (lang === "ru") {
      setSelectedLang({
        value: "ru",
        label: "Русский",
      });
      return;
    }
    if (lang === "en") {
      setSelectedLang({
        value: "en",
        label: "English",
      });
      return;
    }
  }, [lang]);

  useEffect(() => {
    bodyRef.current?.scrollIntoView()
  }, [bodyRef, window.location])

  const useStyles = makeStyles(() => ({
    root: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      minHeight: "100vh",
    },
    drawer: {
      [theme.breakpoints.up("md")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up("md")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    toolbar: { ...theme.mixins.toolbar },
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }));
  const classes = useStyles();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const languageOptions = [
    {
      value: "az",
      label: "Azərbaycan",
    },
    {
      value: "ru",
      label: "Русский",
    },
    {
      value: "en",
      label: "English",
    },
  ];

  const translations = {
    homePage: {
      az: "Ana səhifə",
      ru: "Главная страница",
      en: "Home page",
    },
    warranty: {
      az: "6 ay zəmanət",
      ru: "6 месяцев гарантии",
      en: "6 moths warranty",
    },
  };

  const drawerItems = [
    {
      title: { az: "Otaq qapıları", ru: "Комнатные двери", en: "Room doors" },
      href: `/${lang}/otaq`,
      Icon: MeetingRoomRoundedIcon,
    },
    {
      title: { az: "Giriş qapıları", ru: "Входные двери", en: "Entry doors" },
      href: `/${lang}/giris`,
      Icon: MeetingRoomRoundedIcon,
    },
  ];

  const drawerItems2 = [
    {
      title: { az: "Bizim işlərimiz", ru: "Наши работы", en: "Our works" },
      href: `/${lang}/islerimiz`,
      Icon: WorkIcon,
    },
    {
      title: { az: "Əlaqə", ru: "Контакты", en: "Contact" },
      href: `/${lang}/elaqe`,
      Icon: ContactsIcon,
    },
    {
      title: { az: "Sizin suallarınız", ru: "Ваши вопросы", en: "FAQ" },
      href: `/${lang}/faq`,
      Icon: HelpIcon,
    },
  ];

  const drawer = (
    <div style={{ backgroundColor: "#dddddd", height: "100%", ...style }}>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button key="Ana səhifə" component="a" href={`/${lang}`}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={translations.homePage[lang]} />
        </ListItem>
      </List>
      <Divider />
      <List>
        {drawerItems.map(({ title, href, Icon }) => (
          <ListItem button key={title[lang]} component="a" href={href}>
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <ListItemText primary={title[lang]} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {drawerItems2.map(({ title, href, Icon }) => (
          <ListItem button key={title[lang]} component="a" href={href}>
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <ListItemText primary={title[lang]} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem>
          <Select
            options={languageOptions}
            value={selectedLang}
            className="nav__selectLang"
            onChange={(selectedOption) => {
              navigate(
                `/${selectedOption.value}${window.location.pathname.slice(3)}`
              );
              setSelectedLang(selectedOption);
            }}
          />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <div className={classes.root} style={{ marginTop: "0px" }} ref={bodyRef}>
      <CssBaseline />
      <AppBar
        position="fixed"
        style={{
          backgroundColor: `#dddddd`,
          backgroundSize: "cover",
          zIndex: 9999,
          color: "rgba(0, 0, 0, 0.8)",
        }}
        className={classes.appBar}
      >
        <Toolbar>
          <Hidden mdUp>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
          </Hidden>
          <Fragment>
            <div
              style={{
                marginLeft: 0,
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                flexGrow: 1,
              }}
            >
              <div className="nav__phoneNum">
                <h4>
                  <a
                    style={{ color: "inherit" }}
                    href={`tel:${data.phoneNumberForLink}`}
                  >
                    {data.phoneNumber}
                  </a>
                </h4>
              </div>
              <div className="nav__phoneIcon">
                <a href={`tel:${data.phoneNumberForLink}`}>
                  <PhoneIcon fontSize="large" style={{ color: "black" }} />
                </a>
              </div>
              <div>
                <h2>
                  <a style={{ color: "inherit" }} href="/">
                    Qapiaz.az
                  </a>
                </h2>
              </div>
              <div className="nav__zemanet">
                <h4>{translations.warranty[lang]}</h4>
              </div>
              <div className="nav__insta">
                <a href={data.instagramLink}>
                  <InstagramIcon
                    style={{
                      background:
                        "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)",
                      borderRadius: "20%",
                      color: "white",
                      width: "30px",
                      height: "30px",
                      marginTop: "7px",
                    }}
                  />
                </a>
                <a href={data.whatsappLink}>
                  <WhatsAppIcon
                    style={{
                      background: "#25D366",
                      color: "white",
                      borderRadius: "20%",
                      width: "30px",
                      height: "30px",
                      marginLeft: "10px",
                    }}
                  />
                </a>
              </div>
            </div>
          </Fragment>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden mdDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>

      {children}
    </div>
  );
}

export default ResponsiveDrawer;
