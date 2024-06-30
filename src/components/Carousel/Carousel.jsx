import React, { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import gsap from 'gsap'

import { degToRad } from 'three/src/math/MathUtils.js'
import { adjustLightnessFromHSL } from '../../utilities/adjustLightnessFromHSL'

import { configStages, useAppStore } from '../../store/store'

import { Diamond } from '../Diamond/Diamond'
import { CarouselRing } from '../CarouselRing/CarouselRing'

export const Carousel = ({
    carouselName,
    data,
    radius,
    rotationSpeed = 0.5,
}) => {
    //
    //
    // Global state:
    const { scene } = useThree()

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
    const setChosenItem = useAppStore((state) => state.setChosenItem)

    //
    //
    // Local init:

    setCarouselLength(data.length, carouselName)

    const carouselRef = useRef()

    const angleIncrement = (2 * Math.PI) / data.length

    let meshScale = 1
    if (carouselName == configStages.gemColor.name) meshScale = 0.075
    if (carouselName == configStages.ring.name) meshScale = 0.2

    //
    //
    // Local functions:

    useEffect(() => {
        setChosenItem(data[carouselIndex], carouselName)

        gsap.to(carouselRef.current.rotation, {
            duration: rotationSpeed,
            y: -carouselRotation * angleIncrement,
            ease: 'power1.inOut',
        })

        const carouselFocusMesh = scene.getObjectByName(
            `Carousel ${carouselName} Item ${carouselIndex}`,
        )

        gsap.to(carouselFocusMesh.position, {
            duration: rotationSpeed,
            y: carouselFocusMesh.position.y + 0.25,
            ease: 'power1.inOut',
        })
        gsap.to(carouselFocusMesh.scale, {
            duration: rotationSpeed,
            x: 0,
            y: 0,
            z: 0,
            ease: 'power1.out',
        })
        gsap.to(carouselFocusMesh.rotation, {
            duration: rotationSpeed,
            y: degToRad(135),
            x: degToRad(180),
            ease: 'power1.inOut',
        })

        const previouslyFocussedItem = scene.getObjectByName(
            `Carousel ${carouselName} Item ${carouselPreviousIndex}`,
        )

        if (previouslyFocussedItem) {
            gsap.to(previouslyFocussedItem.position, {
                duration: rotationSpeed,
                y: 0,
                ease: 'power1.inOut',
            })
            gsap.to(previouslyFocussedItem.scale, {
                duration: rotationSpeed,
                x: meshScale,
                y: meshScale,
                z: meshScale,
                ease: 'power1.out',
            })
            gsap.to(previouslyFocussedItem.rotation, {
                duration: rotationSpeed,
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
                                    name={`Carousel ${carouselName} Item ${index}`}
                                    position={[x, 0, z]}
                                    scale={[meshScale, meshScale, meshScale]}
                                    castShadow
                                    receiveShadow
                                    color={item.value}
                                />
                            )}
                            {carouselName == configStages.ring.name && (
                                <CarouselRing
                                    name={`Carousel ${carouselName} Item ${index}`}
                                    modelPath={item.value}
                                    meshName={item.meshName}
                                    position={[x, 0, z]}
                                    carouselRingScale={meshScale}
                                />
                            )}
                            {carouselName == configStages.metal.name && (
                                <mesh
                                    name={`Carousel ${carouselName} Item ${index}`}
                                    position={[x, 0, z]}
                                    castShadow
                                    receiveShadow
                                >
                                    <sphereGeometry args={[0.065, 16, 16]} />
                                    <meshStandardMaterial
                                        color={adjustLightnessFromHSL(
                                            item.value,
                                            -30,
                                        )}
                                        transparent
                                        opacity={1}
                                        envMapIntensity={0.1}
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
