import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { configStages, useAppStore } from '../../store/store'

export const ProductRotator = ({ meshRef }) => {
    const configStage = useAppStore((state) => state.configStage)
    console.log('configStage', configStage)

    const friction = 0.95
    const sensitivity = 0.0035

    const isDraggingRef = useRef(false)
    const previousPointerPositionRef = useRef({ x: 0, y: 0 })
    const rotationVelocityRef = useRef({ x: 0, y: 0 })

    const autoRotateYAmount = configStage == configStages.tryon.name ? 0 : 0.002

    const onPointerDown = (e) => {
        const { clientX, clientY } = e.touches ? e.touches[0] : e
        previousPointerPositionRef.current = { x: clientX, y: clientY }
        isDraggingRef.current = true
        document.body.style.cursor = 'grabbing'
    }

    const onPointerMove = (e) => {
        if (isDraggingRef.current) {
            const { clientX, clientY } = e.touches ? e.touches[0] : e
            const deltaX = clientX - previousPointerPositionRef.current.x
            const deltaY = clientY - previousPointerPositionRef.current.y

            rotationVelocityRef.current = {
                x: deltaY * sensitivity,
                y: deltaX * sensitivity,
            }

            previousPointerPositionRef.current = { x: clientX, y: clientY }
        }
    }

    const onPointerUp = () => {
        isDraggingRef.current = false
        document.body.style.cursor = 'grab'
    }

    useEffect(() => {
        window.addEventListener('mousedown', onPointerDown)
        window.addEventListener('mousemove', onPointerMove)
        window.addEventListener('mouseup', onPointerUp)
        window.addEventListener('touchstart', onPointerDown)
        window.addEventListener('touchmove', onPointerMove)
        window.addEventListener('touchend', onPointerUp)

        return () => {
            window.removeEventListener('mousedown', onPointerDown)
            window.removeEventListener('mousemove', onPointerMove)
            window.removeEventListener('mouseup', onPointerUp)
            window.removeEventListener('touchstart', onPointerDown)
            window.removeEventListener('touchmove', onPointerMove)
            window.removeEventListener('touchend', onPointerUp)
        }
    }, [])

    useFrame(() => {
        if (meshRef.current) {
            if (isDraggingRef.current) {
                meshRef.current.rotation.x += rotationVelocityRef.current.x
                meshRef.current.rotation.y += rotationVelocityRef.current.y
            } else {
                meshRef.current.rotation.y +=
                    rotationVelocityRef.current.y + autoRotateYAmount
                meshRef.current.rotation.x += rotationVelocityRef.current.x
            }

            rotationVelocityRef.current = {
                x: rotationVelocityRef.current.x * friction,
                y: rotationVelocityRef.current.y * friction,
            }
        }
    })

    return null
}
