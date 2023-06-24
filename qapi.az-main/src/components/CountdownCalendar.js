import { useState, useEffect, useContext } from 'react';
import LanguageContext from '../stores/languageContext';
import { db } from '../firebase';
import FlipClock from 'x-react-flipclock';
import '../styles/CountdownCalendar.css'

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

function CountdownCalendar() {
    const [endTime, setEndTime] = useState(new Date());
    const [textData, setTextData] = useState({})
    const { lang } = useContext(LanguageContext);

    useEffect(() => {
        db.collection('sales').onSnapshot(snapshot => snapshot.docs.forEach(doc => {
            let data = doc.data()
            setEndTime(new Date(data?.untilDate?.seconds * 1000));
            setTextData({ az: data.az, ru: data.ru, en: data.en });
        }));
    }, [])

    if (endTime < new Date()) return null;
    return (
        <div className='countdownCalendar__container'>
            <h1 className='countdownCalendar__text'>{textData[lang]}</h1>
            <h2 style={{ color: 'black' }}>{translations.text[lang]}</h2>
            <div style={{ margin: '50px auto' }}>
                <FlipClock
                    type="countdown"
                    count_to={endTime.toISOString()}
                    units={[
                        {
                            sep: ':',
                            type: 'days',
                            title: translations.days[lang],
                        },
                        {
                            sep: ':',
                            type: 'hours',
                            title: translations.hours[lang],
                        },
                        {
                            sep: ':',
                            type: 'minutes',
                            title: translations.minutes[lang],
                        },
                        {
                            sep: ':',
                            type: 'seconds',
                            title: translations.seconds[lang],
                        }
                    ]}
                />
            </div>
        </div>
    )
}

export default CountdownCalendar;