import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useAppStore } from '../../store/store'
import { isMobile } from '../../utilities/isMobile'

export const CameraController = ({ camera }) => {
    const isPointerDown = useAppStore((state) => state.isPointerDown)
    const checkMobile = isMobile()

    const mouse = useRef({ x: 0, y: 0 })
    const target = useRef({ x: 0, y: 0 })
    const inertia = 0.075
    const moveAmount = 0.03

    useEffect(() => {
        const handleMouseMove = (event) => {
            const { clientX, clientY } = event
            const { innerWidth, innerHeight } = window

            // Normalize mouse position to [-0.5, 0.5]
            mouse.current.x = clientX / innerWidth - 0.5
            mouse.current.y = clientY / innerHeight - 0.5
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    useFrame(() => {
        if (isPointerDown || checkMobile) return

        // Smoothly interpolate target position
        target.current.x += (mouse.current.x - target.current.x) * inertia
        target.current.y += (mouse.current.y - target.current.y) * inertia

        // Update camera rotation or position
        camera.rotation.y = -target.current.x * Math.PI * moveAmount
        camera.rotation.x = -target.current.y * Math.PI * moveAmount
    })

    return null
}
