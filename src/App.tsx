import { useState } from 'react'
import Layout from './layouts/Layout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Layout/>
    </>
  )
}

export default App
