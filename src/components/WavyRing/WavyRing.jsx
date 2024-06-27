import { useGLTF } from '@react-three/drei'
import { Diamond } from '../Diamond/Diamond'
import { degToRad } from 'three/src/math/MathUtils.js'

export const WavyRing = ({ ringRef }) => {
    const { nodes } = useGLTF('/WavyRing.glb')

    return (
        <group ref={ringRef}>
            <Diamond position={[0, 0.49, 0]} scale={[0.2, 0.2, 0.2]} />
            <Diamond
                position={[-0.275, 0.425, 0]}
                rotation={[0, 0, degToRad(25)]}
                scale={[0.125, 0.125, 0.125]}
            />
            <Diamond
                position={[0.275, 0.425, 0]}
                rotation={[0, 0, degToRad(-25)]}
                scale={[0.125, 0.125, 0.125]}
            />
            <mesh
                geometry={nodes.WavyRing.geometry}
                material={nodes.WavyRing.material}
                castShadow
            ></mesh>
        </group>
    )
}
