import { useEffect, useLayoutEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import {
    OrbitControls,
    Scroll,
    ScrollControls,
    useScroll,
} from '@react-three/drei'
import gsap from 'gsap'

import { degToRad } from 'three/src/math/MathUtils.js'

import { useAppStore, gazeboFinalPosition, storeActions } from './store/store'

import { MiscExperiments } from './components/Experiments/MiscExperiments'
import { EnvironmentSetup } from './components/EnvironmentSetup/EnvironmentSetup'
import { PrimaryRing } from './components/PrimaryRing/PrimaryRing'
import { Gazebo } from './components/Gazebo/Gazebo'
import { ProductRotator } from './components/ProductRotator/ProductRotator'

function App() {
    //
    //
    // Global state:
    const three = useThree()
    const isIntroActive = useAppStore((state) => state.isIntroActive)
    const scroll = useScroll()

    // Local init:
    const groupGazeboRef = useRef()
    const ringRef = useRef()
    const tl_intro = useRef(gsap.timeline())

    const isRingReadyForScroll = useRef(false)
    const timeToSubtractForSetupAnimation = useRef()

    const onKeyDown = (e) => {
        if (e.key == 'l') console.log(three.scene)
    }

    useEffect(() => {
        window.addEventListener('keydown', onKeyDown)
        return () => {
            window.addEventListener('keydown', onKeyDown)
        }
    }, [])

    useFrame(() => {
        if (isRingReadyForScroll.current)
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

        //
        //
        //
        //
        //
        // move elements into position:
        groupGazeboRef.current.position.y = -15
        groupGazeboRef.current.rotation.y = degToRad(-90)

        ringRef.current.position.x = -10
        ringRef.current.scale.set(6, 6, 6)

        gsap.set(introTitle1El, {
            left: -introTitle1El.offsetWidth,
            opacity: 1,
        })
        gsap.set(introTitle2El, {
            right: -introTitle2El.offsetWidth,
            opacity: 1,
        })
        gsap.set(introTitle3El, {
            top: -introTitle3El.offsetHeight,
            opacity: 1,
        })

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
                // duration: 2,
                duration: 0.2,
                x: 1.5,
                y: -0.5,
                ease: 'power1.inOut',
            },
            'pre animation setup',
        )
        tl_intro.current.to(
            ringRef.current.rotation,
            {
                // duration: 2,
                duration: 0.2,
                y: degToRad(180),
                ease: 'power1.inOut',
            },
            'pre animation setup',
        )
        tl_intro.current.to(
            introTitle1El,
            {
                // duration: 2,
                duration: 0.2,
                left: '10%',
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
                x: -2,
                ease: 'power1.inOut',
            },
            'ready for scrolling',
        )
        tl_intro.current.to(
            ringRef.current.rotation,
            {
                duration: 8,
                y: degToRad(360),
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
        tl_intro.current.addLabel('message three')

        tl_intro.current.to(
            introTitle2El,
            {
                delay: 1,
                duration: 8,
                right: -introTitle2El.offsetWidth,
                ease: 'power1.inOut',
            },
            'message three',
        )
        tl_intro.current.to(
            ringRef.current.position,
            {
                duration: 8,
                x: 0,
                ease: 'power1.inOut',
            },
            'message three',
        )
        tl_intro.current.to(
            ringRef.current.rotation,
            {
                duration: 8,
                y: degToRad(540),
                ease: 'power1.inOut',
            },
            'message three',
        )
        tl_intro.current.to(
            ringRef.current.scale,
            {
                duration: 8,
                x: 3,
                y: 3,
                z: 3,
                ease: 'power1.inOut',
            },
            'message three',
        )
        tl_intro.current.to(
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
        // tl_intro.current.to({}, { duration: 2 })

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
                delay: 8,
                duration: 4,
                z: gazeboFinalPosition.z,
                ease: 'power1.inOut',
            },
            'down to gazebo',
        )
        tl_intro.current.to(
            ringRef.current.position,
            {
                delay: 4,
                duration: 8,
                y: -0.07,
                z: 4.25,
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

        //
        //
        //
        //
        //
        // END of timeline:
        tl_intro.current.add(() => {
            // console.log('END of timeline')
            if (isIntroActive) storeActions.setIsIntroActive(false)
            document.body.classList.remove('introActive')
            document.body.classList.add('introEnded')
            document.body.style.cursor = 'grab'
            // isRingReadyForScroll.current = false
        })
    }, [])

    return (
        <>
            <EnvironmentSetup />

            {isIntroActive == false && <ProductRotator meshRef={ringRef} />}

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

            <Gazebo groupGazeboRef={groupGazeboRef} />

            {/* <MiscExperiments /> */}
        </>
    )
}

export default App
