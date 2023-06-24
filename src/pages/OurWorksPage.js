import "../styles/OurWorks.css";
import NavBar from "../components/main/NavBar";
import { useEffect, useState, useContext } from "react";
import DemoCoverflow from "src/components/main/Coverflow";
import { Close as CloseIcon } from "@material-ui/icons";
import bg from "../images/fullScreen_back.jpeg";
import ChatButton from "src/components/main/ChatButton";
import CoverflowVideo from "src/components/main/CoverflowVideo";
import { db } from "src/firebase";
import LanguageContext from "src/stores/languageContext";
import { Helmet } from 'react-helmet'

function OurWorks() {
  const [index, setIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const { lang } = useContext(LanguageContext);

  useEffect(() => {
    const changeSize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeSize);
    return () => window.removeEventListener("resize", changeSize);
  }, []);

  useEffect(() => {
    db.collection("worksPhoto")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setImages(snapshot.docs.map((doc) => ({ id: doc.data, ...doc.data() })))
      );
    db.collection("worksVideo")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setVideos(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      );
  }, []);

  const translations = {
    worksPhotos: {
      az: "Bizim işlərimiz - Fotolar",
      ru: "Наши работы - Фотографии",
      en: "Our works - Photos",
    },
    worksVideos: {
      az: "Bizim işlərimiz - Videolar",
      ru: "Наши работы - Видео",
      en: "Our works - Videos",
    },
    works: {
      az: "Bizim işlərimiz",
      ru: "Наши работы",
      en: "Our works",
    }
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <Helmet>
        <title>{translations.works[lang]}</title>
        <meta name="description" content="Bizim işlərimiziz nümünələri burda. Ən keyfiyyətli və ən ucuz qapılar. Quraşdırılma ən yüksək səviyyədə. Ustalarımız əsl ustadi!" />
      </Helmet>
      {selectedImage !== null && (
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100vw",
            height: "100vh",
            zIndex: 9998,
            backgroundImage: `url(${bg})`,
            overflow: "hidden",
            display: "flex",
          }}
        >
          <button
            onClick={() => setSelectedImage(null)}
            style={{
              color: "white",
              backgroundColor: "transparent",
              border: "none",
              fontSize: "2rem",
              position: "absolute",
              top: "3%",
              left: "95%",
              transform: "translate(-95%, -3%)",
              cursor: "pointer",
              zIndex: 9999,
            }}
          >
            <CloseIcon fontSize="large" />
          </button>
          {/* <img
              src={albums[selectedImage].src}
              className="noHover fullScreen"
            /> */}
          <DemoCoverflow
            setSelectedImage={setSelectedImage}
            index={index}
            setIndex={setIndex}
            albums={images}
            len={images.length}
            background={bg}
            buttonColor="white"
            isFullScreen
          />
        </div>
      )}
      {selectedImage === null && (
        <NavBar>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "50px",
            }}
          >
            {images.length > 0 && (
              <>
                <h2>{translations.worksPhotos[lang]}</h2>
                <div style={{ display: "flex" }}>
                  <DemoCoverflow
                    setSelectedImage={setSelectedImage}
                    width={width}
                    index={index}
                    setIndex={setIndex}
                    albums={images}
                    len={images.length}
                    allowFullScreen
                    allowHoverScale
                    buttonColor="black"
                  />
                </div>
              </>
            )}
            {videos.length > 0 && (
              <>
                <h2>{translations.worksVideos[lang]}</h2>
                <div style={{ display: "flex" }}>
                  <CoverflowVideo
                    width={width}
                    albums={videos}
                    len={videos.length}
                    buttonColor="black"
                  />
                </div>
              </>
            )}
          </div>

          <ChatButton />
        </NavBar>
      )}
    </div>
  );
}

export default OurWorks;
