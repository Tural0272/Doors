import { createContext, useEffect, useState } from "react";

const LanguageContext = createContext({
  lang: "az",
});

export const LanguageContextProvider = ({ children }) => {
  const [lang, setLang] = useState("");
  useEffect(() => {
    const path = window.location.pathname.slice(1, 3);
    if (path === "ch") {
      setLang("az");
      return;
    }
    if (path !== 'az' && path !== 'ru' && path !== 'en') {
      setLang('az');
      return;
    }
    setLang(path);
  }, [window.location.pathname]);
  const context = { lang };
  return (
    <LanguageContext.Provider value={context}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
