import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useContext } from "react";
import { db } from "src/firebase";
import { Grid } from "@material-ui/core";
import NavBar from "src/components/main/NavBar";
import isEmptyObject from "src/utils/isEmptyObject";
import "src/styles/DoorDetails.css";
import ChatButton from "src/components/main/ChatButton";
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";
import Loading from "src/components/Loading";
import LanguageContext from "src/stores/languageContext";
import { Helmet } from 'react-helmet'
import sortFunction from 'src/utils/sortImages'

function DoorDetails({ type, subtype }) {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [selectedImg, setSelectedImg] = useState(null);
  const [similar, setSimilar] = useState([]);
  const navigate = useNavigate();
  const divRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const { lang } = useContext(LanguageContext);

  useEffect(() => {
    db.collection(type)
      .doc(id)
      .onSnapshot((snapshot) => {
        if (snapshot.exists) {
          setData({ id: snapshot.id, ...snapshot.data() });
          setLoading(false);
        }
      });
    if (subtype) {
      db.collection(type)
        .where("subtypeValue", "==", subtype)
        .onSnapshot((snapshot) => {
          const allDocs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          const shuffledDocs = allDocs.sort(() => 0.5 - Math.random())
          setSimilar(shuffledDocs.slice(0, 3))
        }
        );
    } else {
      db.collection(type)
        .onSnapshot((snapshot) => {
          const allDocs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          const shuffledDocs = allDocs.sort(() => 0.5 - Math.random())
          setSimilar(shuffledDocs.slice(0, 3))
        }
        );

    }
  }, [type, id, subtype, lang]);

  useEffect(() => {
    if (!isEmptyObject(data)) {
      if (data.isObjectFile) {
        setSelectedImg(data.images[0].url);
      } else {
        setSelectedImg(data.images[0]);
      }
    }
  }, [data]);

  const translations = {
    terkib: {
      az: <>
        <strong>Tərkib: </strong>{data.terkib?.az}
      </>,
      ru: <>
        <strong>Состав: </strong>{data.terkib?.ru}
      </>,
      en: <>
        <strong>Made from: </strong>{data.terkib?.en}
      </>,
    },
    uzlenme: {
      az: <>
        <strong>Üzlənmə: </strong>{data.uzlenme?.az}
      </>,
      ru: <>
        <strong>Облицовка: </strong>{data.uzlenme?.ru}
      </>,
      en: <>
        <strong>Facing: </strong>{data.uzlenme?.en}
      </>,
    },
    istehsal: {
      az: <>
        <strong>Istehsal: </strong>{data.country?.az}
      </>,
      ru: <>
        <strong>Страна: </strong>{data.country?.ru}
      </>,
      en: <>
        <strong>Country: </strong>{data.country?.en}
      </>,
    },
    included: {
      az: <>
        <strong>Qiymətə daxildir:</strong>
        <li>5 ədəd ikitərəfli yaşmaq {data.connection && ": Keçmə"}</li>
        <li>2-5 ədəd çərçivə</li>
        <strong>Mövcud rənglər:</strong>
        {data?.color?.map((clr) => (
          <li key={clr.id}>{clr.az}</li>
        ))}
      </>,
      ru: <>
        <strong>Доступные цвета:</strong>
        {data?.color?.map((clr) => (
          <li key={clr.id}>{clr.ru}</li>
        ))}
      </>,
      en: <>
        <strong>Available colors:</strong>
        {data?.color?.map((clr) => (
          <li key={clr.id}>{clr.en}</li>
        ))}
      </>,
    },
    similar: {
      az: "Oxşar qapılar",
      ru: "Похожие двери",
      en: "Similar doors",
    },
  };

  if (isEmptyObject(data)) return <NavBar />;

  return (
    <div style={{ overflowX: "hidden" }}>
      <Helmet>
        <title>{data.name} qapi</title>
        <meta name="description" content={data.metaDescription} />
      </Helmet>
      <NavBar>
        {loading && <Loading />}
        <div style={{ display: "flex", flexDirection: "column" }} ref={divRef}>
          {!loading && (
            <>
              <Grid container spacing={3}>
                <Grid
                  item
                  sm={12}
                  md={6}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    // justifyContent: "center",
                  }}
                >
                  <h2
                    style={{
                      borderBottom: "2px solid red",
                      marginBottom: "10px",
                      color: "rgba(0, 0, 0, 0.7)",
                    }}
                  >
                    {data.name} - {data.price} AZN
                  </h2>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minHeight: "200px",
                      backgroundColor: "gray",
                    }}
                  >
                    <img
                      src={selectedImg}
                      alt={`${type} qapisi`}
                      style={{ width: "90%" }}
                    />
                  </div>
                  <div
                    style={{
                      width: "90%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Grid
                      container
                      spacing={3}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {data.images.map((img) => (
                        <Grid item xs={4} sm={3} key={data.isObjectFile ? img.url : img}>
                          <img
                            src={data.isObjectFile ? img.url : img}
                            alt={`${type} qapisi`}
                            style={{ width: "100%" }}
                            onClick={() => {
                              setSelectedImg(data.isObjectFile ? img.url : img);
                            }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                </Grid>
                <Grid
                  item
                  sm={12}
                  md={6}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    // justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      fontSize: "1.4rem",
                      marginLeft: "20px",
                    }}
                  >
                    <div
                      style={{
                        marginRight: "20px",
                        fontSize: "32px",
                        marginTop: "32px",
                      }}
                    >
                      {type === 'otaq' && (
                        <div style={{ margin: '20px' }}>
                          <ul>
                            <li>{translations.terkib[lang]}</li>
                            <li>{translations.uzlenme[lang]}</li>
                            <li>{translations.istehsal[lang]}</li>
                            <li>{translations.included[lang]}</li>
                          </ul>
                        </div>
                      )}
                      {type === 'giris' && (
                        <p>{data.description[lang]}</p>
                      )}
                    </div>
                  </div>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={3}
                style={{
                  marginTop: "20px",
                  marginBottom: "50px",
                  borderTop: "2px solid lightgray",
                }}
              >
                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h1>{translations.similar[lang]}</h1>
                </Grid>
                {/* Get 3 random similar doors and map through them. */}
                {similar.map((sm) => (
                  <Grid
                    item
                    sm={12}
                    md={4}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    key={sm.id}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        navigate(`/${lang}/${type}/${subtype}/${sm.id}`);
                        divRef.current.scrollIntoView();
                      }}
                    >
                      <img
                        src={sm.isObjectFile ? sm.images.sort(sortFunction)[0].url : sm.images[0]}
                        alt="Oxsar qapilar"
                        style={{ width: "90%" }}
                        className="details__similarDoors"
                      />
                      <h2
                        style={{
                          cursor: "pointer",
                          borderBottom: "2px solid gray",
                        }}
                      >
                        {sm.name}
                      </h2>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </div>
        <ChatButton />
      </NavBar>
    </div>
  );
}

export default DoorDetails;
