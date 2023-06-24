import { Helmet } from "react-helmet";
import { Box, Button, Container, Typography } from "@material-ui/core";
import { useContext } from "react";
import LanguageContext from "src/stores/languageContext";

const NotFound = () => {
  const { lang } = useContext(LanguageContext);
  const translations = {
    textOne: {
      az: "404: Axtardığınız səhifə burada deyil",
      ru: "404: Страница, которую вы ищете, здесь не находится",
      en: "404: The page you are looking for is not here",
    },
    textTwo: {
      az: "Ya bir neçə kölgəli marşrutu sınadınız, ya da səhvən buraya gəldiniz. Hansı olursa olsun, naviqasiyadan istifadə etməyə çalışın.",
      ru: "Либо вы пробовали несколько теневых маршрутов, либо попали сюда по ошибке. Как бы то ни было, попробуйте использовать навигацию.",
      en: "Either you tried a few shady routes, or you came here by mistake. Whatever it is, try to use navigation.",
    },
    button: {
      az: "Geri qayıt",
      ru: "Вернуться назад",
      en: "Go back",
    },
  };
  return (
    <>
      <Helmet>
        <title>404</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography align="center" color="textPrimary" variant="h1">
            {translations.textOne[lang || 'az']}
          </Typography>
          <Typography align="center" color="textPrimary" variant="subtitle2">
            {translations.textTwo[lang || 'az']}
          </Typography>
          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              alt="Under development"
              src="/static/images/undraw_page_not_found_su7k.svg"
              style={{
                marginTop: 50,
                display: "inline-block",
                maxWidth: "100%",
                width: 560,
              }}
            />
            <Button href={`/${lang || 'az'}`}>{translations.button[lang || 'az']}</Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default NotFound;
