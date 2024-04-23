import { Box } from '@mui/material'
import React, { useState } from 'react'
import MonthlySummary from '../../components/MonthlySummary'
import Calendar from '../../components/Calendar'
import TransactionMenu from '../../components/TransactionMenu'
import TransactionForm from '../../components/TransactionForm'
import { Transaction } from '../../types'
import { format } from 'date-fns'
import { Schema } from '../../validations/schema'

interface HomeProps {
  monthlyTransactions : Transaction[],
  setCurrentMonth : React.Dispatch<React.SetStateAction<Date>>;
  onSaveTransaction : (transaction: Schema ) => Promise<void>;
  onDeleteTransaction : (transactionId: string) => Promise<void>;
  onUpdateTransaction : (transaction: Schema, transactionId: string) => Promise<void>;

}

const Home = ({monthlyTransactions,setCurrentMonth,onSaveTransaction,onDeleteTransaction,onUpdateTransaction}:HomeProps) => {
  const today = format (new Date(),"yyyy-MM-dd");
  const [currentDay,setCurrentDay] = useState(today);
  const [isEntryDrawerOpen,setIsEntryDrawerOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)

  //1日分
  const dailyTransactions = monthlyTransactions.filter((taransaction) => {
    return taransaction.date === currentDay;
  })

  const closeForm = () => {
    setIsEntryDrawerOpen(!isEntryDrawerOpen);
    setSelectedTransaction(null)
  }

  const handleSelectTransaction = (transaction:Transaction) => {
    setIsEntryDrawerOpen(true);
    setSelectedTransaction(transaction);
  }

  const handleAddTransationForm = () => {
    if(selectedTransaction){
      setSelectedTransaction(null);
    } else {
      setIsEntryDrawerOpen(!isEntryDrawerOpen);
    }
  }



  return (
    <Box sx={{display:{sm:"block",md:"flex"},gap:"20px"}}>
    <Box sx={{flexGrow:'1'}}>
      {/* 左側のコンテンツ */}
      <MonthlySummary monthlyTransactions={monthlyTransactions}/>
      <Calendar monthlyTransactions={monthlyTransactions} setCurrentMonth ={setCurrentMonth} setCurrentDay={setCurrentDay} currentDay={currentDay} today={today}/>
    </Box>

    <Box>
    {/* 右側のコンテンツ */}
    <TransactionMenu dailyTransactions={dailyTransactions} currentDay={currentDay} onAddTransationForm={handleAddTransationForm} onSelectTransaction={handleSelectTransaction}/>
    <TransactionForm onCloseForm={closeForm} isEntryDrawerOpen={isEntryDrawerOpen} currentDay={currentDay} onSaveTransaction={onSaveTransaction} selectedTransaction={selectedTransaction} setSelectedTransaction={setSelectedTransaction} onDeleteTransaction={onDeleteTransaction} onUpdateTransaction={onUpdateTransaction}/>
    </Box>
    </Box>
  )
}

export default Home