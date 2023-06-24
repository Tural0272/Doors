import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
  TextField,
} from "@material-ui/core";
import { useTheme } from "@emotion/react";
import { makeStyles } from "@material-ui/styles";
import NavBar from "src/components/main/NavBar";
import { useEffect, useState, useContext, useRef } from "react";
import { db } from "src/firebase";
import { useNavigate, useLocation } from "react-router-dom";
import ChatButton from "src/components/main/ChatButton";
import "src/styles/Doors.css";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import slides from "src/__mocks__/slides";
import FilterModal from "src/components/main/FilterModal";
import SearchIcon from "@material-ui/icons/Search";
import Loading from "src/components/Loading";
import ReactPaginate from "react-paginate";
import LanguageContext from "src/stores/languageContext";
import { Helmet } from 'react-helmet';
import sortFunction from 'src/utils/sortImages'
import useQuery from 'src/hooks/useQuery';

function Doors({ type, subtype }) {
  const [data, setData] = useState([]);
  // Filter by name, price, uzlenme, olke, terkib, reng
  const [open, setOpen] = useState(false);
  const [uzlenmeler, setUzlenmeler] = useState([]);
  const [olkeler, setOlkeler] = useState([]);
  const [terkibler, setTerkibler] = useState([]);
  const [rengler, setRengler] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [loading, setLoading] = useState(true);
  const [priceOrder, setPriceOrder] = useState("cte");
  const [searchName, setSearchName] = useState("");
  const [dataToShow, setDataToShow] = useState(data);
  const [page, setPage] = useState(0);
  const [numOfPages, setNumOfPages] = useState(0);
  const { lang } = useContext(LanguageContext);
  let query = useQuery();
  const { search } = useLocation();

  useEffect(() => {
    const pg = query.get('p');
    if (!pg) {
      setPage(0);
      return;
    }
    setPage(pg - 1)
  }, [search])

  const bodyRef = useRef(null)

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const theme = useTheme();
  const useStyles = makeStyles({
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      // margin: "15px",
    },
  });
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    if (subtype) {
      db.collection(type)
        .where("subtypeValue", "==", subtype.toLowerCase())
        .onSnapshot((snapshot) => {
          setData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
          setLoading(false);
        });
    } else {
      db.collection(type)
        .onSnapshot((snapshot) => {
          setData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
          setLoading(false);
        });
    }
    db.collection(type === 'otaq' ? "uzlenmeler" : 'girisUzlenmeler').onSnapshot((snapshot) => {
      setUzlenmeler(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          label: doc.data()[lang],
        }))
      );
    });
    db.collection("countries").onSnapshot((snapshot) =>
      setOlkeler(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          label: doc.data()[lang],
        }))
      )
    );
    db.collection(type === 'otaq' ? "terkibler" : 'girisTerkibler').onSnapshot((snapshot) =>
      setTerkibler(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          label: doc.data()[lang],
        }))
      )
    );
    db.collection("colors").onSnapshot((snapshot) =>
      setRengler(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          label: doc.data()[lang],
        }))
      )
    );
  }, [type, subtype, lang]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    setDataToShow(
      filteredData.filter((el) =>
        el.name.toLowerCase().includes(searchName.toLowerCase())
      )
    );
  }, [searchName, filteredData]);

  useEffect(() => {
    setNumOfPages(Math.ceil(dataToShow.length / 12));
  }, [dataToShow]);

  const handlePageClick = (pageNum) => {
    // setPage(pageNum.selected);
    navigate(`?p=${pageNum.selected + 1}`);
    bodyRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const translations = {
    door: {
      az: "Qapı",
      ru: "Дверь",
      en: "Door",
    },
    doors: {
      az: "Qapılar",
      ru: "Двери",
      en: "Doors",
    },
    filter: {
      az: "Filter",
      ru: "Фильтр",
      en: "Filter",
    },
    noInfo: {
      az: "Məlumat tapılmadı",
      ru: "Информация не найдена",
      en: "No information was found",
    },
    readMore: {
      az: "Daha çox oxu",
      ru: "Увидеть все",
      en: "Read more",
    },
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      <Helmet>
        <title>{translations.doors[lang]}</title>
        <meta name="description" content="Exclusive otaq və giriş qapıları.Azərbaycanda ən keyfiyyətli və ucuz qapılar. Qapılarin zəmanəti var." />
      </Helmet>
      <div ref={bodyRef} />
      <NavBar>
        {loading && <Loading />}
        <FilterModal
          open={open}
          handleClose={handleClose}
          uzlenmeler={uzlenmeler}
          terkibler={terkibler}
          olkeler={olkeler}
          rengler={type === 'otaq' ? rengler : null}
          data={data}
          setFilteredData={setFilteredData}
          setPriceOrder={setPriceOrder}
          priceOrder={priceOrder}
          setPage={setPage}
        />
        {!loading && (
          <Grid
            container
            spacing={0}
            className={classes.content}
          // style={{ marginTop: "5px" }}
          >
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "20px 30px",
              }}
            >
              {/* <div> */}
              <TextField
                label={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div>
                      <SearchIcon />
                    </div>
                    <div style={{ marginBottom: "5px" }}>
                      {translations.door[lang]}
                    </div>
                  </div>
                }
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                style={{ width: "50vmin" }}
              />
              <Button
                onClick={handleOpen}
                style={{
                  border: "2px solid #3B9862",
                  backgroundColor: "#3B9862",
                  color: "white",
                }}
              >
                {translations.filter[lang]}
              </Button>
            </Grid>
            {dataToShow.length === 0 && (
              <div
                style={{
                  width: "100%",
                  height: "70vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h1>{translations.noInfo[lang]}</h1>
              </div>
            )}
            {dataToShow
              .sort((a, b) =>
                priceOrder === "cte"
                  ? Number(a.price) - Number(b.price)
                  : Number(b.price) - Number(a.price)
              )
              .slice(page * 12, (page + 1) * 12)
              .map((door, i) => (
                <>
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={4}
                    className="doors__gridItem"
                    key={i}
                  >
                    <Card
                      style={{ width: '90%' }}
                      className="doors__gridCard"
                    >
                      <CardActionArea style={{ backgroundColor: '#dedede' }}>
                        <img
                          // style={{ height: "30vh" }}
                          src={door.isObjectFile ? door.images.sort(sortFunction)[0]?.url : door.images[0]}
                          alt={`${type} qapisi`}
                          onClick={() =>
                            navigate(type === 'otaq' ? `/${lang}/${type}/${subtype}/${door.id}` : `/${lang}/${type}/${door.id}`)
                          }
                          className="card__img"
                        />
                        <CardContent style={{ backgroundColor: 'white' }}>
                          <Typography gutterBottom variant="h4" component="h2">
                            {door.name} - {door.price} AZN
                          </Typography>
                          <Typography
                            variant="h5"
                            color="textSecondary"
                            component="p"
                          >
                            {door.country?.[lang]}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button
                          size="small"
                          color="primary"
                          onClick={() =>
                            navigate(type === 'otaq' ? `/${lang}/${type}/${subtype}/${door.id}` : `/${lang}/${type}/${door.id}`)
                          }
                        >
                          {translations.readMore[lang]}
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                  {(i + 1) % 6 === 0 && (
                    <ImageGallery
                      items={slides}
                      autoPlay
                      showThumbnails={false}
                      showBullets
                      showFullscreenButton={false}
                      lazyLoad
                      disableSwipe
                      disableKeyDown
                      showNav={false}
                      showPlayButton={false}
                      additionalClass="doors__slides"
                    />
                  )}
                </>
              ))}
          </Grid>
        )}
        <ChatButton />
      </NavBar>
      <div>
        <ReactPaginate
          pageCount={numOfPages}
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          containerClassName="news__pagination"
          previousLinkClassName="news__paginationLink"
          nextLinkClassName="news__paginationLink"
          disabledClassName="news__paginationDisabled"
          activeClassName="news__paginationActive"
          nextLabel="Növbəti"
          previousLabel="Əvvəlki"
          forcePage={page}

        />
      </div>
    </div>
  );
}

export default Doors;
