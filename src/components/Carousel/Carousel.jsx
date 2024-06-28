import { useEffect, useRef } from 'react'
import gsap from 'gsap'

import { degToRad } from 'three/src/math/MathUtils.js'

import { gazeboYRotationReadyValue, useAppStore } from '../../store/store'
import { useThree } from '@react-three/fiber'
import { Diamond } from '../Diamond/Diamond'

// const data = ['red', 'green', 'blue']
// const data = ['red', 'green', 'blue', 'yellow']
// const data = ['red', 'green', 'blue', 'yellow', 'purple']
// const data = ['#bcedff', 'red', 'green', 'blue', 'yellow', 'purple', 'orange']
const data = [
    '#bcedff',
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

export const Carousel = ({ carouselName }) => {
    //
    //
    // Global state:
    const { scene } = useThree()
    const carouselIndex = useAppStore((state) => state.carouselIndex)
    const carouselRotation = useAppStore((state) => state.carouselRotation)
    const carouselPreviousIndex = useAppStore(
        (state) => state.carouselPreviousIndex,
    )

    //
    //
    // Global functions:
    const setCarouselLength = useAppStore((state) => state.setCarouselLength)
    const setChosenColor = useAppStore((state) => state.setChosenColor)

    //
    //
    // Local init:
    const carouselRef = useRef()

    const radius = 0.6
    const angleIncrement = (2 * Math.PI) / data.length
    const carouselRotationSpeed = 0.5

    const gemScale = 0.1

    setCarouselLength(data.length)

    useEffect(() => {
        setChosenColor(data[carouselIndex])

        gsap.to(carouselRef.current.rotation, {
            duration: carouselRotationSpeed,
            y: -carouselRotation * angleIncrement - gazeboYRotationReadyValue,
            ease: 'power1.inOut',
        })

        const carouselFocusMesh = scene.getObjectByName(
            `Carousel ${carouselName} Item ${carouselIndex}`,
        )

        gsap.to(carouselFocusMesh.position, {
            duration: carouselRotationSpeed,
            y: carouselFocusMesh.position.y + 0.25,
            ease: 'power1.inOut',
        })
        gsap.to(carouselFocusMesh.scale, {
            duration: carouselRotationSpeed,
            x: 0,
            y: 0,
            z: 0,
            ease: 'power1.out',
        })
        gsap.to(carouselFocusMesh.rotation, {
            duration: carouselRotationSpeed,
            y: degToRad(135),
            x: degToRad(180),
            ease: 'power1.inOut',
        })

        const previouslyFocussedItem = scene.getObjectByName(
            `Carousel ${carouselName} Item ${carouselPreviousIndex}`,
        )

        if (previouslyFocussedItem) {
            gsap.to(previouslyFocussedItem.position, {
                duration: carouselRotationSpeed,
                y: 0,
                ease: 'power1.inOut',
            })
            gsap.to(previouslyFocussedItem.scale, {
                duration: carouselRotationSpeed,
                x: gemScale,
                y: gemScale,
                z: gemScale,
                ease: 'power1.out',
            })
            gsap.to(previouslyFocussedItem.rotation, {
                duration: carouselRotationSpeed,
                y: 0,
                x: 0,
                ease: 'power1.inOut',
            })
        }
    }, [carouselRotation])

    return (
        <>
            <group
                ref={carouselRef}
                name={`Carousel ${carouselName}`}
                position={[-0.95, 1.45, 0.95]}
                rotation={[0, -gazeboYRotationReadyValue, 0]}
            >
                {data.map((item, index) => {
                    const angle = index * angleIncrement + Math.PI / 2
                    const x = radius * Math.cos(angle)
                    const z = radius * Math.sin(angle)

                    return (
                        // <mesh
                        //     key={index}
                        //     position={[x, 0, z]}
                        //     castShadow
                        //     receiveShadow
                        //     name={`Carousel ${carouselName} Item ${index}`}
                        // >
                        //     <icosahedronGeometry args={[0.08, 0]} />
                        //     <meshStandardMaterial
                        //         color={item}
                        //         transparent
                        //         opacity={1}
                        //     />
                        // </mesh>
                        <Diamond
                            key={index}
                            position={[x, 0, z]}
                            scale={[gemScale, gemScale, gemScale]}
                            castShadow
                            receiveShadow
                            name={`Carousel ${carouselName} Item ${index}`}
                            color={item}
                        />
                    )
                })}
            </group>
        </>
    )
}
