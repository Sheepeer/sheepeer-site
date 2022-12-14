import type { AppProps } from 'next/app'
import Header from '@/components/layout/header'
import '@/styles/globals.scss'
import { ThemeProvider } from '@mui/material'
import theme from '@/theme/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
