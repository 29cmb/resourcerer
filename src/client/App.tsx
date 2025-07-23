import { useEffect, useState } from 'react'
import "./Types.ts"
import { HomePage } from './pages/HomePage.tsx'
import type { ProjectData } from './Types.ts'
import { ProjectPage } from './pages/ProjectPage.tsx'
import './styles/globals.css'

function App() {
  const [page, setPage] = useState<string>("home")
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null)
  const [isDirty, setDirty] = useState<boolean>(false)

  useEffect(() => {
    window.electron.onProjectLoad((data) => {
      if(isDirty) {
        // TODO: Create a save prompt
      }

      console.log(`Set active data: ${data}`)
      setActiveProject(data)
      setPage("project")
    })
  }, [])

  switch(page) {
    case "home":
      return <HomePage/>
    case "project":
      return <ProjectPage activeProject={activeProject as ProjectData} />
  }
}

export default App
