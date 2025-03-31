import { useState } from 'react'
import ChatComponent from './ChatComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     {/* <h1 className='text-red-500'>HII</h1> */}
     <ChatComponent/>
    </>
  )
}

export default App
