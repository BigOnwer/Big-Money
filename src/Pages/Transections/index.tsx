import { useContext } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PriceHighlight, TransactionContainer, TransactionsTable } from "./styles";
import { TransactionsContext } from "../../constexts/TransactionsContext";
import { DateFormartter, priceFormatter } from "../../utils/formatter";



export function Transections() {
  const {transactions} = useContext(TransactionsContext)

    return(
        <div>
            <Header/>
            <Summary/>
            <TransactionContainer>
            <SearchForm/>
                <TransactionsTable>
                    <tbody>
                      {transactions.map(transaction => {
                        return(
                          <tr key={transaction.id}>
                          <td width="50%">{transaction.decription}</td>
                          <td>
                            <PriceHighlight variant={transaction.type}>
                              {priceFormatter.format(transaction.price)}
                              </PriceHighlight>
                          </td>
                          <td>{transaction.category}</td>
                          <td>{DateFormartter.format(new Date(transaction.createdAt))}</td>
                      </tr>
                        )
                      })}
                    </tbody>
                </TransactionsTable>
            </TransactionContainer>
        </div>
    )
}