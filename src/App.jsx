import { useEffect, useLayoutEffect, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import {
    OrbitControls,
    Scroll,
    ScrollControls,
    useScroll,
} from '@react-three/drei'
import gsap from 'gsap'

import { degToRad } from 'three/src/math/MathUtils.js'

import { Diamond } from './components/Diamond/Diamond'
import { MiscExperiments } from './components/Experiments/MiscExperiments'
import { EnvironmentSetup } from './components/EnvironmentSetup/EnvironmentSetup'
import { WavyRing } from './components/WavyRing/WavyRing'

function App() {
    const scroll = useScroll()

    const ringRef = useRef()
    const tl = useRef(gsap.timeline())

    const isRingReadyForScroll = useRef(false)
    const timeToSubtractForSetupAnimation = useRef()

    useFrame(() => {
        if (isRingReadyForScroll.current)
            tl.current.seek(
                scroll.offset *
                    (tl.current.duration() -
                        timeToSubtractForSetupAnimation.current) +
                    timeToSubtractForSetupAnimation.current,
            )
    })

    useLayoutEffect(() => {
        //
        //
        //
        //
        //
        // DOM handles:
        const introTitle1El = document.querySelector('.introTitle1')
        const introTitle2El = document.querySelector('.introTitle2')
        const introTitle3El = document.querySelector('.introTitle3')

        //
        //
        //
        //
        //
        // move elements into position:
        ringRef.current.position.x = -5
        gsap.set(introTitle1El, {
            left: -introTitle1El.offsetWidth,
        })
        gsap.set(introTitle2El, {
            right: -introTitle2El.offsetWidth,
        })
        gsap.set(introTitle3El, {
            top: -introTitle3El.offsetHeight,
        })

        //
        //
        //
        //
        //
        // Pre animation start:
        tl.current.addLabel('pre animation setup')

        tl.current.to(
            ringRef.current.position,
            {
                duration: 2,
                x: 1.5,
                y: 0,
                ease: 'power1.inOut',
            },
            'pre animation setup',
        )
        tl.current.to(
            introTitle1El,
            {
                duration: 2,
                left: '10%',
                ease: 'power1.inOut',
            },
            'pre animation setup',
        )
        tl.current.add(() => {
            isRingReadyForScroll.current = true
            timeToSubtractForSetupAnimation.current =
                tl.current.labels['ready for scrolling']
        })

        //
        //
        //
        //
        //
        // Primary animation:
        // bind the following animation to the scrollbar
        //
        //
        //
        //
        //
        tl.current.addLabel('ready for scrolling')

        tl.current.to(
            ringRef.current.position,
            {
                duration: 8,
                x: -2,
                ease: 'power1.inOut',
            },
            'ready for scrolling',
        )
        tl.current.to(
            ringRef.current.rotation,
            {
                duration: 8,
                y: degToRad(180),
                ease: 'power1.inOut',
            },
            'ready for scrolling',
        )
        tl.current.to(
            introTitle1El,
            {
                duration: 4,
                left: -introTitle1El.offsetWidth,
                ease: 'power1.inOut',
            },
            'ready for scrolling',
        )
        tl.current.to(
            introTitle2El,
            {
                delay: 3,
                duration: 4,
                right: '10%',
                ease: 'power1.inOut',
            },
            'ready for scrolling',
        )

        //
        //
        //
        //
        //
        tl.current.addLabel('message three')

        tl.current.to(
            introTitle2El,
            {
                delay: 1,
                duration: 8,
                right: -introTitle2El.offsetWidth,
                ease: 'power1.inOut',
            },
            'message three',
        )
        tl.current.to(
            ringRef.current.position,
            {
                duration: 8,
                x: 0,
                ease: 'power1.inOut',
            },
            'message three',
        )
        tl.current.to(
            ringRef.current.rotation,
            {
                duration: 8,
                y: degToRad(360),
                ease: 'power1.inOut',
            },
            'message three',
        )
        tl.current.to(
            ringRef.current.scale,
            {
                duration: 8,
                x: 2,
                y: 2,
                z: 2,
                ease: 'power1.inOut',
            },
            'message three',
        )
        tl.current.to(
            introTitle3El,
            {
                delay: 3,
                duration: 4,
                top: '10%',
                ease: 'power1.inOut',
            },
            'message three',
        )

        // add empty time:
        // tl.current.to({}, { duration: 2 })

        //
        //
        //
        //
        //
        // END of timeline:
        tl.current.add(() => {
            console.log('END of timeline')
            // isRingReadyForScroll.current = false
        })
    }, [])

    return (
        <>
            <EnvironmentSetup />

            <OrbitControls
                makeDefault
                dampingFactor={0.1}
                // minPolarAngle={0}
                // maxPolarAngle={degToRad(85)}
                // autoRotate
                // autoRotateSpeed={1.5}
                enableZoom={false}
            />

            {/* <Diamond position={[0, 0.32, 0]} rotation={[0, 0, 0.715]} /> */}

            <WavyRing ringRef={ringRef} />

            <mesh receiveShadow castShadow visible={false}>
                <boxGeometry />
                <meshStandardMaterial />
            </mesh>

            {/* <MiscExperiments /> */}
        </>
    )
}

export default App
