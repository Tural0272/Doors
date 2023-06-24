import NavBar from "src/components/main/NavBar";
import { makeStyles } from "@material-ui/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { db } from "src/firebase";
import { useEffect, useState, useContext } from "react";
import LanguageContext from "src/stores/languageContext";
import { Helmet } from 'react-helmet'

const useStyles = makeStyles(() => ({
  root: {
    width: "85%",
    marginTop: "15px",
  },
}));

function FaqPage() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const { lang } = useContext(LanguageContext);

  useEffect(() => {
    db.collection("suallar")
      .orderBy("priority", "asc")
      .onSnapshot((snapshot) =>
        setData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      );
  }, []);

  const translations = {
    faq: {
      az: 'Sizin suallarınız',
      ru: 'Ваши вопросы',
      en: 'FAQ'
    }
  }

  return (
    <div>
      <Helmet>
        <title>{translations.faq[lang]}</title>
        <meta name="description" content="Sizin suallarınızın cavabı artıq burdadi! Sual-cavab! Əlaqə saxlıyın. Əlavə sualınız olasa əlaqə səhifəsinə kecin." />
      </Helmet>
      <NavBar>
        <div className={classes.root}>
          {data.map((data, idx) => (
            <Accordion
              defaultExpanded={idx === 0}
              style={{ marginBottom: "20px" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography style={{ fontSize: "20px" }}>
                  {idx + 1}) {data[lang]}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {lang === "az"
                    ? data.azAns
                    : lang === "ru"
                    ? data.ruAns
                    : data.enAns}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </NavBar>
    </div>
  );
}

export default FaqPage;
