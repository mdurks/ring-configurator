import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useThree } from '@react-three/fiber'
import gsap from 'gsap'

import { degToRad } from 'three/src/math/MathUtils.js'
import { adjustLightnessFromHSL } from '../../utilities/adjustLightnessFromHSL'
import { generateRandomPositions } from '../../utilities/generateRandomPositions'
import { randomNumberWithinRange } from '../../utilities/randomNumberWithinRange'

import { configStages, storeActions, useAppStore } from '../../store/store'

import { Diamond } from '../Diamond/Diamond'
import { CarouselRing } from '../CarouselRing/CarouselRing'

export const Carousel = ({
    carouselName,
    data,
    radius,
    rotationSpeed = 0.5,
    meshScale = 1,
}) => {
    //
    //
    // Global state:
    const { scene } = useThree()

    const configStage = useAppStore((state) => state.configStage)
    const configStagePrevious = useAppStore(
        (state) => state.configStagePrevious,
    )
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
    // Local state:
    const [itemMeshes, setItemMeshes] = useState()

    //
    //
    // Local init:
    storeActions.setCarouselLength(data.length, carouselName)

    const carouselRef = useRef()

    const itemNames = Array.from(
        { length: data.length },
        (_, index) => `Carousel ${carouselName} Item ${index}`,
    )

    const angleIncrement = (2 * Math.PI) / data.length

    const carouselPositions = useMemo(() => {
        const positions = []
        for (let i = 0; i < data.length; i++) {
            const angle = i * angleIncrement + Math.PI / 2
            const x = radius * Math.cos(angle)
            const z = radius * Math.sin(angle)
            positions.push([x, 0, z])
        }
        return positions
    }, [])

    const tableInfo = {
        centerPos: [0, 0, 0.475],
        leftEdge: -0.8,
        rightEdge: 0.8,
        backEdge: 0.05,
        frontEdge: 0.5,
    }
    tableInfo.widthRange = [tableInfo.leftEdge, tableInfo.rightEdge]
    tableInfo.depthRange = [tableInfo.backEdge, tableInfo.frontEdge]

    const [randomItemPositions, setRandomItemPositions] = useState(
        Array.from({ length: data.length }, () => [
            0,
            configStages[carouselName].itemTableYPosition,
            0,
        ]),
    )

    useEffect(() => {
        storeActions.setChosenItem(data[carouselIndex], carouselName)

        // rotate the whole carousel
        gsap.to(carouselRef.current.rotation, {
            duration: rotationSpeed,
            y: -carouselRotation * angleIncrement,
            ease: 'power1.inOut',
        })

        // get the current carousel mesh
        const carouselFocusMesh = scene.getObjectByName(
            `Carousel ${carouselName} Item ${carouselIndex}`,
        )

        // position/rotate the current mesh like it merged to the primary ring
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

        // get the previous carousel mesh
        const previouslyFocussedItem = scene.getObjectByName(
            `Carousel ${carouselName} Item ${carouselPreviousIndex}`,
        )

        // return the previouis mesh to it's normal place in the carousel
        if (previouslyFocussedItem) {
            gsap.to(previouslyFocussedItem.position, {
                duration: rotationSpeed,
                // y: 0,
                y: configStages[carouselName].itemCarouselYPosition,
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

    useEffect(() => {
        if (!itemMeshes?.length) return

        const duration = 1.25

        // On table stage change...
        //
        //
        // Return to Carousel:
        //
        if (configStage == carouselName) {
            // reset rotation of carousel to where it was when active
            gsap.to(carouselRef.current.rotation, {
                duration: duration,
                // this rotation smoothly rotate back, but it doesn't match the carousel rotation, fix this 'onComplete'
                y: -carouselRotation * angleIncrement,
                ease: 'power1.inOut',
                onComplete: () => {
                    // use a .set so no visual movement occurs
                    // put the rotation back to where it was for the carousel to increment/decrement by one angle rotation properly
                    gsap.set(carouselRef.current.rotation, {
                        y: -carouselRotation * angleIncrement,
                    })
                },
            })

            itemMeshes.forEach((item, index) => {
                // const staggerDelay = 0
                const staggerDelay = randomNumberWithinRange(0, duration * 0.5)

                gsap.to(item.position, {
                    delay: staggerDelay,
                    duration: duration,
                    x: carouselPositions[index][0],
                    z: carouselPositions[index][2],
                    ease: 'power1.inOut',
                })

                // jump up:
                gsap.to(item.position, {
                    delay: staggerDelay,
                    duration: duration * 0.5,
                    y: 0.15,
                    ease: 'power1.inOut',
                })
                gsap.to(item.position, {
                    delay: staggerDelay + duration * 0.5,
                    duration: duration * 0.5,
                    y: configStages[carouselName].itemCarouselYPosition,
                    ease: 'power1.inOut',
                })

                // rotate:
                gsap.to(item.rotation, {
                    delay: staggerDelay,
                    duration: duration,
                    x:
                        carouselName == configStages.gemColor.name
                            ? degToRad(360)
                            : degToRad(0),
                    y: degToRad(180),
                    z: 0,
                    ease: 'power1.inOut',
                })
            })
        }
        //
        //
        // Or, return to Table:
        //
        else {
            // only animate if this carousel was previously active
            if (configStagePrevious != carouselName) return

            const rotationForFrontOfCarouselToFaceOutwards =
                carouselRef.current.rotation.y - carouselIndex * angleIncrement

            gsap.to(carouselRef.current.rotation, {
                duration: duration,
                y: rotationForFrontOfCarouselToFaceOutwards,
                ease: 'power1.inOut',
            })

            itemMeshes.forEach((item, index) => {
                const staggerDelay = randomNumberWithinRange(0, duration / 2)

                // some values can be 360 here, so better rotate from 0 instead or item will jump
                gsap.set(item.rotation, {
                    x: 0,
                    z: 0,
                })

                gsap.to(item.position, {
                    delay: staggerDelay,
                    duration: duration,
                    x: randomItemPositions[index][0],
                    z: randomItemPositions[index][2],
                    ease: 'power1.inOut',
                })

                // jump up:
                gsap.to(item.position, {
                    delay: staggerDelay,
                    duration: duration * 0.5,
                    y: 0.15,
                    ease: 'power1.inOut',
                })
                gsap.to(item.position, {
                    delay: staggerDelay + duration * 0.5,
                    duration: duration * 0.75,
                    y: configStages[configStagePrevious].itemTableYPosition,
                    ease: 'power1.out',
                })

                // rotate:
                gsap.to(item.rotation, {
                    delay: staggerDelay,
                    duration: staggerDelay + duration * 0.7,
                    x:
                        carouselName == configStages.gemColor.name
                            ? degToRad(39)
                            : degToRad(85),
                    y: 0,
                    z:
                        carouselName == configStages.gemColor.name
                            ? degToRad(randomNumberWithinRange(-45, 45))
                            : 0,
                    ease: 'power1.inOut',
                })
            })
        }
    }, [configStage])

    useEffect(() => {
        setItemMeshes(() => {
            const arr = []
            itemNames.forEach((name) => {
                arr.push(scene.getObjectByName(name))
            })
            return arr
        })

        setRandomItemPositions(
            generateRandomPositions(
                data.length,
                tableInfo.widthRange,
                tableInfo.depthRange,
                configStages[carouselName].itemTableYPosition,
            ),
        )

        // one time only, randomise rotation of gems on table
        // ready to flip over and move to carousel when intro ends
        // can't put rotation values on the JSX below as that seems
        // to rotate the gems if you click the 'Gem' nav button
        if (carouselName == configStages.gemColor.name) {
            data.forEach((_, index) => {
                scene
                    .getObjectByName(itemNames[index])
                    .rotation.set(
                        degToRad(39),
                        0,
                        degToRad(randomNumberWithinRange(-45, 45)),
                    )
            })
        }
    }, [])

    return (
        <group
            name={`Outer Carousel ${carouselName}`}
            position={configStages[carouselName].carouselPosition}
            rotation={configStages[carouselName].carouselRotation}
        >
            {/* <mesh position={[0, 0, 0.8]}>
                <boxGeometry args={[0.25, 0.25, 0.25]} />
                <meshStandardMaterial color="purple" />
            </mesh> */}
            <group ref={carouselRef} name={`Carousel ${carouselName}`}>
                {data.map((item, index) => {
                    return (
                        <React.Fragment key={index}>
                            {carouselName == configStages.gemColor.name && (
                                <Diamond
                                    name={itemNames[index]}
                                    position={randomItemPositions[index]}
                                    scale={[meshScale, meshScale, meshScale]}
                                    castShadow
                                    receiveShadow
                                    color={item.value}
                                />
                            )}
                            {carouselName == configStages.ring.name && (
                                <CarouselRing
                                    name={itemNames[index]}
                                    position={randomItemPositions[index]}
                                    rotation={[degToRad(85), 0, 0]}
                                    modelPath={item.value}
                                    meshName={item.meshName}
                                    carouselRingScale={meshScale}
                                    preventGemRotation={true}
                                />
                            )}
                            {carouselName == configStages.metal.name && (
                                <mesh
                                    name={itemNames[index]}
                                    position={randomItemPositions[index]}
                                    castShadow
                                    receiveShadow
                                >
                                    <sphereGeometry args={[0.065, 16, 16]} />
                                    <meshStandardMaterial
                                        color={adjustLightnessFromHSL(
                                            item.value,
                                            -30,
                                        )}
                                        roughness={item.roughness}
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
