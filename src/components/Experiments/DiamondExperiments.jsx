import { degToRad } from 'three/src/math/MathUtils.js'
import { Diamond } from '../Diamond/Diamond'

export const DiamondExperiments = () => {
    return (
        <>
            {/* <Diamond position={[0, 0.42, 0]} /> */}
            {/* <Diamond position={[0, 0.825, 0]} /> */}
            <group>
                <Diamond position={[1.5, 0.825, 0]} scale={0.5} />
                <Diamond position={[-1.5, 0.825, 0]} scale={0.5} />
            </group>
            <group rotation={[0, degToRad(90), 0]}>
                <Diamond position={[1.5, 0.825, 0]} scale={0.5} />
                <Diamond position={[-1.5, 0.825, 0]} scale={0.5} />
            </group>

            <group rotation={[0, degToRad(45), 0]}>
                <Diamond position={[1.5, 0.825, 0]} scale={0.5} />
                <Diamond position={[-1.5, 0.825, 0]} scale={0.5} />
            </group>
            <group rotation={[0, degToRad(-45), 0]}>
                <Diamond position={[1.5, 0.825, 0]} scale={0.5} />
                <Diamond position={[-1.5, 0.825, 0]} scale={0.5} />
            </group>
        </>
    )
}
