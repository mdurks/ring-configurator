import React from 'react'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'

import App from './App.jsx'
import './index.css'
import { Scroll, ScrollControls } from '@react-three/drei'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <div className="introTitle1">IntroTitle_1</div>
        <div className="introTitle2">IntroTitle_2</div>
        <div className="introTitle3">IntroTitle_3</div>

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
            <ScrollControls pages={2} damping={0.2}>
                <App />
            </ScrollControls>
        </Canvas>
    </React.StrictMode>,
)
