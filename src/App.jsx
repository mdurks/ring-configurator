/* eslint-disable no-unreachable */
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useXR } from '@react-three/xr'
import { OrbitControls, Text, useScroll } from '@react-three/drei'
import gsap from 'gsap'

import { degToRad } from 'three/src/math/MathUtils.js'
import { checkIsMobile } from './utilities/checkIsMobile'

import {
    useAppStore,
    gazeboFinalPosition,
    storeActions,
    ringDefaultState,
    configStages,
    fontPathDMSerifDisplay,
    fontPathAboreto,
} from './store/store'

// import { MiscExperiments } from './components/Experiments/MiscExperiments'
import { EnvironmentSetup } from './components/EnvironmentSetup/EnvironmentSetup'
import { PrimaryRing } from './components/PrimaryRing/PrimaryRing'
import { Gazebo } from './components/Gazebo/Gazebo'
import { ProductRotator } from './components/ProductRotator/ProductRotator'
import { CameraController } from './components/CameraController/CameraController'
import { RainingDiamonds } from './components/RainingDiamonds/RainingDiamonds'
import { getScreenEdgesInWorldCoordinates } from './utilities/getScreenEdgesInWorldCoordinates'
import { RoundedPlane } from './components/RoundedPlane/RoundedPlane'
import { orangeTextGradientMaterial } from './materials/orangeTextGradientMaterial'
import { introAnimation } from './animations/introAnimation'

/*

    Burndown:

    Fix mobile bug, try it on, ring in wrong position, behind the modal window
    Get "Try it on" hand picture
    More garden stuff in the big empty areas

*/

