import { Footer } from '@/Components/user/layout/Footer'
import  Header  from '@/Components/user/layout/Header'
import store from '@/store';
import '@/styles/globals.css'
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Container from '@mui/material/Container';

export default function App({ Component, pageProps }) {
  if(Component.getLayout){
    return(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Provider  store={store}>
      <SnackbarProvider>
      {Component.getLayout(<Component {...pageProps} />)}
      </SnackbarProvider>
      </Provider>
      </LocalizationProvider>

    )
  }
  return (
    <>
     <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Provider store={store}>
    <SnackbarProvider>
    <Container maxWidth="xl">
    <Header/>
  <Component {...pageProps} />
  </Container>
  <Footer/>

    </SnackbarProvider>
    </Provider>
    </LocalizationProvider>
  </>
  )
}
