import { DiamondExperiments } from './DiamondExperiments'

export const MiscExperiments = () => {
    return (
        <>
            <DiamondExperiments />

            {/* Defining a Scrollcontrols here and using the Scroll component for individual items: */}
            {/* <ScrollControls pages={2} damping={0.2}>
                <Scroll>
                    <mesh receiveShadow castShadow>
                        <sphereGeometry />
                        <meshStandardMaterial />
                    </mesh>
                </Scroll>
            </ScrollControls> */}

            {/* A plane for a ShadowMaterial: */}
            {/* <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <shadowMaterial transparent opacity={0.4} />
            </mesh> */}

            {/* A large plane for simply catching shadows: */}
            {/* <mesh
                position={[0, -0.01, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                // receiveShadow
            >
                <planeGeometry args={[100, 100]} />
                <meshPhysicalMaterial color={'#fffde3'} />
            </mesh> */}
        </>
    )
}
