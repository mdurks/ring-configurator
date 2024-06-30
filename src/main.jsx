import React from 'react'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { Leva } from 'leva'

import App from './App.jsx'
import './index.css'

import { ScrollControlsHOC } from './components/ScrollControlsHOC/ScrollControlsHOC.jsx'
import { HtmlUIContainer } from './components/HtmlUI/HtmlUIContainer/HtmlUIContainer.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Leva collapsed={false} />

        <HtmlUIContainer />

        <Canvas
            className="r3fCanvas"
            camera={
                {
                    // fov: settings.camera.fov,
                    // position: isDesktop
                    //     ? [...settings.camera.introPos]
                    //     : [...settings.camera.introPosMobile],
                }
            }
            shadows={true}
        >
            <ScrollControlsHOC>
                <App />
            </ScrollControlsHOC>
        </Canvas>
    </React.StrictMode>,
)
