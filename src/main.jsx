import { theme as proTheme } from '@chakra-ui/pro-theme';
import {
  ChakraProvider,
  theme as baseTheme,
  extendTheme
} from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import App from './App.jsx';
import './index.css';
import store from './store/configStore';
import * as socket from './utils/socket';

export const theme = extendTheme(
  {
    colors: {
      ...baseTheme.colors,
      brand: baseTheme.colors.messenger
    },
    initialColorMode: 'light',
    useSystemColorMode: false
  },
  proTheme
);

socket.setupTheSocket(io, `https://dv-sql.pymnts.com:443`, store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </Provider>
);
