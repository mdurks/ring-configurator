import { degToRad } from 'three/src/math/MathUtils.js'
import { storeActions } from '../store/store'

export const introAnimation = (
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
) => {
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
            x: isMobile ? 0 : 2.3,
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
        introTitle1Ref.current.position,
        {
            delay: 2.85,
            duration: 2.5,
            x: introTitle1Positions.xEnd,
            ease: 'power1.inOut',
        },
        'pre animation setup',
    )
    tl_intro.current.to(
        introScrollMsgRef.current.position,
        {
            delay: isMobile ? 4.25 : 5,
            duration: 1.5,
            y: introScrollMsgPositions.yEnd,
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
            duration: isMobile ? 4 : 8,
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
            duration: isMobile ? 4 : 8,
            x: 1.41,
            y: 0.82,
            z: -0.35,
            ease: 'power1.inOut',
        },
        'ready for scrolling',
    )
    tl_intro.current.to(
        introTitle1Ref.current.position,
        {
            duration: isMobile ? 2 : 4,
            x: introTitle1Positions.xStart,
            ease: 'power1.inOut',
        },
        'ready for scrolling',
    )
    tl_intro.current.to(
        introTitle2Ref.current.position,
        {
            delay: isMobile ? 1 : 3,
            duration: isMobile ? 3.5 : 7,
            x: introTitle2Positions.xEnd,
            ease: 'power1.inOut',
        },
        'ready for scrolling',
    )

    // add empty time:
    tl_intro.current.to({}, { duration: isMobile ? 0 : 1 })

    //
    //
    //
    //
    //
    tl_intro.current.addLabel('message three')

    tl_intro.current.to(
        introTitle2Ref.current.position,
        {
            delay: isMobile ? 0.25 : 1,
            duration: isMobile ? 4 : 10,
            x: introTitle2Positions.xStart,
            ease: 'power1.inOut',
        },
        'message three',
    )
    tl_intro.current.to(
        introTitle3Ref.current.position,
        {
            delay: isMobile ? 2 : 4,
            duration: isMobile ? 2.5 : 5,
            y: introTitle3Positions.yEnd,
            ease: 'power1.inOut',
        },
        'message three',
    )
    tl_intro.current.to(
        ringRef.current.position,
        {
            duration: isMobile ? 5 : 10,
            x: isMobile ? 0.25 : 0,
            y: -3.25,
            z: isMobile ? -3.5 : -2.1,
            ease: 'power1.inOut',
        },
        'message three',
    )
    tl_intro.current.to(
        ringRef.current.rotation,
        {
            duration: isMobile ? 5 : 10,
            x: 0.82,
            y: isMobile ? 6.8 : 6.32,
            z: 0,
            ease: 'power1.inOut',
        },
        'message three',
    )

    // add empty time:
    tl_intro.current.to(
        {},
        {
            duration: isMobile ? 0.5 : 1,
            onComplete: () => {
                console.log('lkj')
                cloudsLower.visible = true
                cloudsUpper.visible = true
            },
        },
    )

    //
    //
    //
    //
    //
    tl_intro.current.addLabel('down to gazebo')

    tl_intro.current.to(
        '.skyGradient',
        {
            duration: isMobile ? 2.5 : 5,
            opacity: 1,
            ease: 'power1.inOut',
        },
        'down to gazebo',
    )
    tl_intro.current.to(
        introTitle3Ref.current.position,
        {
            duration: isMobile ? 2 : 4,
            y: introTitle3Positions.yStart,
            ease: 'power1.inOut',
        },
        'down to gazebo',
    )
    tl_intro.current.to(
        groupGazeboRef.current.position,
        {
            duration: isMobile ? 6 : 12.25,
            y: gazeboFinalPosition.y,
            ease: 'power1.inOut',
        },
        'down to gazebo',
    )
    tl_intro.current.to(
        groupGazeboRef.current.rotation,
        {
            duration: isMobile ? 7 : 14,
            x: 0,
            y: 0,
            z: 0,
            ease: 'power1.inOut',
        },
        'down to gazebo',
    )
    tl_intro.current.to(
        groupGazeboRef.current.position,
        {
            delay: isMobile ? 4.5 : 9.25,
            duration: isMobile ? 2.5 : 5,
            z: gazeboFinalPosition.z,
            ease: 'power1.inOut',
        },
        'down to gazebo',
    )
    tl_intro.current.to(
        ringRef.current.position,
        {
            duration: isMobile ? 2.5 : 5,
            y: 2,
            z: -35,
            ease: 'power1.inOut',
        },
        'down to gazebo',
    )
    tl_intro.current.to(
        ringRef.current.position,
        {
            delay: isMobile ? 2.5 : 5.1,
            duration: isMobile ? 4.5 : 9.25,
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
            duration: isMobile ? 7 : 12,
            y: degToRad(720),
            ease: 'power1.inOut',
        },
        'down to gazebo',
    )
    tl_intro.current.to(
        ringRef.current.scale,
        {
            delay: isMobile ? 2 : 4,
            duration: isMobile ? 4 : 8,
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
            delay: isMobile ? 1.5 : 3,
            duration: isMobile ? 2.5 : 5,
            opacity: 1,
            ease: 'power1.inOut',
        },
        'down to gazebo',
    )
    tl_intro.current.to(
        introPlaneMask.material,
        {
            duration: isMobile ? 2 : 4,
            opacity: 0,
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
        introPlaneMask.visible = false
    })
}
