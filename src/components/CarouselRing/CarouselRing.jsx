import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

import { useAppStore } from '../../store/store'

import { Diamond } from '../Diamond/Diamond'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export const CarouselRing = ({
    name,
    modelPath,
    meshName,
    position,
    carouselRingScale,
}) => {
    const chosenGemColor = useAppStore((state) => state.gemColor.chosenItem)
    const chosenMetalColor = useAppStore((state) => state.metal.chosenItem)

    const { nodes } = useGLTF(modelPath)

    const groupRef = useRef()

    const material = nodes[meshName].material
    material.color = new THREE.Color(chosenMetalColor?.value)

    const markerGemNodes = Object.entries(nodes)
        .filter(([key, value]) => value.name.includes('MarkerGem'))
        .map(([key, value]) => value)

    useFrame(() => {
        groupRef.current.rotation.y -= 0.001
    })

    return (
        <group
            ref={groupRef}
            name={name}
            scale={[carouselRingScale, carouselRingScale, carouselRingScale]}
            position={position}
        >
            {markerGemNodes.map((marker) => (
                <Diamond
                    key={marker.uuid}
                    position={marker.position}
                    rotation={marker.rotation}
                    scale={marker.scale}
                    color={chosenGemColor?.value}
                    name={'Gem'}
                />
            ))}
            <mesh
                geometry={nodes[meshName].geometry}
                material={material}
                castShadow
            ></mesh>
        </group>
    )
}
