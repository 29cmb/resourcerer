import { useEffect, useState } from 'react'
import './styles/App.css'
import "./Types.ts"

function App() {
  const [version, setVersion] = useState("v0.0.0")
  useEffect(() => {
    setVersion(window.electron.getVersion())
  }, [])

  return <>
    <h1>Hi the version is as follows</h1>
    <p>{version}</p>
  </>
}

export default App
