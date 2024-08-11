import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { configStages, storeActions, useAppStore } from '../../store/store'
import { checkIsMobile } from '../../utilities/checkIsMobile'

export const ProductRotator = ({ meshRef }) => {
    const configStage = useAppStore((state) => state.configStage)
    const isMobile = checkIsMobile()

    const isDraggingRef = useRef(false)
    const previousPointerPositionRef = useRef({ x: 0, y: 0 })
    const rotationVelocityRef = useRef({ x: 0, y: 0 })
    const friction = 0.95

    let sensitivity
    let autoRotateYAmount = 0

    if (isMobile) {
        sensitivity = 0.01
        if (configStage != configStages.tryon.name) autoRotateYAmount = 0.005
    } else {
        sensitivity = 0.0035
        if (configStage != configStages.tryon.name) autoRotateYAmount = 0.0015
    }

    const onPointerDown = (e) => {
        if (configStage == configStages.tryon.name) return
        if (e.srcElement != '[object HTMLDivElement]') return

        storeActions.setIsPointerDown(true)

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
        storeActions.setIsPointerDown(false)
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
        if (meshRef.current && configStage != configStages.tryon.name) {
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

    // const isDragging = useRef(false)
    // const rotation = useRef({ x: 0, y: 0 })
    // const velocity = useRef({ x: 0, y: 0 })
    // const ampingFactor = 0.95

    // const handleMouseMove = (e) => {
    //     if (isDragging.current) {
    //         rotation.current.x += e.movementY * 0.01
    //         rotation.current.y += e.movementX * 0.01
    //         velocity.current = {
    //             x: e.movementY * 0.01,
    //             y: e.movementX * 0.01,
    //         }
    //     }
    // }

    // const handleTouchMove = (e) => {
    //     if (isDragging.current) {
    //         const touch = e.touches[0]
    //         const touchX = touch.clientX
    //         const touchY = touch.clientY
    //         const movementX = touchX - (rotation.current.lastTouchX || touchX)
    //         const movementY = touchY - (rotation.current.lastTouchY || touchY)
    //         rotation.current.x += movementY * 0.01
    //         rotation.current.y += movementX * 0.01
    //         velocity.current = { x: movementY * 0.01, y: movementX * 0.01 }
    //         rotation.current.lastTouchX = touchX
    //         rotation.current.lastTouchY = touchY
    //     }
    // }

    // useEffect(() => {
    //     const handleMouseDown = () => (isDragging.current = true)
    //     const handleMouseUp = () => (isDragging.current = false)
    //     const handleTouchStart = () => (isDragging.current = true)
    //     const handleTouchEnd = () => {
    //         isDragging.current = false
    //         delete rotation.current.lastTouchX
    //         delete rotation.current.lastTouchY
    //     }

    //     window.addEventListener('mousemove', handleMouseMove)
    //     window.addEventListener('mousedown', handleMouseDown)
    //     window.addEventListener('mouseup', handleMouseUp)
    //     window.addEventListener('touchmove', handleTouchMove)
    //     window.addEventListener('touchstart', handleTouchStart)
    //     window.addEventListener('touchend', handleTouchEnd)

    //     return () => {
    //         window.removeEventListener('mousemove', handleMouseMove)
    //         window.removeEventListener('mousedown', handleMouseDown)
    //         window.removeEventListener('mouseup', handleMouseUp)
    //         window.removeEventListener('touchmove', handleTouchMove)
    //         window.removeEventListener('touchstart', handleTouchStart)
    //         window.removeEventListener('touchend', handleTouchEnd)
    //     }
    // }, [])

    // useFrame(() => {
    //     if (meshRef.current) {
    //         meshRef.current.rotation.x = rotation.current.x
    //         meshRef.current.rotation.y = rotation.current.y

    //         if (!isDragging.current) {
    //             rotation.current.x += velocity.current.x
    //             rotation.current.y += velocity.current.y
    //             velocity.current.x *= dampingFactor // Apply damping factor for inertia
    //             velocity.current.y *= dampingFactor
    //         }
    //     }
    // })
}
