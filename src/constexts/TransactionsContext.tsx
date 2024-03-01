import { ReactNode, createContext, useEffect, useState } from "react";
import { API } from "../lib/axios";

interface Transaction {
    id: number;
    decription: string;
    type: 'income' | 'outcomed';
    price: number;
    category: string;
    createdAt: string;
  }

  interface createTransactionInput{
    decription: string,
      price: number,
      category: string,
      type: 'income' | 'outcome',
  }

interface TransactionsContextType{
    transactions: Transaction[]
    fetchTransactions: (query?: string) => Promise<void>
    createTransaction: (data: createTransactionInput) => Promise<void>
}

interface TransactionsProviderProps{
    children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({children}: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])

  async function fetchTransactions(query?: string) {
    const response = await API.get('/transaction', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      }
    })

    setTransactions(response.data)
  }

  async function createTransaction(data: createTransactionInput) {
    const {decription, price, category, type} = data

    const response = await API.post('transaction', {
      decription,
      price,
      category,
      type,
      createdAt: new Date(),
  })

  setTransactions(state => [response.data, ...state])
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return(
    <TransactionsContext.Provider
    value={{
    transactions,
    fetchTransactions,
    createTransaction,
  }}
    >
        {children}
    </TransactionsContext.Provider>
  )
}