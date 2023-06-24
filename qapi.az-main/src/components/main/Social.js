import { Button, Grid } from "@material-ui/core";
import contactData from "src/__mocks__/contactData";
import { useContext } from "react";
import LanguageContext from "src/stores/languageContext";

function Social() {
  const { lang } = useContext(LanguageContext);
  return (
    <Grid
      container
      spacing={0}
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        margin: "auto",
        marginBottom: "50px",
        marginTop: "20px",
        width: "80%",
      }}
    >
      {contactData.map(({ title, Icon, image, button, style, href }) => (
        <Grid
          item
          xs={6}
          md={2}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <a href={href}>
            {Icon ? (
              <Icon
                style={{
                  ...style,
                  width: "70px",
                  height: "70px",
                }}
              />
            ) : (
              <img
                src={image}
                style={{ height: "70px" }}
                className="noHover"
                alt={title[lang]}
              />
            )}
          </a>
          <h2>{title[lang]}</h2>
          <a href={href}>
            <Button>{button[lang]}</Button>
          </a>
        </Grid>
      ))}
    </Grid>
  );
}

export default Social;
