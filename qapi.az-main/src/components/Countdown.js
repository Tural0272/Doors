import { useState, useEffect, useContext } from 'react';
import LanguageContext from '../stores/languageContext';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../styles/Countdown.css';
import { db } from '../firebase';
import { Grid } from '@material-ui/core'

const translations = {
    days: {
        az: 'Gün',
        ru: 'Дней',
        en: 'Days'
    },
    hours: {
        az: 'Saat',
        ru: 'Часов',
        en: 'Hours'
    },
    minutes: {
        az: 'Dəqiqə',
        ru: 'Минут',
        en: 'Minutes'
    },
    seconds: {
        az: 'Saniyə',
        ru: 'Секунд',
        en: 'Seconds'
    },
    text: {
        az: 'Endirimlərin bitməsinə son: ',
        ru: 'До конца скидок: ',
        en: 'Expiration date: '
    }
}

function Countdown() {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [days, setDays] = useState(0);
    const [isSale, setIsSale] = useState(false);
    const [endTime, setEndTime] = useState(new Date());
    const [textData, setTextData] = useState({})
    const { lang } = useContext(LanguageContext);
    useEffect(() => {
        let interval = setInterval(() => {
            let timeDifference = endTime - new Date();
            if (timeDifference < 0) {
                setIsSale(false);
                return;
            };
            setIsSale(true)
            let daysDiff = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
            setDays(daysDiff)
            timeDifference -= daysDiff * 24 * 60 * 60 * 1000;
            let hoursDiff = Math.floor(timeDifference / (1000 * 60 * 60));
            setHours(hoursDiff)
            timeDifference -= hoursDiff * 60 * 60 * 1000;
            let minutesDiff = Math.floor(timeDifference / (1000 * 60));
            setMinutes(minutesDiff)
            timeDifference -= minutesDiff * 60 * 1000;
            let secondsDiff = Math.floor(timeDifference / 1000);
            setSeconds(secondsDiff)
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, [endTime]);

    useEffect(() => {
        db.collection('sales').onSnapshot(snapshot => snapshot.docs.map(doc => {
            let data = doc.data()
            setEndTime(new Date(data?.untilDate?.seconds * 1000));
            setTextData({ az: data.az, ru: data.ru, en: data.en });
        }));
    }, [])

    if (!isSale) return null;
    return (
        <>
            <div className='countdown__text'>
                <h1>{textData[lang]}</h1>
                <h2>{translations.text[lang]}</h2>
            </div>
            <Grid container>
                <Grid item xs={6} sm={6} md={3} className='countdown__gridItem'>
                    <CircularProgressbar value={31 - days} maxValue={31} text={days || "0"} style={{ color: 'red' }} />
                    <h2>{translations.days[lang]}</h2>
                </Grid>
                <Grid item xs={6} sm={6} md={3} className='countdown__gridItem'>
                    <CircularProgressbar value={60 - hours} maxValue={60} text={hours || "0"} />
                    <h2>{translations.hours[lang]}</h2>
                </Grid>
                <Grid item xs={6} sm={6} md={3} className='countdown__gridItem'>
                    <CircularProgressbar value={60 - minutes} maxValue={60} text={minutes || "0"} />
                    <h2>{translations.minutes[lang]}</h2>
                </Grid>
                <Grid item xs={6} sm={6} md={3} className='countdown__gridItem'>
                    <CircularProgressbar value={60 - seconds} maxValue={60} text={seconds || "0"} />
                    <h2>{translations.seconds[lang]}</h2>
                </Grid>
            </Grid>
        </>
    )
}

export default Countdown