/* eslint-disable react/no-unknown-property */
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function App() {
    return (
        <>
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
                <OrbitControls makeDefault dampingFactor={0.1} />

                <ambientLight intensity={0.5} />
                <directionalLight
                    castShadow
                    position={[2.5, 5, 5]}
                    intensity={1.5}
                    shadow-mapSize={[1024, 1024]}
                >
                    <orthographicCamera
                        attach="shadow-camera"
                        args={[-5, 5, 5, -5, 1, 50]}
                    />
                </directionalLight>

                <mesh>
                    <boxGeometry />
                    <meshStandardMaterial />
                </mesh>
            </Canvas>
        </>
    )
}

export default App
