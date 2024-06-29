import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { Diamond } from '../Diamond/Diamond'
import { degToRad } from 'three/src/math/MathUtils.js'
import { useAppStore } from '../../store/store'

export const WavyRing = ({ ringRef }) => {
    const { nodes } = useGLTF('/WavyRing.glb')

    const configStage = useAppStore((state) => state.configStage)
    const chosenGemColor = useAppStore((state) => state.gemColor.chosenItem)
    const chosenMetalColor = useAppStore((state) => state.metal.chosenItem)

    const material = nodes.WavyRing.material
    material.color = new THREE.Color(chosenMetalColor?.value)

    return (
        <group ref={ringRef} name="WavyRing">
            <Diamond
                position={[0, 0.49, 0]}
                scale={[0.2, 0.2, 0.2]}
                color={chosenGemColor?.value}
            />
            <Diamond
                position={[-0.275, 0.425, 0]}
                rotation={[0, 0, degToRad(25)]}
                scale={[0.125, 0.125, 0.125]}
                color={chosenGemColor?.value}
            />
            <Diamond
                position={[0.275, 0.425, 0]}
                rotation={[0, 0, degToRad(-25)]}
                scale={[0.125, 0.125, 0.125]}
                color={chosenGemColor?.value}
            />
            <mesh
                geometry={nodes.WavyRing.geometry}
                material={material}
                castShadow
            ></mesh>
        </group>
    )
}
