import { useNavigate } from "react-router-dom"

export default function Home() {
    const navigate = useNavigate()

    return <div className="flex items-center justify-center m-auto h-screen w-screen">
        <div className="flex justify-center items-center flex-col m-auto w-140 h-100">
            <button className="text-4xl font-bold bg-green-500 py-5 px-10 rounded-2xl border-4 border-black hover:scale-105 transition-all ease active:scale-95" onClick={async () => {
                const project = await window.electron.open_project()
                if(project.canceled) return

                navigate(`/project/${encodeURIComponent(project.filePaths[0])}`)
            }}>Open Project</button>
        </div>
    </div>
}