import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from "@fullcalendar/daygrid"
import jaLocale from '@fullcalendar/core/locales/ja';
import '../calendar.css'
import React from 'react'
import { DatesSetArg, EventContentArg } from '@fullcalendar/core';
import { calculateDailyBalances } from '../utils/financeCalculations';
import { Balance, CalendarContent, Transaction } from '../types';
import { formatCurrency } from '../utils/formatting';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { useTheme } from '@mui/material';
import { isSameMonth } from 'date-fns';


interface CalendarProps {
  monthlyTransactions : Transaction[]
  setCurrentMonth : React.Dispatch<React.SetStateAction<Date>>;
  setCurrentDay : React.Dispatch<React.SetStateAction<string>>
  currentDay : string,
  today : string,
}

const Calendar = ({monthlyTransactions,setCurrentMonth,setCurrentDay,currentDay,today}:CalendarProps) => {
  const theme = useTheme();
  //nodemodulesのfullcalendarから
  // const events = [
  //   { title: 'Meeting', start: new Date() },
  //   { title: 'Meeting2', start: "2024-04-11", income: 300, expense: 200, balance: 100 },
  // ]
  
  //月の取引データ
  // const monthlyTransactions = [
  //   {
  //     id: "s",
  //     date: "2024-04-21",
  //     amount: 122,
  //     content: "あはは",
  //     type: "income",
  //     category: "カテゴリ",
  //   }
  // ]

  // const dailyBalances = {
  //   "2024-04-21" : { income: 300, expense: 200, balance: 100},
  //   "2024-04-22" : { income: 300, expense: 200, balance: 100},
  // }
  // console.log(dailyBalances)

  const dailyBalances = calculateDailyBalances(monthlyTransactions)


  //fullカレンダー用
  const createCalendarEvents = (dailyBalances: Record<string,Balance>): CalendarContent[] =>{
    return Object.keys(dailyBalances).map((date)=>{
     const {income,expense,balance} = dailyBalances[date]
      return {
        start: date,
        income: formatCurrency(income),
        expense: formatCurrency(expense),
        balance: formatCurrency(balance),
      }
    })
  }

  const backgroundEvent = {
    start : currentDay,
    display : "background",
    backgroundColor : theme.palette.incomeClolor.light,
  }
  
  const calendarEvents = createCalendarEvents(dailyBalances)


  const renderEventContent = (eventInfo:EventContentArg) => {
    return(
      <div>
        <div className='money' id="event-income">
          {eventInfo.event.extendedProps.income}
        </div>

        <div className='money' id="event-expense">
          {eventInfo.event.extendedProps.expense}
        </div>

        <div className='money' id="event-balance">
          {eventInfo.event.extendedProps.balance}
        </div>
      </div>
    )
  }

  const handleDateSet = (datesetInfo:DatesSetArg) => {
    const currentMonth = datesetInfo.view.currentStart;
    setCurrentMonth(currentMonth)
    const todayDate = new Date();
    if(isSameMonth(todayDate, currentMonth)) {
      setCurrentDay(today);
    }
  }

  const handleDateClick = (dateInfo : DateClickArg) => {
    setCurrentDay(dateInfo.dateStr)
  }

  return (
    <FullCalendar 
    plugins={[dayGridPlugin,interactionPlugin]} 
    initialView='dayGridMonth' 
    locale={jaLocale} 
    events={[...calendarEvents,backgroundEvent]}
    eventContent={renderEventContent}
    datesSet={handleDateSet}
    dateClick={handleDateClick}
    />
  )
}

export default Calendar