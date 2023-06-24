/* eslint-disable */
import "react-perfect-scrollbar/dist/css/styles.css";
import { useRoutes } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import GlobalStyles from "src/components/GlobalStyles";
// import "src/mixins/chartjs";
import theme from "src/theme";
import routes from "src/routes";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { login, logout } from "./features/user/userSlice";
import "./styles/App.css";

const App = () => {
  const routing = useRoutes(routes);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in
        dispatch(login({ uid: authUser.uid, email: authUser.email }));
      } else {
        // user has logged out
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);
  
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
