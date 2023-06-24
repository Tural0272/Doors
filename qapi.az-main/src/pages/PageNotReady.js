import NavBar from "src/components/main/NavBar";
import "src/styles/PageNotReady.css";
import { useContext } from "react";
import LanguageContext from "src/stores/languageContext";
import { Helmet } from 'react-helmet'

function PageNotReady({ title }) {
  const { lang } = useContext(LanguageContext);
  const translations = {
    title: {
      az: 'Bu səhifə hal hazırda hazırlanır.',
      ru: 'Данная страница все еще подготовливается.',
      en: 'This page is still being prepared.'
    },
    textOne: {
      az: "Bu səhifə hal hazırda hazırlanır.",
      ru: "Данная страница все еще подготовливается.",
      en: "This page is still being prepared.",
    },
    textTwo: {
      az: "Müvəqqəti narahatçılıqa görə üzr istəyirik.",
      ru: "Просим прощения за временные неудобства.",
      en: "Sorry for inconvenience.",
    },
    button: {
      az: "Əsas səhifəyə qayıt",
      ru: "Вернуться на основную страницу",
      en: "Return to main page",
    },
  };

  return (
    <div>
      <Helmet>
        <title>{translations.title[lang]}</title>
      </Helmet>
      <NavBar>
        <div className="notReady__wrapper">
          <div className="notReady__container">
            <h1>{title}</h1>
              <p>{translations.textOne[lang]}</p>
              <p>{translations.textTwo[lang]}</p>
            <a href="/">
              <button className="notReady__button">
                {translations.button[lang]}
              </button>
            </a>
          </div>
        </div>
      </NavBar>
    </div>
  );
}

export default PageNotReady;
