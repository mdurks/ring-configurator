import { useEffect, useRef } from 'react'
import gsap from 'gsap'

import { degToRad } from 'three/src/math/MathUtils.js'

import { gazeboYRotationReadyValue, useAppStore } from '../../store/store'

export const Carousel = () => {
    //
    //
    // Global state:
    const configCarouselIndex = useAppStore(
        (state) => state.configCarouselIndex,
    )

    //
    //
    // Local init:
    const carouselRef = useRef()

    // const data = ['red', 'green', 'blue']
    // const data = ['red', 'green', 'blue', 'yellow']
    // const data = ['red', 'green', 'blue', 'yellow', 'purple']
    const data = [
        'red',
        'green',
        'blue',
        'yellow',
        'purple',
        'orange',
        'brown',
        'gold',
        'olive',
        'pink',
        'navy',
        'teal',
    ]
    const radius = 1.25
    const angleIncrement = (2 * Math.PI) / data.length

    useEffect(() => {
        gsap.to(carouselRef.current.rotation, {
            duration: 0.5,
            y:
                -configCarouselIndex * angleIncrement -
                gazeboYRotationReadyValue,
            ease: 'power1.inOut',
        })
    }, [configCarouselIndex])

    return (
        <>
            <group
                ref={carouselRef}
                position={[0, 1.65, 0]}
                rotation={[0, -gazeboYRotationReadyValue, 0]}
            >
                {data.map((item, index) => {
                    const angle = index * angleIncrement + Math.PI / 2
                    const x = radius * Math.cos(angle)
                    const z = radius * Math.sin(angle)

                    return (
                        <mesh
                            key={index}
                            position={[x, 0, z]}
                            castShadow
                            receiveShadow
                        >
                            <icosahedronGeometry args={[0.25, 0]} />
                            <meshStandardMaterial color={item} />
                        </mesh>
                    )
                })}
            </group>
        </>
    )
}
