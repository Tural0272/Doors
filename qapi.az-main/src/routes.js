import { Navigate } from "react-router-dom";
import DashboardLayout from "src/components/DashboardLayout";
import MainLayout from "src/components/MainLayout";
import OtaqList from "src/pages/OtaqList";
import GirisList from "src/pages/GirisList";
import Login from "src/pages/Login";
import NotFound from "src/pages/NotFound";
import CountryList from "src/pages/CountryList";
import TerkiblerList from "src/pages/TerkiblerList";
import UzlenmelerList from "src/pages/UzlenmelerList";
import ColorsList from "src/pages/ColorsList";
import HomePage from "./pages/HomePage";
import Doors from "./pages/Doors";
import DoorDetails from "./pages/DoorDetails";
import OurWorks from "./pages/OurWorksPage";
import DoorTypesPage from "./pages/DoorTypesPage";
import ChatPage from "./pages/ChatPage";
import AdminChatPage from "./pages/AdminChatPage";
import AdminChats from "./pages/AdminChats";
import Contact from "./pages/Contact";
import FaqPage from "./pages/FaqPage";
import FaqList from "./pages/FaqList";
// import PageNotReady from "./pages/PageNotReady";
import WorksPhotoList from "./pages/WorksPhotoList";
import WorksVideoList from "./pages/WorksVideoList";
import SalesAdmin from './pages/SalesAdmin'
import Privacy from "./pages/Privacy";

const routes = [
  {
    path: "app",
    element: <DashboardLayout />,
    children: [
      { path: "otaq", element: <OtaqList /> },
      { path: "giris", element: <GirisList /> },
      { path: "isler-sekil", element: <WorksPhotoList /> },
      { path: "isler-video", element: <WorksVideoList /> },
      { path: "chats/:id", element: <AdminChatPage /> },
      { path: "chats", element: <AdminChats /> },
      { path: "countries", element: <CountryList /> },
      { path: "terkibler", element: <TerkiblerList type='terkibler' /> },
      { path: "giris-terkibler", element: <TerkiblerList type='girisTerkibler' /> },
      { path: "uzlenmeler", element: <UzlenmelerList type='uzlenmeler' /> },
      { path: 'giris-uzlenmeler', element: <UzlenmelerList type='girisUzlenmeler' /> },
      { path: "colors", element: <ColorsList /> },
      { path: "suallar", element: <FaqList /> },
      { path: 'sales', element: <SalesAdmin /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "chats", element: <ChatPage /> },
      { path: "/", element: <Navigate to="/az" /> },
      { path: "404", element: <NotFound /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/az",
    element: <MainLayout />,
    children: [
      { path: "otaq/modern", element: <Doors type="otaq" subtype='modern' /> },
      { path: "otaq/premium", element: <Doors type="otaq" subtype='premium' /> },
      { path: "otaq", element: <DoorTypesPage type="otaq" /> },
      { path: "giris", element: <Doors type='giris' /> },
      { path: "otaq/modern/:id", element: <DoorDetails type="otaq" subtype='modern' /> },
      { path: "otaq/premium/:id", element: <DoorDetails type="otaq" subtype='premium' /> },
      { path: "giris/:id", element: <DoorDetails type="giris" /> },
      { path: "islerimiz", element: <OurWorks /> },
      { path: "faq", element: <FaqPage /> },
      { path: "elaqe", element: <Contact /> },
      { path: "privacy", element: <Navigate to='/az' /> },
      // { path: 'register', element: <Register /> },
      { path: "/", element: <HomePage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/ru",
    element: <MainLayout />,
    children: [
      { path: "otaq/modern", element: <Doors type="otaq" subtype='modern' /> },
      { path: "otaq/premium", element: <Doors type="otaq" subtype='premium' /> },
      { path: "otaq", element: <DoorTypesPage type="otaq" /> },
      { path: "giris", element: <Doors type='giris' /> },
      { path: "otaq/modern/:id", element: <DoorDetails type="otaq" subtype='modern' /> },
      { path: "otaq/premium/:id", element: <DoorDetails type="otaq" subtype='premium' /> },
      { path: "giris/:id", element: <DoorDetails type="giris" /> },
      { path: "islerimiz", element: <OurWorks /> },
      { path: "faq", element: <FaqPage /> },
      { path: "elaqe", element: <Contact /> },
      { path: 'privacy', element: <Privacy /> },
      { path: "/", element: <HomePage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/en",
    element: <MainLayout />,
    children: [
      { path: "otaq/modern", element: <Doors type="otaq" subtype='modern' /> },
      { path: "otaq/premium", element: <Doors type="otaq" subtype='premium' /> },
      { path: "otaq", element: <DoorTypesPage type="otaq" /> },
      { path: "giris", element: <Doors type='giris' /> },
      { path: "otaq/modern/:id", element: <DoorDetails type="otaq" subtype='modern' /> },
      { path: "otaq/premium/:id", element: <DoorDetails type="otaq" subtype='premium' /> },
      { path: "otaq/:subtype/:id", element: <DoorDetails type="otaq" /> },
      { path: "giris/:id", element: <DoorDetails type="giris" /> },
      { path: "islerimiz", element: <OurWorks /> },
      { path: "faq", element: <FaqPage /> },
      { path: "elaqe", element: <Contact /> },
      {
        path: "privacy", element: <Navigate to='/en' />
      },
      { path: "/", element: <HomePage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  // {
  //   path: "*",
  //   // element: <Navigate to="/404" />,
  // },
];

export default routes;
