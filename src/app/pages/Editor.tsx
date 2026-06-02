import { useParams } from "react-router-dom"

export default function Editor() {
    const { path } = useParams()
    return <>
        <h1>{path}</h1>
    </>
}