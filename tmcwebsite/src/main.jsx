import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import AppV2 from './v2/AppV2.jsx'
import AppV3 from './v3/AppV3.jsx'
import AppV4 from './v4/AppV4.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Night Garden is the main landing page now; Classic moved to /v3. */}
        <Route path="/" element={<AppV3 />} />
        <Route path="/v2" element={<AppV2 />} />
        <Route path="/v3" element={<App />} />
        <Route path="/v4" element={<AppV4 />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
