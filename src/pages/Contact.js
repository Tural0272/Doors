import NavBar from "../components/main/NavBar";
import image from "../images/doors.jpeg";
import { Grid, Divider } from "@material-ui/core";
import firebase from "firebase";
import { useState, useContext } from "react";
import "../styles/Contact.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Social from "src/components/main/Social";
import handleSubmit from "src/utils/handleSubmit";
import LanguageContext from "src/stores/languageContext";
import { Helmet } from 'react-helmet'

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const { lang } = useContext(LanguageContext);

  const resetFunc = () => {
    toast.success("Muraciətiniz uğurla qeydə alındı", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
    setName("");
    setEmail("");
    setPhone("");
    setSubject("");
    setMessage("");
  };

  const errorFunc = (err) => {
    toast.error(err.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  const translations = {
    contact: {
      az: 'Əlaqə',
      ru: 'Связь',
      en: 'Contact'
    },
    text: {
      az: (
        <h2 style={{ padding: "20px", textAlign: "center" }}>
          Suallarınız varsa{" "}
          <a style={{ color: "blue", cursor: "pointer" }} href={`/${lang}/faq`}>
            Sual-Cavab
          </a>{" "}
          səhifəsinə baxın və ya asağıdakı form ilə müraciət edin
        </h2>
      ),
      ru: (
        <h2 style={{ padding: "20px", textAlign: "center" }}>
          Если у вас есть вопросы, посетите страцину{" "}
          <a style={{ color: "blue", cursor: "pointer" }} href="/faq">
            Ваши вопросы
          </a>{" "}
          или заполните форму снизу.
        </h2>
      ),
      en: (
        <h2 style={{ padding: "20px", textAlign: "center" }}>
          If you have questions, visit{" "}
          <a style={{ color: "blue", cursor: "pointer" }} href="/faq">
            FAQ
          </a>{" "}
          page or fill the form below.
        </h2>
      ),
    },
    form: {
      title: {
        az: "Müraciət edin",
        ru: "Свяжитесь с нами",
        en: "Contact us",
      },
      namePlaceholder: {
        az: "Ad *",
        ru: "Имя *",
        en: "Name *",
      },
      emailPlaceholder: {
        az: "Email (Məcburi deyil)",
        ru: "Электронная почта (Необязательно)",
        en: "Email (Not important)",
      },
      phonePlaceholder: {
        az: "Telefon *",
        ru: "Телефон *",
        en: "Phone *",
      },
      subjectPlaceholder: {
        az: "Mövzü (Məcburi deyil)",
        ru: "Тема (Необязательно)",
        en: 'Subject (Not important)","',
      },
      messagePlaceholder: {
        az: "Mesaj (Məcburi deyil)",
        ru: "Сообщение (Необязательно)",
        en: "Message (Not important)",
      },
      send: {
        az: "Göndər",
        ru: "Отправить",
        en: "Send",
      },
    },
  };

  return (
    <div>
      <Helmet>
        <title>{translations.contact[lang]}</title>
        <meta name="description" content="Bizimlə əlaqə saxlıyın. Ən ucuz və keyfiyyətli qapılar yalnlz bizdə, əlaqə saxlıyın." />
      </Helmet>
      <NavBar>
        <div style={{ width: "100%", overflowX: "hidden" }}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
          />
          <div>
            <img
              src={image}
              alt="qapilar"
              className="noHover"
              style={{ objectFit: "contain", width: "100%" }}
            />
          </div>
          <div>
            <Social />
            <>
              <Divider style={{ marginTop: "15px" }} />
              {translations.text[lang]}
              <Divider style={{ marginBottom: "15px" }} />
            </>
            <div>
              <form
                onSubmit={(e) => {
                  handleSubmit(
                    e,
                    "userMessages",
                    {
                      name: name,
                      email: email,
                      phone: phone,
                      subject: subject,
                      message: message,
                      timestamp:
                        firebase.firestore.FieldValue.serverTimestamp(),
                    },
                    resetFunc,
                    true,
                    errorFunc
                  );
                }}
              >
                <Grid
                  container
                  spacing={3}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    backgroundColor: "#292f33",
                    marginTop: "20px",
                    marginBottom: "20px",
                    paddingBottom: "25px",
                  }}
                >
                  <>
                    <Divider />
                    <h1
                      style={{
                        textAlign: "center",
                        color: "white",
                        borderBottom: "5px solid red",
                        padding: "0 30px",
                      }}
                    >
                      {translations.form.title[lang]}
                    </h1>
                  </>
                  <Grid item xs={12} sm={8} md={5}>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={translations.form.namePlaceholder[lang]}
                      required
                      className="contact__textField"
                    />
                  </Grid>
                  <Grid item xs={12} sm={8} md={5}>
                    <input
                      value={email}
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={translations.form.emailPlaceholder[lang]}
                      className="contact__textField"
                    />
                  </Grid>
                  <Grid item xs={12} sm={8} md={5}>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={translations.form.phonePlaceholder[lang]}
                      required
                      className="contact__textField"
                    />
                  </Grid>
                  <Grid item xs={12} sm={8} md={5}>
                    <input
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder={translations.form.subjectPlaceholder[lang]}
                      className="contact__textField"
                    />
                  </Grid>
                  <Grid item xs={12} sm={8} md={5}>
                    <textarea
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={translations.form.messagePlaceholder[lang]}
                      className="contact__textField"
                    />
                  </Grid>
                  <button type="submit" className="contact__submit">
                    {translations.form.send[lang]}
                  </button>
                </Grid>
              </form>
            </div>
          </div>
        </div>
      </NavBar>
    </div>
  );
}

export default Contact;
