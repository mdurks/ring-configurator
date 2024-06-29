import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { Diamond } from '../Diamond/Diamond'
import { useAppStore } from '../../store/store'

export const WavyRing = ({ ringRef }) => {
    const chosenGemColor = useAppStore((state) => state.gemColor.chosenItem)
    const chosenMetalColor = useAppStore((state) => state.metal.chosenItem)

    const { nodes } = useGLTF('/WavyRing.glb')
    // const { nodes } = useGLTF('/FlowerRing.glb')

    const material = nodes.WavyRing.material
    // const material = nodes.Flower_ring.material
    material.color = new THREE.Color(chosenMetalColor?.value)

    const markerGemNodes = Object.entries(nodes)
        .filter(([key, value]) => value.name.includes('MarkerGem'))
        .map(([key, value]) => value)

    return (
        <group ref={ringRef} name="WavyRing">
            {markerGemNodes.map((marker) => (
                <Diamond
                    key={marker.uuid}
                    position={marker.position}
                    rotation={marker.rotation}
                    scale={marker.scale}
                    color={chosenGemColor?.value}
                />
            ))}
            <mesh
                geometry={nodes.WavyRing.geometry}
                // geometry={nodes.Flower_ring.geometry}
                material={material}
                castShadow
            ></mesh>
        </group>
    )
}
