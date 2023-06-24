import { CardActionArea } from "@material-ui/core";
import { Card, CardContent, Grid } from "@material-ui/core";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import "../../styles/PhotoSquares.css";
import { useEffect, useState, useContext } from "react";
import LanguageContext from "src/stores/languageContext";
function PhotoSquares({ images, type }) {
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);
  const { lang } = useContext(LanguageContext);

  useEffect(() => {
    const changeSize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", changeSize);

    return () => window.removeEventListener("resize", changeSize);
  }, []);
  const phoneStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div>
      <NavBar>
        <Grid
          container
          spacing={3}
          style={{ flexGrow: 1, margin: "15px", marginLeft: "0" }}
        >
          {images.map((image, i) => (
            <Grid
              item
              sm={12}
              md={4}
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Card
                style={Object.assign(
                  {},
                  { maxWidth: "90%" },
                  width < 900 && phoneStyles
                )}
                className="photo__card"
              >
                <CardActionArea
                  style={Object.assign(
                    {},
                    width < 900 && { width: "50vw", order: i === 1 ? 2 : -1 }
                  )}
                >
                  <img
                    src={image.src}
                    style={{
                      objectFit: "contain",
                      width: "100%",
                    }}
                    onClick={() =>
                      navigate(
                        `/${lang}/${type}/${image.href}`
                      )
                    }
                    alt={`${image.title[lang]} qapi`}
                  />
                </CardActionArea>
                <CardContent style={{ width: "40vw" }}>
                  <a
                    href={`/${lang}/${type}/${image.href}`}
                    style={{ color: "black" }}
                  >
                    <h2>{image.title[lang]}</h2>
                  </a>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </NavBar>
    </div>
  );
}

export default PhotoSquares;
