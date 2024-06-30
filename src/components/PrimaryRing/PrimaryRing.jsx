import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

import { useAppStore } from '../../store/store'

import { Diamond } from '../Diamond/Diamond'

export const PrimaryRing = ({ ringRef, name }) => {
    const chosenGemColor = useAppStore((state) => state.gemColor.chosenItem)
    const chosenMetalColor = useAppStore((state) => state.metal.chosenItem)
    const chosenRing = useAppStore((state) => state.ring.chosenItem)

    const { nodes } = useGLTF(chosenRing.value)

    const material = nodes[chosenRing.meshName].material
    material.color = new THREE.Color(chosenMetalColor?.value)

    const markerGemNodes = Object.entries(nodes)
        .filter(([key, value]) => value.name.includes('MarkerGem'))
        .map(([key, value]) => value)

    return (
        <group ref={ringRef} name={name}>
            {markerGemNodes.map((marker) => (
                <Diamond
                    key={marker.uuid}
                    position={marker.position}
                    rotation={marker.rotation}
                    scale={marker.scale}
                    color={chosenGemColor?.value}
                    name={'Ring diamond gem'}
                />
            ))}
            <mesh
                geometry={nodes[chosenRing.meshName].geometry}
                material={material}
                castShadow
            ></mesh>
        </group>
    )
}
