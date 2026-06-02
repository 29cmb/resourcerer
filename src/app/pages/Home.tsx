import { useNavigate } from "react-router-dom"
import file from "../assets/images/document.png"

export default function Home() {
    const navigate = useNavigate()

    return <div className="flex items-center justify-center m-auto h-screen w-screen">
        <div className="flex border-2 p-5 flex-col m-auto w-140 h-100 bg-[#0f0f0f] gap-2">
            {/* <button className="text-4xl font-bold py-5 px-10 rounded-2xl border-4 border-black hover:scale-105 transition-all ease active:scale-95" onClick={async () => {
                const project = await window.electron.open_project()
                if(project.canceled) return

                navigate(`/project/${encodeURIComponent(project.filePaths[0])}`)
            }}>Open Project</button> */}
            <p className="font-bold text-[60px]">Resourcerer</p>
            {/* <button className="flex flex-row gap-2">
                <img className="w-7" style={{
                    filter:  "brightness(0) saturate(100%) invert(44%) sepia(98%) saturate(3107%) hue-rotate(188deg) brightness(103%) contrast(103%)",
                }} src={file}/>
                <p className="text-[18px] text-[#008cff]">Open Project</p>
            </button> */}
            <ImageButton image={file} text={"New Project"} callback={async () => {
                // TODO
            }}/>
            <ImageButton image={file} text={"Open Project"} callback={async () => {
                const project = await window.electron.open_project()
                if(project.canceled) return

                navigate(`/project/${encodeURIComponent(project.filePaths[0])}`)
            }}/>
        </div>
    </div>
}

function ImageButton({ image, text, callback }: { image: string, text: string, callback: () => void }) {
    return <button className="flex flex-row gap-2 cursor-pointer" onClick={callback}>
        <img className="w-7" style={{
            filter: "brightness(0) saturate(100%) invert(54%) sepia(97%) saturate(2877%) hue-rotate(181deg) brightness(103%) contrast(103%)",
        }} src={image}/>
        <p className="text-[18px] text-[#00a2ff]">{text}</p>
    </button>
}