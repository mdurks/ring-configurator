import { Html, useGLTF } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

import { degToRad } from 'three/src/math/MathUtils.js'
import { getHSLValues } from '../../utilities/getHSLValues'
import { checkIsMobile } from '../../utilities/checkIsMobile'

import {
    configStages,
    ringDefaultState,
    tableTopYPos,
    useAppStore,
} from '../../store/store'

export const TryItonUI = ({ ringRef }) => {
    //
    //
    // Global state:
    const configStage = useAppStore((state) => state.configStage)
    const gemColor = useAppStore((state) => state.gemColor.chosenItem)
    const metalColor = useAppStore((state) => state.metal.chosenItem)
    const isMobile = checkIsMobile()

    // Local state:
    const [isTryonStage, setIsTryonStage] = useState(false)

    // Local init:
    const messageRef = useRef()
    const messageXRef = useRef()
    const phoneRef = useRef()

    const phoneModel = useGLTF('/RringConfiguratorPhone.glb')
    const phoneModelNodes = Object.keys(phoneModel.nodes).map((key) => {
        return phoneModel.nodes[key]
    })
    const clockMarkerMesh = phoneModel.nodes['ClockMarker']
    clockMarkerMesh.visible = false

    const orientationsMobile = {
        message: {
            position: [-1.75, 1.75, -0.01],
            rotation: [0, degToRad(-87), 0],
            scale: [0.05, 0.05, 0.05],
        },
        messageX: {
            rotation: [degToRad(-3), 0, 0],
        },
        ring: {
            position: [-0.003, -0.075, 4.5],
            rotation: [degToRad(42.5), degToRad(17), degToRad(0)],
            scale: [0.18, 0.18, 0.18],
        },
    }
    const orientationsDesktop = {
        message: {
            start: {
                position: [-1.6, tableTopYPos, -0.5],
                rotation: [0, degToRad(-80), 0],
                scale: [0.015, 0.015, 0.015],
            },
            end: {
                position: [-1.75, 1.75, 0.01],
                rotation: [0, degToRad(-87), 0],
                scale: [0.05, 0.05, 0.05],
            },
        },
        messageX: {
            start: {
                rotation: [degToRad(-90), 0, 0],
            },
            end: {
                rotation: [degToRad(-3), 0, 0],
            },
        },
        phone: {
            start: {
                position: [-1.75, tableTopYPos, 0.3],
                rotation: [0, degToRad(-160), 0],
            },
            end: {
                position: [-1.9, 1.775, 0.23],
                rotation: [degToRad(-86), degToRad(-171), degToRad(-81)],
            },
        },
        ring: {
            end: {
                position: [0.195, 0.03, 4.5],
                rotation: [degToRad(75), degToRad(-5), degToRad(25)],
                scale: [0.035, 0.035, 0.035],
            },
        },
    }

    useEffect(() => {
        const duration = 1.5
        const ringDelay = duration

        if (isMobile) {
            if (configStage == configStages.tryon.name) {
                //
                //
                // Enter tryon animation:
                //
                //
                document.body.style.cursor = 'default'
                setIsTryonStage(true)
                //
                gsap.to(ringRef.current.position, {
                    delay: ringDelay * 0.5,
                    duration: duration,
                    x: orientationsMobile.ring.position[0],
                    y: orientationsMobile.ring.position[1],
                    z: orientationsMobile.ring.position[2],
                    ease: 'power1.inOut',
                })
                gsap.to(ringRef.current.rotation, {
                    delay: ringDelay * 0.5,
                    duration: duration,
                    x: orientationsMobile.ring.rotation[0],
                    y: orientationsMobile.ring.rotation[1],
                    z: orientationsMobile.ring.rotation[2],
                    ease: 'power1.inOut',
                })
                gsap.to(ringRef.current.scale, {
                    delay: ringDelay * 0.5,
                    duration: duration,
                    x: orientationsMobile.ring.scale[0],
                    y: orientationsMobile.ring.scale[1],
                    z: orientationsMobile.ring.scale[2],
                    ease: 'power1.inOut',
                })
                //
                //
                //
            } else {
                //
                // Leave tryon animation:
                //
                if (isTryonStage) {
                    gsap.to(ringRef.current.position, {
                        duration: duration,
                        x: ringDefaultState.position.x,
                        y: ringDefaultState.position.y,
                        z: ringDefaultState.position.z,
                        ease: 'power1.inOut',
                    })
                    gsap.to(ringRef.current.rotation, {
                        duration: duration,
                        x: ringDefaultState.rotation.x,
                        y: ringDefaultState.rotation.y,
                        z: ringDefaultState.rotation.z,
                        ease: 'power1.inOut',
                    })
                    gsap.to(ringRef.current.scale, {
                        duration: duration,
                        x: ringDefaultState.scale.x,
                        y: ringDefaultState.scale.y,
                        z: ringDefaultState.scale.z,
                        ease: 'power1.inOut',
                    })
                }
                setIsTryonStage(false)
                //
                //
            }

            //
            //
            //
            // Desktop:
            //
        } else {
            if (configStage == configStages.tryon.name) {
                //
                //
                // Enter tryon animation:
                //
                //
                document.body.style.cursor = 'default'
                setIsTryonStage(true)
                //
                //
                // message:
                gsap.to(messageRef.current.position, {
                    delay: duration * 0.2,
                    duration: duration,
                    x: orientationsDesktop.message.end.position[0],
                    y: orientationsDesktop.message.end.position[1],
                    z: orientationsDesktop.message.end.position[2],
                    ease: 'power1.inOut',
                })
                gsap.to(messageRef.current.rotation, {
                    delay: duration * 0.2,
                    duration: duration,
                    x: orientationsDesktop.message.end.rotation[0],
                    y: orientationsDesktop.message.end.rotation[1],
                    z: orientationsDesktop.message.end.rotation[2],
                    ease: 'power1.inOut',
                })
                gsap.to(messageRef.current.scale, {
                    delay: duration * 0.2,
                    duration: duration,
                    x: orientationsDesktop.message.end.scale[0],
                    y: orientationsDesktop.message.end.scale[1],
                    z: orientationsDesktop.message.end.scale[2],
                    ease: 'power1.inOut',
                })
                gsap.to(messageXRef.current.rotation, {
                    delay: duration * 0.2,
                    duration: duration,
                    x: orientationsDesktop.messageX.end.rotation[0],
                    y: orientationsDesktop.messageX.end.rotation[1],
                    z: orientationsDesktop.messageX.end.rotation[2],
                    ease: 'power1.inOut',
                })
                //
                //
                // phone:
                gsap.to(phoneRef.current.position, {
                    delay: duration * 0.3,
                    duration: duration,
                    x: orientationsDesktop.phone.end.position[0],
                    y: orientationsDesktop.phone.end.position[1],
                    z: orientationsDesktop.phone.end.position[2],
                    ease: 'power1.inOut',
                })
                gsap.to(phoneRef.current.rotation, {
                    delay: duration * 0.3,
                    duration: duration,
                    x: orientationsDesktop.phone.end.rotation[0],
                    y: orientationsDesktop.phone.end.rotation[1],
                    z: orientationsDesktop.phone.end.rotation[2],
                    ease: 'power1.inOut',
                })
                //
                //
                // ring:
                gsap.to(ringRef.current.position, {
                    delay: ringDelay * 0.5,
                    duration: duration,
                    x: orientationsDesktop.ring.end.position[0],
                    y: orientationsDesktop.ring.end.position[1],
                    z: orientationsDesktop.ring.end.position[2],
                    ease: 'power1.inOut',
                })
                gsap.to(ringRef.current.rotation, {
                    delay: ringDelay * 0.5,
                    duration: duration,
                    x: orientationsDesktop.ring.end.rotation[0],
                    y: orientationsDesktop.ring.end.rotation[1],
                    z: orientationsDesktop.ring.end.rotation[2],
                    ease: 'power1.inOut',
                })
                gsap.to(ringRef.current.scale, {
                    delay: ringDelay * 0.5,
                    duration: duration,
                    x: orientationsDesktop.ring.end.scale[0],
                    y: orientationsDesktop.ring.end.scale[1],
                    z: orientationsDesktop.ring.end.scale[2],
                    ease: 'power1.inOut',
                })
                //
                //
                //
                // phone shadow:
                if (document.querySelector('.phoneShadow')) {
                    gsap.to('.phoneShadow', {
                        delay: ringDelay * 0.5,
                        duration: duration,
                        opacity: 0.2,
                        ease: 'power1.inOut',
                    })
                }
                //
                //
                //
            } else {
                //
                // Leave tryon animation:
                //
                //
                // document.body.style.cursor = ''
                //
                //
                gsap.to(messageRef.current.position, {
                    duration: duration,
                    x: orientationsDesktop.message.start.position[0],
                    y: orientationsDesktop.message.start.position[1],
                    z: orientationsDesktop.message.start.position[2],
                    ease: 'power1.inOut',
                })
                gsap.to(messageRef.current.rotation, {
                    duration: duration,
                    x: orientationsDesktop.message.start.rotation[0],
                    y: orientationsDesktop.message.start.rotation[1],
                    z: orientationsDesktop.message.start.rotation[2],
                    ease: 'power1.inOut',
                })
                gsap.to(messageRef.current.scale, {
                    duration: duration,
                    x: orientationsDesktop.message.start.scale[0],
                    y: orientationsDesktop.message.start.scale[1],
                    z: orientationsDesktop.message.start.scale[2],
                    ease: 'power1.inOut',
                })
                gsap.to(messageXRef.current.rotation, {
                    duration: duration,
                    x: orientationsDesktop.messageX.start.rotation[0],
                    y: orientationsDesktop.messageX.start.rotation[1],
                    z: orientationsDesktop.messageX.start.rotation[2],
                    ease: 'power1.inOut',
                })
                //
                //
                // phone:
                gsap.to(phoneRef.current.position, {
                    duration: duration,
                    x: orientationsDesktop.phone.start.position[0],
                    y: orientationsDesktop.phone.start.position[1],
                    z: orientationsDesktop.phone.start.position[2],
                    ease: 'power1.inOut',
                })
                gsap.to(phoneRef.current.rotation, {
                    duration: duration,
                    x: orientationsDesktop.phone.start.rotation[0],
                    y: orientationsDesktop.phone.start.rotation[1],
                    z: orientationsDesktop.phone.start.rotation[2],
                    ease: 'power1.inOut',
                })
                //
                //
                //
                // phone shadow:
                if (document.querySelector('.phoneShadow')) {
                    gsap.to('.phoneShadow', {
                        duration: 0.5,
                        opacity: 0,
                        ease: 'power1.inOut',
                    })
                }
                //
                //
                // ring:
                if (isTryonStage) {
                    gsap.to(ringRef.current.position, {
                        duration: duration,
                        x: ringDefaultState.position.x,
                        y: ringDefaultState.position.y,
                        z: ringDefaultState.position.z,
                        ease: 'power1.inOut',
                    })
                    gsap.to(ringRef.current.rotation, {
                        duration: duration,
                        x: ringDefaultState.rotation.x,
                        y: ringDefaultState.rotation.y,
                        z: ringDefaultState.rotation.z,
                        ease: 'power1.inOut',
                    })
                    gsap.to(ringRef.current.scale, {
                        duration: duration,
                        x: ringDefaultState.scale.x,
                        y: ringDefaultState.scale.y,
                        z: ringDefaultState.scale.z,
                        ease: 'power1.inOut',
                    })
                }
                setIsTryonStage(false)
                //
                //
            }
        }
    }, [configStage])

    const metalHSL = metalColor?.value ? getHSLValues(metalColor.value) : null

    let backgroundColor = {
        backgroundImage:
            'linear-gradient(0deg, hsl(50, 100%, 97%) 25%, hsl(50, 100%, 80%) 100%',
    }

    if (metalHSL) {
        //
        // vertical gradient:
        // backgroundColor = {
        //     backgroundImage: `linear-gradient(0deg, hsl(${metalHSL.h}, ${
        //         metalHSL.s
        //     }%, ${metalHSL.l * 0.925}%) 0%, hsl(${metalHSL.h}, ${
        //         metalHSL.s
        //     }%, ${metalHSL.l * 1.12}%) 70%)`,
        // }

        // box shadow:
        backgroundColor = {
            backgroundColor: `hsl(${metalHSL.h} ${metalHSL.s}% ${
                metalHSL.l * 1.13
            }%)`,
            boxShadow: `hsl(${metalHSL.h} ${metalHSL.s}% ${
                metalHSL.l * 0.75
            }%) 0px 0px 180px 0px inset`,
        }
    }

    const gemHSL = gemColor?.value ? getHSLValues(gemColor.value) : null
    let contentColor = '#000'

    if (gemHSL) {
        contentColor = `hsl(${gemHSL.h}, ${gemHSL.s * 0.7}%, ${
            gemHSL.l * 0.65
        }%)`
    }

    const phoneHSL = gemColor?.value ? getHSLValues(gemColor.value) : null
    let phoneColor = '#000'

    if (phoneHSL) {
        phoneColor = `hsl(${phoneHSL.h}, ${phoneHSL.s * 1.25}%, ${
            phoneHSL.l * 0.3
        }%)`
    }

    return (
        <>
            <group
                ref={messageRef}
                name="TryItOn"
                position={
                    isMobile
                        ? orientationsMobile.message.position
                        : orientationsDesktop.message.start.position
                }
                rotation={
                    isMobile
                        ? orientationsMobile.message.rotation
                        : orientationsDesktop.message.start.rotation
                }
                scale={
                    isMobile
                        ? orientationsMobile.message.scale
                        : orientationsDesktop.message.start.scale
                }
                // visible={false}
            >
                <group
                    ref={messageXRef}
                    rotation={
                        isMobile
                            ? orientationsMobile.messageX.rotation
                            : orientationsDesktop.messageX.start.rotation
                    }
                >
                    <mesh
                        position={[0, 0, -0.001]}
                        rotation={[0, degToRad(180), 0]}
                        // visible={false}
                    >
                        <planeGeometry
                            args={isMobile ? [8.7, 16.3] : [25, 16.3]}
                        />
                        <meshBasicMaterial color={'#dad6ce'} />
                        {/* <meshBasicMaterial color={'#503a03'} /> */}
                    </mesh>
                    <Html
                        className="dreiHtml"
                        castShadow
                        receiveShadow
                        occlude="blending"
                        transform
                    >
                        <div
                            className={`tryItOnWindow ${
                                isTryonStage && 'isTryonStage'
                            }`}
                            style={backgroundColor}
                        >
                            <div className="leftCol">
                                <h1 style={{ color: contentColor }}>
                                    Try it on
                                </h1>
                                <p style={{ color: contentColor }}>
                                    See this ring on your own hand using your
                                    phones camera
                                </p>
                                <button
                                    style={{ backgroundColor: contentColor }}
                                    onClick={() =>
                                        document
                                            .querySelector('.ar_button')
                                            .click()
                                    }
                                >
                                    View now
                                </button>
                            </div>
                            <div className="phoneShadow"></div>
                        </div>
                    </Html>
                </group>
            </group>
            {isMobile == false && (
                <group
                    ref={phoneRef}
                    name="MobilePhoneModel"
                    position={orientationsDesktop.phone.start.position}
                    rotation={orientationsDesktop.phone.start.rotation}
                    // rotation={[degToRad(-86), degToRad(-171), degToRad(-81)]}
                >
                    {phoneModelNodes.map((item) => {
                        const material = item.material
                        if (item.name == 'PhoneBody')
                            material?.color.set(phoneColor)
                        return (
                            <mesh
                                key={item.uuid}
                                name={item.name}
                                geometry={item.geometry}
                                position={item.position}
                                rotation={item.rotation}
                                scale={item.scale}
                                material={material}
                                castShadow
                                receiveShadow
                            />
                        )
                    })}
                </group>
            )}

            {/* <group
                position={[-1.75, 1.7, -0.5]}
                rotation={[degToRad(-30), degToRad(-75), degToRad(-25)]}
                scale={[0.05, 0.05, 0.05]}
            >
                <mesh
                    position={[0, 0, -0.001]}
                    rotation={[0, degToRad(180), 0]}
                >
                    <planeGeometry args={[9.3, 12.5]} />
                    <meshBasicMaterial color={'#ddd1b2'} />
                </mesh>
                <Html castShadow receiveShadow occlude="blending" transform>
                    <div className="letterForm">
                        <h1>Make an enquiry</h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur veniam
                            dolores similique, pariatur, et possimus. Ipsam at
                            pariatur cupiditate.
                        </p>
                        <div className="form">
                            <input placeholder="Name" />
                            <input placeholder="Email" />
                            <textarea placeholder="Message" rows="4" />
                            <button type="button">Send</button>
                        </div>
                    </div>
                </Html>
            </group> */}
        </>
    )
}
