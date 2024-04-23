import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router ,Route, Routes } from 'react-router-dom';
import Home from './page/Home/Home';
import Report from './page/Report/Report';
import Notfound from './page/Notfound/Notfound';
import AppLayout from './components/layout/AppLayout';
import { theme } from './theme/theme';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { Transaction } from './types';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from './firebase';
import { format } from 'date-fns';
import { formatMonth } from './utils/formatting';
import { Schema } from './validations/schema';

function App() {

  function isFireStoreError(err: unknown):err is {code: string, message: string} {
    return typeof err === "object" && err !== null && "code" in err
  }

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    const fetchTransactions = async() => {
      //https://firebase.google.com/docs/firestore/query-data/get-data?hl=ja#get_all_documents_in_a_collection
      try {
        const querySnapshot = await getDocs(collection(db, "Transactions"));
        const transactionsDate = querySnapshot.docs.map((doc) => {
          // console.log(doc.id, " => ", doc.data());
          return{
            ...doc.data(),
            id: doc.id,
          } as Transaction
        });
        setTransactions(transactionsDate);
      } catch(err) {
        //エラー文
        if(isFireStoreError(err)){
          console.error("firstoreのエラーは：",err)
          console.error("firstoreのエラーメッセージは：",err.message)
          console.error("firstoreのエラーコードは：",err.code)
        } else {
          console.error("一般的なエラーは：", err)
        }
      }
    }
    fetchTransactions();
  },[])

  const monthlyTransactions = transactions.filter((transaction) =>{
    return transaction.date.startsWith(formatMonth(currentMonth))
  })

  //取引データ保存
  const handleSaveTransaction = async (transaction: Schema) => {
    console.log(transaction)
    try{
      //firestoreにデータ保存
      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "Transactions"), transaction);
      console.log("Document written with ID: ", docRef.id);

      const newTransaction = {
        id: docRef.id,
        ...transaction
      }as Transaction
      setTransactions(prevtransaction => 
        [...transactions, newTransaction]
      )
      

    } catch(err) {
      //エラー文
      if(isFireStoreError(err)){
        console.error("firstoreのエラーは：",err)
        console.error("firstoreのエラーメッセージは：",err.message)
        console.error("firstoreのエラーコードは：",err.code)
      } else {
        console.error("一般的なエラーは：", err)
      }
    }
  }

  const handleDeleteTransaction = async (transactionId:string) => {
    //firestoreの削除
    try{
      await deleteDoc(doc(db, "Transactions", transactionId));
      const filterdTransaction = transactions.filter((transaction)=>transaction.id !== transactionId)
      setTransactions(filterdTransaction);
    } catch(err) {
      //エラー文
      if(isFireStoreError(err)){
        console.error("firstoreのエラーは：",err)
        console.error("firstoreのエラーメッセージは：",err.message)
        console.error("firstoreのエラーコードは：",err.code)
      } else {
        console.error("一般的なエラーは：", err)
      }
    }
  }

  const handleUpdateTransaction = async (transaction:Schema,transactionId:string) => {
    try{
      const docRef = doc(db, "Transactions", transactionId);
      // Set the "capital" field of the city 'DC'
      await updateDoc(docRef, transaction);
      const updatedtransactions = transactions.map((t)=> t.id === transactionId ? {...t, ...transaction} : t) as Transaction[];
      setTransactions(updatedtransactions);
    } catch(err) {
      //エラー文
      if(isFireStoreError(err)){
        console.error("firstoreのエラーは：",err)
        console.error("firstoreのエラーメッセージは：",err.message)
        console.error("firstoreのエラーコードは：",err.code)
      } else {
        console.error("一般的なエラーは：", err)
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <Router>
      <Routes>
        <Route path="/" element={ <AppLayout /> } >
         <Route index element={ <Home monthlyTransactions={monthlyTransactions} setCurrentMonth={setCurrentMonth} onSaveTransaction={handleSaveTransaction} onDeleteTransaction={handleDeleteTransaction} onUpdateTransaction={handleUpdateTransaction}/> } />
         <Route path="/report" element={ <Report /> } /> 
         <Route path="*" element={ <Notfound /> } /> 
        </Route>
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
