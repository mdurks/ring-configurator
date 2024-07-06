import React from 'react'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { XR, InteractionManager } from '@react-three/xr'

import App from './App.jsx'
import './index.css'

import { ScrollControlsHOC } from './components/ScrollControlsHOC/ScrollControlsHOC.jsx'
import { OutOfCanvasElements } from './components/OutOfCanvasElements/OutOfCanvasElements.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <OutOfCanvasElements />
        <Canvas
            className="r3fCanvas"
            camera={{
                fov: 75,
                // position: isDesktop
                //     ? [...settings.camera.introPos]
                //     : [...settings.camera.introPosMobile],
            }}
            shadows={true}
        >
            <XR
                // onSessionStart={() => (window.myARStarted = true)}
                // onSessionEnd={() => (window.myARStarted = false)}
                frameRate={72}
            >
                <InteractionManager>
                    <ScrollControlsHOC>
                        <App />
                    </ScrollControlsHOC>
                </InteractionManager>
            </XR>
        </Canvas>
    </React.StrictMode>,
)
