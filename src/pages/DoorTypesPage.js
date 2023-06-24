import PhotoSquares from "src/components/main/PhotoSquares";
import premium from "../images/premium.jpeg";
import modern from "../images/modern.jpeg";
import giris from "../images/giris.jpeg";
import ChatButton from "src/components/main/ChatButton";
import { Helmet } from 'react-helmet';
import { useContext } from 'react';
import LanguageContext from "src/stores/languageContext"

function DoorTypesPage({ type }) {
  const { lang } = useContext(LanguageContext)
  const otaqOptions = [
    { src: modern, title: { az: "Modern və Klassik", ru: "Модерн и Классические", en: "Modern and Classic" }, href: 'modern' },
    { src: premium, title: { az: "Premium", ru: "Премиум", en: "Premium" }, href: 'premium' },
  ];

  const girisOptions = [
    { src: giris, title: { az: "Klassik", ru: "Классические", en: "Classic" }, href: 'classic' },
    { src: giris, title: { az: "Klassik", ru: "Классические", en: "Classic" }, href: 'classic' },
  ];

  const translations = {
    types: {
      az: 'Qapı növləri',
      ru: 'Типы дверей',
      en: 'Door types'
    }
  }
  return (
    <div>
      <Helmet>
        <title>{translations.types[lang]}</title>
        <meta name="description" content="Klassik,premium, modern qapılar mövcuddur. Ən keyfiyyətli qapılar. Lux premium qapılar. Zəmanətlə qapılar" />
      </Helmet>
      <PhotoSquares
        images={type === "otaq" ? otaqOptions : girisOptions}
        type={type}
      />
      <ChatButton />
    </div>
  );
}

export default DoorTypesPage;
