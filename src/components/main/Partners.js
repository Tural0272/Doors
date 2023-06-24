import { Grid } from "@material-ui/core";
import plasticGallery from "../../images/logoNav.png";
import data from "src/__mocks__/data";

function Partners() {
  return (
    <div style={{ margin: "30px 0" }}>
      <Grid
        container
        spacing={3}
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item xs={12} md={3}>
          <a href={data.plasticGalleryLink} target="_blank" rel="noreferrer">
            <img
              src={plasticGallery}
              style={{ width: "100%" }}
              alt="plasticgallery.az"
            />
          </a>
        </Grid>
      </Grid>
    </div>
  );
}

export default Partners;
