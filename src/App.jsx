import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LandingPage from './screens/demoScreen/LandingPage'
import DemoLandingPage from './screens/demoScreen/DemoLandingPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <LandingPage /> */}
      <DemoLandingPage />
    </>
  )
}

export default App
