import { useEffect, useState } from 'react'
import "./Types.ts"

function App() {
  const [version, setVersion] = useState("v0.0.0")
  useEffect(() => {
    setVersion(window.electron.getVersion())
  }, [])

  return (
    <p>{version}</p>
  )
}

export default App
