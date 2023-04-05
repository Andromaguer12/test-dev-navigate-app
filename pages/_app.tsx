import React from 'react'
import CommonLayout from '../components/Layout/Common'
import '../styling/global.css'
import { ThemeProvider } from '@emotion/react'
import theme from '../styling/theme'
import { Provider } from 'react-redux'
import store from '../services/redux/store'

export default function MyApp({ Component, pageProps }) {

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CommonLayout>
              <Component {...pageProps} />
        </CommonLayout>
      </Provider>
    </ThemeProvider>
  )
}
