import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { RGBELoader } from 'three/examples/jsm/Addons.js'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { MeshRefractionMaterial, useGLTF, useScroll } from '@react-three/drei'
import gsap from 'gsap'

import { randomNumberWithinRange } from '../../utilities/randomNumberWithinRange'
import { checkIsMobile } from '../../utilities/checkIsMobile'
import { getScreenEdgesInWorldCoordinates } from '../../utilities/getScreenEdgesInWorldCoordinates'

export const RainingDiamonds = () => {
    //
    //
    // Global state:

    const three = useThree()
    const scrollData = useScroll()
    const isMobile = checkIsMobile()

    //
    //
    // Local state:

    const [positions, setPositions] = useState([])
    const [isFallingdDiamondsActive, setIsFallingdDiamondsActive] =
        useState(true)

    //
    //
    // Local init:

    const diamondsRef = useRef()
    const diamondsCurtainRef = useRef()

    const { nodes } = useGLTF('/diamond.glb')

    const screenTo3DCoordinates = useMemo(
        () => getScreenEdgesInWorldCoordinates(three.camera, -7),
        [],
    )

    const settings = {
        diamondCount: isMobile ? 10 : 20,

        xLeft: screenTo3DCoordinates.left - 10,
        xRight: screenTo3DCoordinates.right + 10,
        yTopMin: screenTo3DCoordinates.top + 5,
        yTopMax: screenTo3DCoordinates.top + 15,
        yBottom: screenTo3DCoordinates.bottom - 5,
        zFront: -7,
        zBack: -10,

        fallSpeedMin: 2,
        fallSpeedMax: 3,

        scaleMin: 0.2,
        scaleMax: 1.5,

        diamondOpacity: 0.5,
        mobileDiamondColor: 'hsl(45, 80%, 78%)',
        desktopDiamondColor: 'hsl(48, 100%, 65%)',

        curtainColor: 'hsl(54, 50%, 72%)',
        curtainOpacity: isMobile ? 0 : 0.66,

        fallingDiamondsTriggerEndPosition: 0.61,
    }

    // Diamond material setup:
    const diamondHDR = useLoader(RGBELoader, '/brown_photostudio_03_1k.hdr')
    const optimisedMaterial = isMobile ? (
        <meshStandardMaterial color={settings.mobileDiamondColor} />
    ) : (
        <MeshRefractionMaterial
            envMap={diamondHDR}
            bounces={3}
            aberrationStrength={0.01}
            ior={2.75}
            fresnel={1}
            color={settings.desktopDiamondColor}
            toneMapped={false}
        />
    )

    //
    //
    // Effects:

    useEffect(() => {
        const initialPositions = []
        for (let i = 0; i < settings.diamondCount; i++) {
            const randomScale = randomNumberWithinRange(
                settings.scaleMin,
                settings.scaleMax,
            )
            initialPositions.push({
                x: randomNumberWithinRange(settings.xLeft, settings.xRight),
                y: randomNumberWithinRange(settings.yBottom, settings.yTopMax),
                z: randomNumberWithinRange(settings.zFront, settings.zBack),
                rotation: Math.random() * Math.PI * 2,
                // rotationSpeed: Math.random() * 0.1 - 0.05,
                // rotationSpeed: 0.5,
                fallSpeed: randomNumberWithinRange(
                    settings.fallSpeedMin,
                    settings.fallSpeedMax,
                ),
                scale: [randomScale, randomScale, randomScale],
            })
        }
        setPositions(initialPositions)
    }, [settings.diamondCount])

    useEffect(() => {
        if (diamondsRef.current && positions.length) {
            positions.forEach((pos, i) => {
                const matrix = new THREE.Matrix4()
                matrix.compose(
                    new THREE.Vector3(pos.x, pos.y, pos.z),
                    new THREE.Quaternion().setFromEuler(
                        new THREE.Euler(0, pos.rotation, pos.rotation),
                    ),
                    new THREE.Vector3(...pos.scale),
                )
                diamondsRef.current.setMatrixAt(i, matrix)
            })
            diamondsRef.current.instanceMatrix.needsUpdate = true
        }
    }, [positions])

    useEffect(() => {
        // move curtain back to proper position
        // I moved it forward to cover the split second where the original diamond flashes
        // on screen before it gets instanced, so the curtain is acting as a cover for that too
        setTimeout(() => {
            diamondsCurtainRef.current.position.z = -5
        }, 100)
    }, [])

    useEffect(() => {
        if (isFallingdDiamondsActive == false) {
            gsap.to(diamondsCurtainRef.current.material, {
                duration: 2,
                opacity: 0,
                ease: 'power1.inOut',
            })
            gsap.to(diamondsCurtainRef.current.position, {
                duration: 2,
                y: -20,
                ease: 'power1.inOut',
            })
        } else {
            gsap.to(diamondsCurtainRef.current.material, {
                duration: 2,
                opacity: settings.curtainOpacity,
                ease: 'power1.inOut',
            })
            gsap.to(diamondsCurtainRef.current.position, {
                duration: 2,
                y: 0,
                ease: 'power1.inOut',
            })
        }
    }, [isFallingdDiamondsActive])

    //
    //
    // Render Loop:

    useFrame((state, delta) => {
        //
        // manage scroll trigger point to remove diamonds from the screen

        if (scrollData.offset > settings.fallingDiamondsTriggerEndPosition)
            setIsFallingdDiamondsActive(false)
        else setIsFallingdDiamondsActive(true)

        // re-position falling diamonds:

        positions.forEach((pos, i) => {
            pos.y -=
                delta *
                (isFallingdDiamondsActive ? pos.fallSpeed : pos.fallSpeed * 4)
            pos.x -= delta * (pos.fallSpeed / 2)

            if (pos.y < settings.yBottom && isFallingdDiamondsActive) {
                pos.x = randomNumberWithinRange(settings.xLeft, settings.xRight)
                pos.y = randomNumberWithinRange(
                    settings.yTopMin,
                    settings.yTopMax,
                )
                pos.z = randomNumberWithinRange(settings.zFront, settings.zBack)
            }
            pos.rotation += pos.fallSpeed * 0.35 * delta

            const matrix = new THREE.Matrix4()
            matrix.compose(
                new THREE.Vector3(pos.x, pos.y, pos.z),
                new THREE.Quaternion().setFromEuler(
                    new THREE.Euler(pos.rotation, pos.rotation, 0),
                ),
                new THREE.Vector3(...pos.scale),
            )
            diamondsRef.current.setMatrixAt(i, matrix)
        })
        diamondsRef.current.instanceMatrix.needsUpdate = true
    })

    return (
        <>
            <instancedMesh
                ref={diamondsRef}
                args={[null, null, settings.diamondCount]}
                geometry={nodes.Diamond_1_0.geometry}
            >
                {optimisedMaterial}
            </instancedMesh>

            <mesh ref={diamondsCurtainRef} position={[0, 0, 1]}>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial
                    color={settings.curtainColor}
                    transparent={true}
                    opacity={1}
                />
            </mesh>
        </>
    )
}
