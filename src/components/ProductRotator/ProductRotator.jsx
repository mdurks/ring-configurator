import { useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useCursor } from '@react-three/drei'
import { useAppStore } from '../../store/store'

export const ProductRotator = ({ meshRef }) => {
    //
    //
    // Global State:

    //
    //
    // Global functions:

    //
    //
    // Local init:

    const friction = 0.95
    const sensitivity = 0.0035
    const pointerInitialState = {
        x: 0,
        y: 0,
    }

    const [isDragging, setIsDragging] = useState(false)
    const [previousPointerPosition, setPreviousPointerPosition] =
        useState(pointerInitialState)
    const [rotationVelocity, setRotationVelocity] =
        useState(pointerInitialState)

    //
    //
    // Local functions:

    useCursor(isDragging, 'grabbing', 'grab')

    const onPointerDown = (e) => {
        setIsDragging(true)
        const { clientX, clientY } = e.touches ? e.touches[0] : e
        setPreviousPointerPosition({ x: clientX, y: clientY })
    }

    const onPointerMove = (e) => {
        if (isDragging) {
            const { clientX, clientY } = e.touches ? e.touches[0] : e
            const deltaX = clientX - previousPointerPosition.x
            const deltaY = clientY - previousPointerPosition.y

            setRotationVelocity({
                x: deltaY * sensitivity,
                y: deltaX * sensitivity,
            })

            setPreviousPointerPosition({ x: clientX, y: clientY })
        }
    }

    const onPointerUp = () => {
        setIsDragging(false)
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
    }, [isDragging, previousPointerPosition])

    useFrame(() => {
        if (isDragging) {
            meshRef.current.rotation.x += rotationVelocity.x
            meshRef.current.rotation.y += rotationVelocity.y
        } else meshRef.current.rotation.y += 0.0015

        setRotationVelocity({
            x: rotationVelocity.x * friction,
            y: rotationVelocity.y * friction,
        })
    })
}
