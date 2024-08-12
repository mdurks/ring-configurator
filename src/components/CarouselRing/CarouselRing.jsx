import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

import { configStages, useAppStore } from '../../store/store'

import { Diamond } from '../Diamond/Diamond'

export const CarouselRing = ({
    name,
    modelPath,
    meshName,
    position,
    rotation,
    carouselRingScale,
    preventGemRotation = false,
}) => {
    const configStage = useAppStore((state) => state.configStage)
    const chosenGemColor = useAppStore((state) => state.gemColor.chosenItem)
    const chosenMetalColor = useAppStore((state) => state.metal.chosenItem)
    const hasAppLoaded = useAppStore((state) => state.hasAppLoaded)

    const { nodes } = useGLTF(modelPath)

    const groupRef = useRef()

    const material = nodes[meshName].material
    material.color = new THREE.Color(chosenMetalColor?.value)

    const markerGemNodes = Object.entries(nodes)
        .filter(([key, value]) => value.name.includes('MarkerGem'))
        .map(([key, value]) => value)

    useFrame(() => {
        if (configStage == configStages.ring.name && hasAppLoaded)
            groupRef.current.rotation.y -= 0.001
    })

    return (
        <group
            ref={groupRef}
            name={name}
            scale={[carouselRingScale, carouselRingScale, carouselRingScale]}
            position={position}
            rotation={rotation}
        >
            {markerGemNodes.map((marker) => (
                <Diamond
                    key={marker.uuid}
                    name={preventGemRotation ? 'Gem' : 'Carousel Gem'}
                    position={marker.position}
                    rotation={marker.rotation}
                    scale={marker.scale}
                    color={chosenGemColor?.value}
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
