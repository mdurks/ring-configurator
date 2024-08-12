import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { XR, InteractionManager } from '@react-three/xr'

import App from './App.jsx'

import { ScrollControlsHOC } from './components/ScrollControlsHOC/ScrollControlsHOC.jsx'
import { OutOfCanvasElements } from './components/OutOfCanvasElements/OutOfCanvasElements.jsx'
import { MuteAudioBtn } from './components/MuteAudioBtn/MuteAudioBtn.jsx'
import { AppLoader } from './components/AppLoader/AppLoader.jsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <MuteAudioBtn />
        <OutOfCanvasElements />
        <AppLoader />
        <Canvas
            className="r3fCanvas"
            camera={{
                fov: 75,
                // position: isDesktop
                //     ? [...settings.camera.introPos]
                //     : [...settings.camera.introPosMobile],
            }}
            // shadows={true}
        >
            <Suspense>
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
            </Suspense>
        </Canvas>
        <div className="skyGradient"></div>
    </React.StrictMode>,
)