function App() {
    //
    //
    // Global state:
    const three = useThree()
    const hasClickedBegin = useAppStore((state) => state.hasClickedBegin)
    const isIntroActive = useAppStore((state) => state.isIntroActive)
    const scroll = useScroll()
    const { isPresenting } = useXR()
    const isMobile = checkIsMobile()
    const screenTo3DCoordinates = useMemo(
        () => getScreenEdgesInWorldCoordinates(three.camera, 0),
        [],
    )

    // Local init:
    const groupGazeboRef = useRef()
    const ringRef = useRef()
    const gazeboFloorRef = useRef()

    const tl_intro = useRef(gsap.timeline())

    const introTitle1Ref = useRef(false)
    const introTitle2Ref = useRef(false)
    const introTitle3Ref = useRef(false)
    const introScrollMsgRef = useRef(false)

    const introTitle1Positions = {
        xStart: screenTo3DCoordinates.left - 4,
        xEnd: isMobile ? 0 : -2.65,
        yPos: isMobile ? -1.1 : -0.3,
    }
    const introTitle2Positions = {
        xStart: screenTo3DCoordinates.right + 3,
        xEnd: isMobile ? 0 : 2.7,
    }
    const introTitle3Positions = {
        yStart: screenTo3DCoordinates.top + 3,
        yEnd: 2.7,
    }
    const introScrollMsgPositions = {
        yStart: screenTo3DCoordinates.bottom - 2,
        yEnd: isMobile ? -2 : -2.3,
    }

    const isRingReadyForScroll = useRef(false)
    const timeToSubtractForSetupAnimation = useRef()

    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key == 'l') {
                console.log('camera:', three.camera)
                console.log('scene:', three.scene)
            }
        }
        window.addEventListener('keydown', onKeyDown)
        return () => {
            window.addEventListener('keydown', onKeyDown)
        }
    }, [])

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
        if (
            isRingReadyForScroll.current &&
            isPresenting == false &&
            isDebugging == false
        )
            tl_intro.current.seek(
                scroll.offset *
                    (tl_intro.current.duration() -
                        timeToSubtractForSetupAnimation.current) +
                    timeToSubtractForSetupAnimation.current,
            )
    })

    useLayoutEffect(() => {
        if (isDebugging) return
        //
        //
        //
        //
        //
        // move elements into position:
        groupGazeboRef.current.position.y = -110 // move down so out of view
        groupGazeboRef.current.position.z = -25 // move back away from camera
        // groupGazeboRef.current.rotation.x = degToRad(-5)
        // groupGazeboRef.current.rotation.y = degToRad(-135)
        groupGazeboRef.current.rotation.y = degToRad(-105)

        ringRef.current.position.set(-17, -0.3, -1.85)
        ringRef.current.rotation.set(degToRad(90), degToRad(360), degToRad(0))
        ringRef.current.scale.set(6, 6, 6)
    }, [])

    useEffect(() => {
        if (hasClickedBegin) {
            const introPlaneMask = three.scene.getObjectByName('IntroPlaneMask')
            const cloudsUpper = three.scene.getObjectByName('CloudsUpper')
            const cloudsLower = three.scene.getObjectByName('CloudsLower')
            introAnimation(
                tl_intro,
                ringRef,
                isMobile,
                introTitle1Ref,
                introTitle1Positions,
                introScrollMsgRef,
                introScrollMsgPositions,
                isRingReadyForScroll,
                timeToSubtractForSetupAnimation,
                introTitle2Ref,
                introTitle2Positions,
                introTitle3Ref,
                introTitle3Positions,
                groupGazeboRef,
                gazeboFinalPosition,
                ringDefaultState,
                gazeboFloorRef,
                introPlaneMask,
                cloudsUpper,
                cloudsLower,
                isIntroActive,
            )
        }
    }, [hasClickedBegin])

    useEffect(() => {
        // one time event to trigger the gem table animation to
        // take gems off table and into carousel position
        if (isIntroActive == false) {
            storeActions.setConfigStagePrevious('intro')
            storeActions.setConfigStage(configStages.gemColor.name)

            introTitle1Ref.current.visible = false
            introTitle2Ref.current.visible = false
            introTitle3Ref.current.visible = false
        }
    }, [isIntroActive])

    const isDebugging = false

    return (
        <>
            <EnvironmentSetup />

            {isDebugging == false && isPresenting == false && (
                <CameraController
                    camera={three.camera}
                    inertia={0.075}
                    moveAmount={isIntroActive ? 0.015 : 0.06}
                />
            )}
            {isIntroActive == false && isPresenting == false && (
                <ProductRotator meshRef={ringRef} />
            )}

            {isDebugging && (
                <OrbitControls
                    makeDefault
                    dampingFactor={0.1}
                    // minPolarAngle={0}
                    // maxPolarAngle={degToRad(85)}
                    // autoRotate
                    // autoRotateSpeed={1.5}
                    // enableZoom={false}
                />
            )}

            {isMobile == false && hasClickedBegin && isIntroActive == true && (
                <RainingDiamonds />
            )}

            <PrimaryRing ringRef={ringRef} name={'Primary Ring'} />

            {isPresenting == false && (
                <Gazebo
                    groupGazeboRef={groupGazeboRef}
                    ringRef={ringRef}
                    gazeboFloorRef={gazeboFloorRef}
                />
            )}

            {/* <MiscExperiments /> */}

            <group
                ref={introTitle1Ref}
                position={[
                    introTitle1Positions.xStart,
                    introTitle1Positions.yPos,
                    0,
                ]}
            >
                <Text
                    color="#bb7000"
                    position={[0, 0, 0]}
                    fontSize={isMobile ? 0.6 : 1.13}
                    font={fontPathDMSerifDisplay}
                >
                    TIMELESS
                </Text>
                <Text
                    color="#bb7000"
                    position={[0, isMobile ? -0.5 : -0.9, 0]}
                    fontSize={isMobile ? 0.375 : 0.75}
                    font={fontPathDMSerifDisplay}
                >
                    ELEGANCE AWAITS
                </Text>
                <Text
                    color="black"
                    position={[0, isMobile ? -1.15 : -1.54, 0]}
                    fontSize={0.225}
                    font={fontPathAboreto}
                    textAlign="center"
                    lineHeight={1.5}
                >
                    {isMobile
                        ? 'DISCOVER THE ART OF\nBESPOKE JEWELLERY'
                        : 'DISCOVER THE ART OF BESPOKE JEWELLERY'}
                </Text>
                <group
                    ref={introScrollMsgRef}
                    position={[0, introScrollMsgPositions.yStart, 0]}
                >
                    <Text
                        color="#000"
                        position={[0, 0, 0.02]}
                        fontSize={isMobile ? 0.25 : 0.25}
                        font={fontPathAboreto}
                    >
                        SCROLL DOWN
                    </Text>
                    <Text
                        color="#000"
                        position={[0.0025, 0.0025, 0.02]}
                        fontSize={isMobile ? 0.25 : 0.25}
                        font={fontPathAboreto}
                    >
                        SCROLL DOWN
                    </Text>
                    <RoundedPlane
                        position={[0, -0.05, 0]}
                        width={2.7}
                        height={0.75}
                        radius={0.4}
                        depth={0}
                        material={orangeTextGradientMaterial}
                    />
                </group>
            </group>
            <group
                ref={introTitle2Ref}
                position={[introTitle2Positions.xStart, 0.15, 0]}
            >
                <Text
                    color="#bb7000"
                    position={[0, isMobile ? -1.5 : 0, 0]}
                    fontSize={isMobile ? 0.5 : 0.75}
                    font={fontPathDMSerifDisplay}
                >
                    DESIGN YOUR
                </Text>
                <Text
                    color="#bb7000"
                    position={[0, isMobile ? -2 : -0.7, 0]}
                    fontSize={isMobile ? 0.5 : 0.75}
                    font={fontPathDMSerifDisplay}
                >
                    DREAM RING
                </Text>
                <Text
                    color="black"
                    position={[0, isMobile ? -2.85 : -1.45, 0]}
                    fontSize={isMobile ? 0.2 : 0.225}
                    font={fontPathAboreto}
                    textAlign="center"
                    lineHeight={1.5}
                >
                    {isMobile
                        ? 'EXPERIENCE THE FUSION OF\nEXQUISITE DESIGN AND\nUNPARALLELED CRAFTMANSHIP'
                        : 'EXPERIENCE THE FUSION OF EXQUISITE\nDESIGN AND UNPARALLELED CRAFTMANSHIP'}
                </Text>
            </group>
            <group
                ref={introTitle3Ref}
                position={[0, introTitle3Positions.yStart, 0]}
            >
                <Text
                    color="#bb7000"
                    position={[0, 0, 0]}
                    fontSize={isMobile ? 0.65 : 1.1}
                    font={fontPathDMSerifDisplay}
                >
                    BEAUTY
                </Text>
                <Text
                    color="#bb7000"
                    position={[0, isMobile ? -0.55 : -0.9, 0]}
                    fontSize={isMobile ? 0.39 : 0.75}
                    font={fontPathDMSerifDisplay}
                >
                    TAILORED TO YOU
                </Text>
                <Text
                    color="black"
                    position={[0, isMobile ? -1.35 : -1.7, 0]}
                    fontSize={0.225}
                    font={fontPathAboreto}
                    textAlign="center"
                    lineHeight={isMobile ? 1.4 : 1.5}
                >
                    {isMobile
                        ? 'EMBRACE THE ELEGANCE OF\nPERSONAL STYLE AND\nEXCEPTIONAL ARTISTRY'
                        : 'EMBRACE THE ELEGANCE OF PERSONAL STYLE\nAND EXCEPTIONAL ARTISTRY'}
                </Text>
            </group>
        </>
    )
}

export default App
