import { useEffect, useState } from "react"

export function HomePage() {
    const [version, setVersion] = useState("v0.0.0")
    useEffect(() => {
        (async() => {
            setVersion(await window.electron.getVersion())
        })()
    }, [])

    return <>
        <p className="bottom-[5px] left-[5px] absolute text-[#2f2f2f]">{version}</p>
    </>
}