import { useGLTF } from '@react-three/drei'
import { Diamond } from '../Diamond/Diamond'
import { degToRad } from 'three/src/math/MathUtils.js'
import { useAppStore } from '../../store/store'

export const WavyRing = ({ ringRef }) => {
    const { nodes } = useGLTF('/WavyRing.glb')

    const chosenColor = useAppStore((state) => state.chosenColor)

    return (
        <group ref={ringRef} name="WavyRing">
            <Diamond
                position={[0, 0.49, 0]}
                scale={[0.2, 0.2, 0.2]}
                color={chosenColor}
            />
            <Diamond
                position={[-0.275, 0.425, 0]}
                rotation={[0, 0, degToRad(25)]}
                scale={[0.125, 0.125, 0.125]}
                color={chosenColor}
            />
            <Diamond
                position={[0.275, 0.425, 0]}
                rotation={[0, 0, degToRad(-25)]}
                scale={[0.125, 0.125, 0.125]}
                color={chosenColor}
            />
            <mesh
                geometry={nodes.WavyRing.geometry}
                material={nodes.WavyRing.material}
                castShadow
            ></mesh>
        </group>
    )
}
