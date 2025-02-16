
import { useState } from 'react'
import './App.css'
import Board from './components/Board'

function App() {
  const [currentBoard, setCurrentBoard] = useState(1)

  return (
    <>
      <Board currentBoard={currentBoard}></Board>
    </>
  )
}

export default App
