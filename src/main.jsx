import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


import { ChakraProvider } from '@chakra-ui/react';
import { theme as proTheme } from '@chakra-ui/pro-theme'
import { extendTheme, theme as baseTheme, ColorModeScript } from '@chakra-ui/react'

import store from './store/configStore';

import { io } from 'socket.io-client';
import * as socket from './socket';
import { Provider } from 'react-redux';

export const theme = extendTheme(
  {
    colors: { ...baseTheme.colors, brand: baseTheme.colors.messenger },
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  proTheme
)

socket.setupTheSocket(io, `https://dv-sql.pymnts.com:443`, store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </Provider>,
)
