import { Grid } from "@material-ui/core";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "src/firebase";
import LanguageContext from "src/stores/languageContext";

function OurWorks() {
  const [images, setImages] = useState([]);
  const { lang } = useContext(LanguageContext);
  const navigate = useNavigate();

  useEffect(() => {
    db.collection("worksPhoto")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setImages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      );
  }, []);

  return (
    <div style={{ margin: "30px 0" }}>
      <Grid
        container
        spacing={3}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {images.slice(0, 5).map((img) => (
          <Grid item xs={5} md={3} style={{ margin: "0 10px" }} key={img.id}>
            <img
              src={img.isObjectFile ? img.src.url : img.src}
              alt={img.name}
              style={{ width: "100%", cursor: "pointer" }}
              onClick={() => navigate(`/${lang}/islerimiz`)}
            />
          </Grid>
        ))}
        <Grid item xs={5} md={3} style={{ margin: "0 10px" }}>
          <div
            style={{
              position: "relative",
              textAlign: "center",
              color: "white",
            }}
          >
            <a href={`/${lang}/islerimiz`}>
              <img
                src={images[5]?.isObjectFile ? images[5]?.src.url : images[5]?.src}
                alt={images[5]?.name}
                style={{ width: "100%" }}
              />
              {images.length > 5 && (
                <>
                  <div
                    style={{
                      position: "absolute",
                      backgroundColor: "rgba(0, 0, 0, 0.6)",
                      width: "100%",
                      height: "100%",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      fontSize: "3rem",
                      color: "white",
                    }}
                  >
                    +{images.length - 5}
                  </div>
                </>
              )}
            </a>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default OurWorks;
