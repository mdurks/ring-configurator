import { Html, useGLTF } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import { degToRad } from 'three/src/math/MathUtils.js'
import {
    configStages,
    ringDefaultState,
    tableTopYPos,
    useAppStore,
} from '../../store/store'
import gsap from 'gsap'
import { hexToHSL } from '../../utilities/hexToHSL'

export const TryItonUI = ({ ringRef }) => {
    //
    //
    // Global state:
    const configStage = useAppStore((state) => state.configStage)
    const gemColor = useAppStore((state) => state.gemColor.chosenItem)
    const metalColor = useAppStore((state) => state.metal.chosenItem)

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

    const orientations = {
        message: {
            start: {
                position: [-1.7, tableTopYPos, -0.3],
                rotation: [0, degToRad(-80), 0],
                scale: [0.025, 0.025, 0.025],
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
                position: [-1.75, tableTopYPos, 0.175],
                rotation: [0, degToRad(-110), 0],
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
                duration: duration,
                x: orientations.message.end.position[0],
                y: orientations.message.end.position[1],
                z: orientations.message.end.position[2],
                ease: 'power1.inOut',
            })
            gsap.to(messageRef.current.rotation, {
                duration: duration,
                x: orientations.message.end.rotation[0],
                y: orientations.message.end.rotation[1],
                z: orientations.message.end.rotation[2],
                ease: 'power1.inOut',
            })
            gsap.to(messageRef.current.scale, {
                duration: duration,
                x: orientations.message.end.scale[0],
                y: orientations.message.end.scale[1],
                z: orientations.message.end.scale[2],
                ease: 'power1.inOut',
            })
            gsap.to(messageXRef.current.rotation, {
                duration: duration,
                x: orientations.messageX.end.rotation[0],
                y: orientations.messageX.end.rotation[1],
                z: orientations.messageX.end.rotation[2],
                ease: 'power1.inOut',
            })
            //
            //
            // phone:
            gsap.to(phoneRef.current.position, {
                duration: duration,
                x: orientations.phone.end.position[0],
                y: orientations.phone.end.position[1],
                z: orientations.phone.end.position[2],
                ease: 'power1.inOut',
            })
            gsap.to(phoneRef.current.rotation, {
                duration: duration,
                x: orientations.phone.end.rotation[0],
                y: orientations.phone.end.rotation[1],
                z: orientations.phone.end.rotation[2],
                ease: 'power1.inOut',
            })
            //
            //
            // ring:
            gsap.to(ringRef.current.position, {
                delay: ringDelay * 0.5,
                duration: duration,
                x: orientations.ring.end.position[0],
                y: orientations.ring.end.position[1],
                z: orientations.ring.end.position[2],
                ease: 'power1.inOut',
            })
            gsap.to(ringRef.current.rotation, {
                delay: ringDelay * 0.5,
                duration: duration,
                x: orientations.ring.end.rotation[0],
                y: orientations.ring.end.rotation[1],
                z: orientations.ring.end.rotation[2],
                ease: 'power1.inOut',
            })
            gsap.to(ringRef.current.scale, {
                delay: ringDelay * 0.5,
                duration: duration,
                x: orientations.ring.end.scale[0],
                y: orientations.ring.end.scale[1],
                z: orientations.ring.end.scale[2],
                ease: 'power1.inOut',
            })
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
                x: orientations.message.start.position[0],
                y: orientations.message.start.position[1],
                z: orientations.message.start.position[2],
                ease: 'power1.inOut',
            })
            gsap.to(messageRef.current.rotation, {
                duration: duration,
                x: orientations.message.start.rotation[0],
                y: orientations.message.start.rotation[1],
                z: orientations.message.start.rotation[2],
                ease: 'power1.inOut',
            })
            gsap.to(messageRef.current.scale, {
                duration: duration,
                x: orientations.message.start.scale[0],
                y: orientations.message.start.scale[1],
                z: orientations.message.start.scale[2],
                ease: 'power1.inOut',
            })
            gsap.to(messageXRef.current.rotation, {
                duration: duration,
                x: orientations.messageX.start.rotation[0],
                y: orientations.messageX.start.rotation[1],
                z: orientations.messageX.start.rotation[2],
                ease: 'power1.inOut',
            })
            //
            //
            // phone:
            gsap.to(phoneRef.current.position, {
                duration: duration,
                x: orientations.phone.start.position[0],
                y: orientations.phone.start.position[1],
                z: orientations.phone.start.position[2],
                ease: 'power1.inOut',
            })
            gsap.to(phoneRef.current.rotation, {
                duration: duration,
                x: orientations.phone.start.rotation[0],
                y: orientations.phone.start.rotation[1],
                z: orientations.phone.start.rotation[2],
                ease: 'power1.inOut',
            })
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
    }, [configStage])

    const gradientStyle = {
        backgroundImage: `linear-gradient(0deg, hsl(${hexToHSL(
            metalColor?.value,
            'h',
        )}, 65%, 97%) 25%, hsl(${hexToHSL(
            metalColor?.value,
            'h',
        )}, 65%, 80%) 100%)`,
    }
    // const gradientStyle = {
    //     backgroundImage:
    //         'linear-gradient(0deg, hsl(50, 100%, 97%) 25%, hsl(50, 100%, 80%) 100%)',
    // }
    const themeColor = gemColor?.value || '#000'

    return (
        <>
            <group
                ref={messageRef}
                name="TryItOn"
                position={orientations.message.start.position}
                rotation={orientations.message.start.rotation}
                scale={orientations.message.start.scale}
                // visible={false}
            >
                <group
                    ref={messageXRef}
                    rotation={orientations.messageX.start.rotation}
                >
                    <mesh
                        position={[0, 0, -0.001]}
                        rotation={[0, degToRad(180), 0]}
                        visible={false}
                    >
                        <planeGeometry args={[9.3, 12.5]} />
                        {/* <meshBasicMaterial color={'#ddd1b2'} /> */}
                        <meshBasicMaterial color={'#503a03'} />
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
                            style={gradientStyle}
                        >
                            <div className="leftCol">
                                <h1 style={{ color: themeColor }}>Try it on</h1>
                                <p style={{ color: themeColor }}>
                                    See this ring on your own hand using your
                                    phones camera
                                </p>
                                <button style={{ backgroundColor: themeColor }}>
                                    &gt;&gt; Start now
                                </button>
                            </div>
                        </div>
                    </Html>
                </group>
            </group>
            <group
                ref={phoneRef}
                name="MobilePhoneModel"
                position={orientations.phone.start.position}
                rotation={orientations.phone.start.rotation}
                // rotation={[degToRad(-86), degToRad(-171), degToRad(-81)]}
            >
                {phoneModelNodes.map((item) => {
                    return (
                        <mesh
                            key={item.uuid}
                            name={item.name}
                            geometry={item.geometry}
                            position={item.position}
                            rotation={item.rotation}
                            scale={item.scale}
                            material={item.material}
                            castShadow
                            receiveShadow
                        />
                    )
                })}
            </group>

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
