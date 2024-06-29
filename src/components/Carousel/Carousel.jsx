import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

import { degToRad } from 'three/src/math/MathUtils.js'

import { configStages, useAppStore } from '../../store/store'
import { useThree } from '@react-three/fiber'
import { Diamond } from '../Diamond/Diamond'

// const data = ['red', 'green', 'blue']
// const data = ['red', 'green', 'blue', 'yellow']
// const data = ['red', 'green', 'blue', 'yellow', 'purple']
// const data = ['#bcedff', 'red', 'green', 'blue', 'yellow', 'purple', 'orange']
// const data = [
//     '#bcedff',
//     'white',
//     '#474747',
//     'teal',
//     'green',
//     'lime',
//     '#fff27d',
//     'yellow',
//     'orange',
//     'red',
//     'brown',
//     'pink',
//     'violet',
//     'purple',
//     'navy',
//     'blue',
//     '#419aff',
// ]

export const Carousel = ({ carouselName, data }) => {
    //
    //
    // Global state:
    const { scene } = useThree()

    const configStage = useAppStore((state) => state.configStage)
    const carouselIndex = useAppStore(
        (state) => state[carouselName].carouselIndex,
    )
    const carouselRotation = useAppStore(
        (state) => state[carouselName].carouselRotation,
    )
    const carouselPreviousIndex = useAppStore(
        (state) => state[carouselName].carouselPreviousIndex,
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

    const gemScale = 0.075

    setCarouselLength(data.length, carouselName)

    useEffect(() => {
        setChosenColor(data[carouselIndex], carouselName)

        gsap.to(carouselRef.current.rotation, {
            duration: carouselRotationSpeed,
            y: -carouselRotation * angleIncrement,
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
        // gsap.to(carouselFocusMesh.scale, {
        //     duration: carouselRotationSpeed,
        //     x: 0,
        //     y: 0,
        //     z: 0,
        //     ease: 'power1.out',
        // })
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
            // gsap.to(previouslyFocussedItem.scale, {
            //     duration: carouselRotationSpeed,
            //     x: gemScale,
            //     y: gemScale,
            //     z: gemScale,
            //     ease: 'power1.out',
            // })
            gsap.to(previouslyFocussedItem.rotation, {
                duration: carouselRotationSpeed,
                y: 0,
                x: 0,
                ease: 'power1.inOut',
            })
        }
    }, [carouselRotation])

    return (
        <group
            position={configStages[carouselName].carouselPosition}
            rotation={configStages[carouselName].carouselRotation}
        >
            <group ref={carouselRef} name={`Carousel ${carouselName}`}>
                {data.map((item, index) => {
                    const angle = index * angleIncrement + Math.PI / 2
                    const x = radius * Math.cos(angle)
                    const z = radius * Math.sin(angle)

                    return (
                        <React.Fragment key={index}>
                            {carouselName == configStages.gemColor.name && (
                                <Diamond
                                    position={[x, 0, z]}
                                    scale={[gemScale, gemScale, gemScale]}
                                    castShadow
                                    receiveShadow
                                    name={`Carousel ${carouselName} Item ${index}`}
                                    color={item}
                                />
                            )}
                            {carouselName == configStages.metal.name && (
                                <mesh
                                    position={[x, 0, z]}
                                    castShadow
                                    receiveShadow
                                    name={`Carousel ${carouselName} Item ${index}`}
                                >
                                    <sphereGeometry args={[0.065, 16, 16]} />
                                    <meshStandardMaterial
                                        color={item}
                                        transparent
                                        opacity={1}
                                    />
                                </mesh>
                            )}
                            {carouselName == configStages.ring.name && (
                                <mesh
                                    position={[x, 0, z]}
                                    castShadow
                                    receiveShadow
                                    name={`Carousel ${carouselName} Item ${index}`}
                                >
                                    <sphereGeometry args={[0.065, 16, 16]} />
                                    <meshStandardMaterial
                                        color={item}
                                        transparent
                                        opacity={1}
                                    />
                                </mesh>
                            )}
                        </React.Fragment>
                    )
                })}
            </group>
        </group>
    )
}
