/* eslint-disable no-unreachable */
import { useEffect, useLayoutEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, useScroll } from '@react-three/drei'
import gsap from 'gsap'

import { degToRad } from 'three/src/math/MathUtils.js'

import {
    useAppStore,
    gazeboFinalPosition,
    storeActions,
    ringDefaultState,
} from './store/store'

// import { MiscExperiments } from './components/Experiments/MiscExperiments'
import { EnvironmentSetup } from './components/EnvironmentSetup/EnvironmentSetup'
import { PrimaryRing } from './components/PrimaryRing/PrimaryRing'
import { Gazebo } from './components/Gazebo/Gazebo'
import { ProductRotator } from './components/ProductRotator/ProductRotator'
import { useXR } from '@react-three/xr'
import { CameraController } from './components/CameraController/CameraController'
import { checkIsMobile } from './utilities/checkIsMobile'

function App() {
    //
    //
    // Global state:
    const three = useThree()
    const isIntroActive = useAppStore((state) => state.isIntroActive)
    const scroll = useScroll()
    const { isPresenting } = useXR()
    const isMobile = checkIsMobile()

    // Local init:
    const groupGazeboRef = useRef()
    const ringRef = useRef()
    const gazeboFloorRef = useRef()
    const tl_intro = useRef(gsap.timeline())

    const isRingReadyForScroll = useRef(false)
    const timeToSubtractForSetupAnimation = useRef()

    // useEffect(() => {
    //     const onKeyDown = (e) => {
    //         if (e.key == 'l') console.log(three.scene)
    //     }
    //     window.addEventListener('keydown', onKeyDown)
    //     return () => {
    //         window.addEventListener('keydown', onKeyDown)
    //     }
    // }, [])

    useEffect(() => {
        // prevent scrolling while scene is set so any scrolling amount doesn't make
        // the animation jump to that point when the intro animation has completed
        const handleScroll = (e) => {
            if (isRingReadyForScroll.current == false) e.preventDefault()
        }
        window.addEventListener('wheel', handleScroll, { passive: false })

        const handleTouch = (e) => {
            if (isRingReadyForScroll.current == false) e.preventDefault()
        }
        window.addEventListener('touchstart', handleTouch, { passive: false })

        return () => {
            window.removeEventListener('wheel', handleScroll, {
                passive: false,
            })
            window.removeEventListener('touchstart', handleTouch, {
                passive: false,
            })
        }
    }, [])

    useFrame(() => {
        if (isRingReadyForScroll.current && isPresenting == false)
            tl_intro.current.seek(
                scroll.offset *
                    (tl_intro.current.duration() -
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
        const introScrollMsgEl = document.querySelector('.introScrollMsg')

        //
        //
        //
        //
        // move elements into position:
        groupGazeboRef.current.position.y = -20
        groupGazeboRef.current.position.z = -2.5
        groupGazeboRef.current.rotation.y = degToRad(-90)

        ringRef.current.position.set(-17, -0.3, -1.85)
        ringRef.current.rotation.set(degToRad(90), degToRad(360), degToRad(0))
        ringRef.current.scale.set(6, 6, 6)

        // return

        gsap.set(introTitle1El, { left: -introTitle1El.offsetWidth })
        gsap.set(introTitle2El, {
            left: window.innerWidth + introTitle2El.offsetWidth,
        })
        gsap.set(introTitle3El, { top: -introTitle3El.offsetHeight })

        //
        //
        //
        //
        //
        // Pre animation start:
        tl_intro.current.addLabel('pre animation setup')

        tl_intro.current.to(
            ringRef.current.position,
            {
                duration: 4,
                x: isMobile ? 0 : 2.08,
                y: isMobile ? 1.5 : -0.3,
                z: isMobile ? -4 : -1.85,
                ease: 'power1.inOut',
            },
            'pre animation setup',
        )
        tl_intro.current.to(
            ringRef.current.rotation,
            {
                duration: 4,
                x: 1.29,
                y: -0.94,
                z: 0,
                ease: 'power1.inOut',
            },
            'pre animation setup',
        )
        tl_intro.current.to(
            introTitle1El,
            {
                delay: 2.85,
                duration: 2.5,
                left: isMobile ? '50%' : '10%',
                opacity: 1,
                ease: 'power1.inOut',
            },
            'pre animation setup',
        )
        tl_intro.current.to(
            introScrollMsgEl,
            {
                delay: 5.25,
                duration: 1.5,
                opacity: 1,
                top: 0,
                ease: 'power1.inOut',
            },
            'pre animation setup',
        )
        tl_intro.current.add(() => {
            isRingReadyForScroll.current = true
            timeToSubtractForSetupAnimation.current =
                tl_intro.current.labels['ready for scrolling']
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
        tl_intro.current.addLabel('ready for scrolling')

        tl_intro.current.to(
            ringRef.current.position,
            {
                duration: 8,
                x: isMobile ? -0.1 : -2.8,
                y: isMobile ? 1.25 : -0.38,
                z: isMobile ? -4 : -1.85,
                ease: 'power1.inOut',
            },
            'ready for scrolling',
        )
        tl_intro.current.to(
            ringRef.current.rotation,
            {
                duration: 8,
                x: 1.41,
                y: 0.82,
                z: -0.35,
                ease: 'power1.inOut',
            },
            'ready for scrolling',
        )
        tl_intro.current.to(
            introTitle1El,
            {
                duration: 4,
                left: -introTitle1El.offsetWidth,
                ease: 'power1.inOut',
            },
            'ready for scrolling',
        )
        tl_intro.current.to(
            introTitle2El,
            {
                delay: 3,
                duration: 7,
                left: isMobile ? '50%' : '50%',
                opacity: 1,
                ease: 'power1.inOut',
            },
            'ready for scrolling',
        )

        // add empty time:
        tl_intro.current.to({}, { duration: 1 })

        //
        //
        //
        //
        //
        tl_intro.current.addLabel('message three')

        tl_intro.current.to(
            introTitle2El,
            {
                delay: 1,
                duration: 10,
                left: window.innerWidth + introTitle2El.offsetWidth,
                ease: 'power1.inOut',
            },
            'message three',
        )
        tl_intro.current.to(
            ringRef.current.position,
            {
                duration: 10,
                x: isMobile ? 0.25 : 0,
                y: -2.85,
                z: isMobile ? -3.5 : -2.1,
                ease: 'power1.inOut',
            },
            'message three',
        )
        tl_intro.current.to(
            ringRef.current.rotation,
            {
                duration: 10,
                x: 0.82,
                y: isMobile ? 6.8 : 6.32,
                z: 0,
                ease: 'power1.inOut',
            },
            'message three',
        )
        tl_intro.current.to(
            introTitle3El,
            {
                delay: 4,
                duration: 5,
                top: isMobile ? '11%' : '9%',
                opacity: 1,
                ease: 'power1.inOut',
            },
            'message three',
        )

        // add empty time:
        tl_intro.current.to({}, { duration: 1 })

        //
        //
        //
        //
        //
        tl_intro.current.addLabel('down to gazebo')

        tl_intro.current.to(
            introTitle3El,
            {
                duration: 4,
                top: -introTitle3El.offsetHeight,
                ease: 'power1.inOut',
            },
            'down to gazebo',
        )
        tl_intro.current.to(
            groupGazeboRef.current.position,
            {
                duration: 12,
                y: gazeboFinalPosition.y,
                ease: 'power1.inOut',
            },
            'down to gazebo',
        )
        tl_intro.current.to(
            groupGazeboRef.current.rotation,
            {
                duration: 12,
                y: 0,
                ease: 'power1.inOut',
            },
            'down to gazebo',
        )
        tl_intro.current.to(
            groupGazeboRef.current.position,
            {
                delay: 10,
                duration: 5,
                z: gazeboFinalPosition.z,
                ease: 'power1.inOut',
            },
            'down to gazebo',
        )
        tl_intro.current.to(
            ringRef.current.position,
            {
                duration: 5,
                y: 2,
                z: -18,
                ease: 'power1.inOut',
            },
            'down to gazebo',
        )
        tl_intro.current.to(
            ringRef.current.position,
            {
                delay: 5,
                duration: 10,
                x: ringDefaultState.position.x,
                y: ringDefaultState.position.y,
                z: ringDefaultState.position.z,
                ease: 'power1.inOut',
            },
            'down to gazebo',
        )
        tl_intro.current.to(
            ringRef.current.rotation,
            {
                duration: 12,
                y: degToRad(720),
                ease: 'power1.inOut',
            },
            'down to gazebo',
        )
        tl_intro.current.to(
            ringRef.current.scale,
            {
                delay: 4,
                duration: 8,
                x: 0.5,
                y: 0.5,
                z: 0.5,
                ease: 'power1.inOut',
            },
            'down to gazebo',
        )
        tl_intro.current.to(
            gazeboFloorRef.current.material,
            {
                delay: 4,
                duration: 8,
                opacity: 1,
                ease: 'power1.inOut',
            },
            'down to gazebo',
        )

        //
        //
        //
        //
        //
        // END of timeline:
        tl_intro.current.add(() => {
            if (isIntroActive) storeActions.setIsIntroActive(false)
            document.body.classList.remove('introActive')
            document.body.classList.add('introEnded')
            document.body.style.cursor = 'grab'
        })
    }, [])

    return (
        <>
            <EnvironmentSetup />

            {isPresenting == false && (
                <CameraController
                    camera={three.camera}
                    inertia={0.075}
                    moveAmount={0.03}
                />
            )}
            {isIntroActive == false && isPresenting == false && (
                <ProductRotator meshRef={ringRef} />
            )}

            {/* <OrbitControls
                makeDefault
                dampingFactor={0.1}
                // minPolarAngle={0}
                // maxPolarAngle={degToRad(85)}
                // autoRotate
                // autoRotateSpeed={1.5}
                // enableZoom={false}
            /> */}

            <PrimaryRing ringRef={ringRef} name={'Primary Ring'} />

            {isPresenting == false && (
                <Gazebo
                    groupGazeboRef={groupGazeboRef}
                    ringRef={ringRef}
                    gazeboFloorRef={gazeboFloorRef}
                />
            )}

            {/* <MiscExperiments /> */}
        </>
    )
}

export default App
