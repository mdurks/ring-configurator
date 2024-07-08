import gsap from 'gsap'
import { configStages } from '../../store/store'

export const tryItOnAnimationsDesktop = (
    configStage,
    setIsTryonStage,
    messageRef,
    messageXRef,
    phoneRef,
    ringRef,
    orientationsDesktop,
    isTryonStage,
    ringDefaultState,
) => {
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
