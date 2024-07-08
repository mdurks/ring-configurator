import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useXR } from '@react-three/xr'

import { degToRad } from 'three/src/math/MathUtils.js'

import { useAppStore } from '../../store/store'

import { Diamond } from '../Diamond/Diamond'

export const PrimaryRing = ({ ringRef, name }) => {
    const { camera } = useThree()
    const { isPresenting } = useXR()

    const chosenGemColor = useAppStore((state) => state.gemColor.chosenItem)
    const chosenMetalColor = useAppStore((state) => state.metal.chosenItem)
    const chosenRing = useAppStore((state) => state.ring.chosenItem)

    const arRef = useRef()
    const { nodes } = useGLTF(chosenRing.value)

    const material = nodes[chosenRing.meshName].material
    material.color = new THREE.Color(chosenMetalColor?.value)
    material.environmentIntensity = 0.1

    const markerGemNodes = Object.entries(nodes)
        .filter(([key, value]) => value.name.includes('MarkerGem'))
        .map(([key, value]) => value)

    useFrame(() => {
        if (ringRef.current && isPresenting) {
            ringRef.current.position.setFromMatrixPosition(camera.matrixWorld)
            ringRef.current.quaternion.setFromRotationMatrix(camera.matrixWorld)
            ringRef.current.translateZ(-1)
            ringRef.current.translateX(-0.05)
        }
    })

    useEffect(() => {
        if (isPresenting)
            arRef.current.rotation.set(degToRad(77), degToRad(-5), degToRad(4))
        else arRef.current.rotation.x = 0
    }, [isPresenting])

    return (
        <group ref={ringRef} name={name}>
            <group ref={arRef}>
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
                >
                    {/* <meshPhysicalMaterial
                    roughness={0}
                    metalness={1}
                    clearcoat={0.5}
                    clearcoatRoughness={0.5}
                    color={chosenMetalColor?.value}
                    /> */}
                </mesh>
            </group>
        </group>
    )
}
