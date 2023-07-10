import React from 'react'
import {BrowserRoutes, Routes, Route} from 'react-router-dom'

const App = () => {
    return (
        <BrowserRoutes>
            <Routes>
                <Route path='/dashbard' element={<Dashboard />} />
            </Routes>
        </BrowserRoutes>
    )
}

export default App