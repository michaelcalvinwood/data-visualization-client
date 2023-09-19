import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { changeCounterValue } from './store/sliceCounter';
import { Box } from '@chakra-ui/react';

import { Input } from '@chakra-ui/react'

function App() {
  const counter = useSelector(state => state.counter)

  const dispatch = useDispatch();

  return (
    <>
      <Box>
        <div onClick={() =>{    
          dispatch(changeCounterValue({amount: 1}))
        }}>+</div>
        count: {counter}
      </Box>
    </>
  )
}

export default App
