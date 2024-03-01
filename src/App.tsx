import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from './styles/gobals'
import { Transections } from "./Pages/Transections";
import { TransactionsProvider } from "./constexts/TransactionsContext";


export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle/>

      <TransactionsProvider>
        <Transections/>
      </TransactionsProvider>
      
    </ThemeProvider>
  )
}