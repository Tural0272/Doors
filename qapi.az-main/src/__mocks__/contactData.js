import {
  Instagram as InstagramIcon,
  Facebook as FacebookIcon,
  WhatsApp as WhatsAppIcon,
  Phone as PhoneIcon,
} from "@material-ui/icons";

import googleMap from "../images/google_maps.png";
import gmail from "../images/gmail.png";

import data from "src/__mocks__/data";

const socialData = [
  {
    title: {
      az: "Instagram",
      ru: "Instagram",
      en: "Instagram",
    },
    Icon: InstagramIcon,
    button: {
      az: "Instagrama keçid",
      ru: "Переход в Instagram",
      en: "Visit Instagram page",
    },
    style: {
      background:
        "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)",
      color: "white",
      borderRadius: "20%",
    },
    href: data.instagramLink,
  },
  {
    title: { az: "WhatsApp", ru: "WhatsApp", en: "WhatsApp" },
    Icon: WhatsAppIcon,
    button: {
      az: "WhatsApp-a yazın",
      ru: "Пишите в WhatsApp",
      en: "Write to WhatsApp",
    },
    style: {
      background: "#25D366",
      color: "white",
      borderRadius: "20%",
    },
    href: data.whatsappLink,
  },
  {
    title: { az: "Facebook", ru: "Facebook", en: "Facebook" },
    Icon: FacebookIcon,
    button: {
      az: "Facebook-a keçid",
      ru: "Переход в Facebook",
      en: "Visit Facebook page",
    },
    style: {
      background: "white",
      color: "#4267B2",
      borderRadius: "20%",
    },
    href: data.facebookLink,
  },
  {
    title: { az: "Xəritə", ru: "Карта", en: "Map" },
    Icon: false,
    image: googleMap,
    button: {
      az: "Xəritədə baxın",
      ru: "Посмотреть на карте",
      en: "See on map",
    },
    style: {
      background: "#1DA1F2",
      color: "white",
      borderRadius: "20%",
    },
    href: data.googleMapsLink,
  },
  {
    title: { az: "Telefon", ru: "Телефон", en: "Phone" },
    Icon: PhoneIcon,
    button: { az: "Zəng edin", ru: "Позвоните нам", en: "Call us" },
    style: {
      background: "white",
      color: "green",
      borderRadius: "20%",
    },
    href: `tel:${data.phoneNumberForLink}`,
  },
  {
    title: { az: "Mail", ru: "Mail", en: "Mail" },
    Icon: false,
    image: gmail,
    button: { az: "Mail yazın", ru: "Напишите на почту", en: "Write on mail" },
    style: {
      background: "white",
      color: "blue",
      borderRadius: "20%",
    },
    href: `mailto:${data.email}`,
  },
];

export default socialData;
