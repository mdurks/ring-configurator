import {
    AccumulativeShadows,
    Environment,
    RandomizedLight,
    SoftShadows,
} from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useControls } from 'leva'

export const EnvironmentSetup = () => {
    // const bloomConfig = useControls({
    //     luminanceThreshold: { value: 0.25, min: 0, max: 4, step: 0.1 },
    //     intensity: { value: 0.3, min: 0, max: 4, step: 0.1 },
    //     levels: { value: 2, min: 0, max: 20, step: 0.1 },
    // })

    return (
        <>
            <color attach="background" args={['#e9e7cf']} />
            {/* <color attach="background" args={['#2e2d1f']} /> */}

            {/* <SoftShadows size={60} samples={20} /> */}

            <ambientLight intensity={0.5} />

            <Environment preset="studio" environmentIntensity={1} />

            <directionalLight
                castShadow
                position={[2.5, 5, 5]}
                intensity={8}
                shadow-mapSize={[1024, 1024]}
            >
                <orthographicCamera
                    attach="shadow-camera"
                    args={[-5, 5, 5, -5, 1, 50]}
                />
            </directionalLight>

            {/* <AccumulativeShadows
                temporal
                frames={100}
                color="#000000"
                colorBlend={2}
                toneMapped={true}
                alphaTest={0.7}
                opacity={0.75}
                scale={12}
                position={[0, 0, 0]}
            >
                <RandomizedLight
                    amount={8}
                    radius={10}
                    ambient={0.5}
                    position={[5, 5, -10]}
                    bias={0.001}
                />
            </AccumulativeShadows> */}

            {/* <EffectComposer>
                <Bloom
                    luminanceThreshold={4}
                    intensity={0.2}
                    levels={10}
                    mipmapBlur
                />
            </EffectComposer> */}
        </>
    )
}
