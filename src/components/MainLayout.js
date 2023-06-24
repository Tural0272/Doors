import { Outlet } from "react-router-dom";
import { experimentalStyled } from "@material-ui/core";
import Footer from "./main/Footer";
import { LanguageContextProvider } from "src/stores/languageContext";

const MainLayoutRoot = experimentalStyled("div")(({ theme }) => ({
  backgroundColor: "#eeeeee",
  display: "flex",
  height: "100%",
  overflow: "hidden",
  width: "100%",
}));

const MainLayoutWrapper = experimentalStyled("div")({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
  paddingTop: 64,
});

const MainLayoutContainer = experimentalStyled("div")({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
});

const MainLayoutContent = experimentalStyled("div")({
  flex: "1 1 auto",
  height: "100%",
  overflow: "auto",
});

const MainLayout = () => (
  <LanguageContextProvider>
    <MainLayoutRoot>
      <MainLayoutWrapper>
        <MainLayoutContainer>
          <MainLayoutContent>
            <Outlet />
            <Footer />
          </MainLayoutContent>
        </MainLayoutContainer>
      </MainLayoutWrapper>
    </MainLayoutRoot>
  </LanguageContextProvider>
  )
;

export default MainLayout;
