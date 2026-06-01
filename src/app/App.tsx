import { createRoot } from 'react-dom/client';
import "./globals.css"
import Editor from './pages/Editor';

const root = createRoot(document.body);
root.render(<Editor/>);