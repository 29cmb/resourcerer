import { createRoot } from 'react-dom/client';
import "./globals.css"
import Editor from './pages/Editor';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <HashRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/project/:path" element={<Editor/>}/>
        </Routes>
    </HashRouter>
);