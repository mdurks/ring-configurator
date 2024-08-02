import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useAppStore, zoomSettings } from '../../store/store'
import { checkIsMobile } from '../../utilities/checkIsMobile'
import gsap from 'gsap'

export const CameraController = ({ camera, inertia, moveAmount }) => {
    const three = useThree()
    const isPointerDown = useAppStore((state) => state.isPointerDown)
    const isIntroActive = useAppStore((state) => state.isIntroActive)
    const isMobile = checkIsMobile()

    const mouse = useRef({ x: 0, y: 0 })
    const target = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e
            const { innerWidth, innerHeight } = window

            // Normalize mouse position to [-0.5, 0.5]
            mouse.current.x = clientX / innerWidth - 0.5
            mouse.current.y = clientY / innerHeight - 0.5
        }

        const handleMouseWheel = (e) => {
            if (isIntroActive) return

            const direction = Math.sign(e.deltaY)
            const cameraZPos = three.camera.position.z

            const newZPos =
                direction < 0
                    ? Math.max(cameraZPos - zoomSettings.step, zoomSettings.min)
                    : Math.min(cameraZPos + zoomSettings.step, zoomSettings.max)

            gsap.to(three.camera.position, {
                z: newZPos,
                duration: zoomSettings.speed,
                ease: 'power1.out',
            })
        }

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('wheel', handleMouseWheel)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('wheel', handleMouseWheel)
        }
    }, [isIntroActive])

    useFrame(() => {
        if (isPointerDown || isMobile) return

        // Smoothly interpolate target position
        target.current.x += (mouse.current.x - target.current.x) * inertia
        target.current.y += (mouse.current.y - target.current.y) * inertia

        // Update camera rotation or position
        camera.rotation.y = -target.current.x * Math.PI * moveAmount
        camera.rotation.x = -target.current.y * Math.PI * moveAmount
    })

    return null
}
