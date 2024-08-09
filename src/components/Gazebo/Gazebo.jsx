import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Stars, useGLTF } from '@react-three/drei'
import gsap from 'gsap'

import { degToRad } from 'three/src/math/MathUtils.js'
import { checkIsMobile } from '../../utilities/checkIsMobile'

import {
    configStages,
    defaultRingData,
    storeActions,
    useAppStore,
} from '../../store/store'

import { Carousel } from '../Carousel/Carousel'
import { TryItonUI } from '../TryItonUI/TryItonUI'

export const Gazebo = ({ groupGazeboRef, ringRef, gazeboFloorRef }) => {
    //
    //
    // Global state:
    const configStage = useAppStore((state) => state.configStage)
    const isIntroActive = useAppStore((state) => state.isIntroActive)
    const isMobile = checkIsMobile()

    //
    //
    // Local init:
    const useGazeeboModel = true

    // const tableModel = useGLTF('/ClassicConsole_01_1k.glb')
    const tableModel = useGLTF('/ClassicConsole_01_2k.glb')
    // console.log('tableModel', tableModel)
    const gazeeboModel = useGLTF('/Gazeebo.glb')
    // console.log('gazeeboModel', gazeeboModel)

    // const hemisphereGeometry = new THREE.SphereGeometry(
    //     3, // radius
    //     16, // widthSegments
    //     16, // heightSegments
    //     0,
    //     Math.PI * 2,
    //     0,
    //     Math.PI / 2,
    // )

    const gemData = [
        { value: 'hsl(211, 100%, 62%)', label: 'blue diamond' },
        { value: 'hsl(195, 100%, 82%)', label: 'Aquamarine' },
        { value: 'hsl(0, 0%, 100%)', label: 'white diamond' },
        { value: 'hsl(0, 0%, 27%)', label: 'Black diamond' },
        { value: 'hsl(180, 100%, 28%)', label: 'Alexandrite' },
        { value: 'hsl(120, 100%, 25%)', label: 'Emerald' },
        { value: 'hsl(96, 65%, 60%)', label: 'Peridot' },
        { value: 'hsl(54, 100%, 74%)', label: 'yellow diamond' },
        { value: 'hsl(54, 100%, 50%)', label: 'sphalerite' },
        { value: 'hsl(38, 100%, 50%)', label: 'Citrine' },
        { value: 'hsl(0, 81%, 43%)', label: 'red garnet' },
        { value: 'hsl(0, 59%, 40%)', label: 'Ruby' },
        { value: 'hsl(349, 100%, 87%)', label: 'pink diamond' },
        { value: 'hsl(300, 76%, 72%)', label: 'Rubellite' },
        { value: 'hsl(243, 100%, 68%)', label: 'Tanzanite' },
        { value: 'hsl(235, 100%, 35%)', label: 'Blue sapphire' },
    ]
    const ringData = [
        defaultRingData,
        {
            value: '/FlowerRing.glb',
            meshName: 'Flower_ring',
            label: 'Flower Ring',
        },
        {
            value: '/Ring - Simple Oval Center.glb',
            meshName: 'RingSimpleOvalCenter',
            label: 'Clasic Oval Ring',
        },
        {
            value: '/RingKnot.glb',
            meshName: 'RingKnot',
            label: 'Interwoven Ring',
        },
        {
            value: '/RingOvalCenterAndShoulders.glb',
            meshName: 'RingOvalCenterAndShoulders',
            label: 'Oval shoulders Ring',
        },
        {
            value: '/HaloRing.glb',
            meshName: 'Ring',
            label: 'Halo Ring',
        },
    ]
    const metalData = [
        { value: 'hsl(39, 100%, 87%)', roughness: 0, label: 'Yellow Gold' },
        { value: 'hsl(0, 0%, 100%)', roughness: 0, label: 'White Gold' },
        { value: 'hsl(0, 0%, 90%)', roughness: 0, label: 'Silver' },
        { value: 'hsl(0, 0%, 85%)', roughness: 0, label: 'Platinum' },
        { value: 'hsl(0, 0%, 65%)', roughness: 0.3, label: 'Titanium' },
        { value: 'hsl(0, 0%, 30%)', roughness: 0.8, label: 'Tungston' },
        { value: 'hsl(11, 54%, 82%)', roughness: 0, label: 'Rose Gold' },
    ]

    const cloudsLower = useRef()
    const cloudsUpper = useRef()

    useEffect(() => {
        if (isIntroActive) return

        // table button clicked, so rotate the gazebo to the right table
        gsap.to(groupGazeboRef.current.rotation, {
            duration: 1.5,
            y: configStages[configStage].yRotationPos,
            ease: 'power1.inOut',
            onComplete: () =>
                storeActions.setConfigAnimationComplete(configStage),
        })
    }, [configStage])

    useEffect(() => {
        gazeeboModel.scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true
                child.receiveShadow = true
            }
        })

        const reMaterialiseMountains = [
            { name: 'Mountains01', color: 'hsl(45, 70%, 80%)' },
            { name: 'Mountains02', color: 'hsl(45, 55%, 70%)' },
            { name: 'Mountains03', color: 'hsl(45, 40%, 65%)' },
        ]
        reMaterialiseMountains.forEach(
            (mountain) =>
                (gazeeboModel.scene.getObjectByName(mountain.name).material =
                    new THREE.MeshBasicMaterial({
                        color: mountain.color,
                    })),
        )

        const introPlaneMask =
            gazeeboModel.scene.getObjectByName('IntroPlaneMask')
        introPlaneMask.material.transparent = true
        introPlaneMask.material.color = new THREE.Color('hsl(54, 50%, 62%)')

        cloudsLower.current = gazeeboModel.scene.getObjectByName('CloudsLower')
        cloudsLower.current.material = new THREE.MeshBasicMaterial({
            color: new THREE.Color('hsl(25, 100%, 77%)'),
            transparent: true,
            opacity: 0.5,
        })

        cloudsUpper.current = gazeeboModel.scene.getObjectByName('CloudsUpper')
        cloudsUpper.current.material = new THREE.MeshBasicMaterial({
            color: new THREE.Color('hsl(25, 100%, 77%)'),
            transparent: true,
            opacity: 0.3,
        })
    }, [gazeeboModel])

    useFrame(() => {
        if (cloudsLower.current) cloudsLower.current.rotation.y += 0.000085
        if (cloudsUpper.current) cloudsUpper.current.rotation.y -= 0.0001
    })

    return (
        <>
            <group ref={groupGazeboRef} name="Gazebo" visible={true}>
                <Carousel
                    carouselName={configStages.gemColor.name}
                    data={gemData}
                    radius={configStages.gemColor.carouselRadius}
                    meshScale={configStages.gemColor.carouselMeshScale}
                />
                <Carousel
                    carouselName={configStages.ring.name}
                    data={ringData}
                    radius={configStages.ring.carouselRadius}
                    meshScale={configStages.ring.carouselMeshScale}
                />
                <Carousel
                    carouselName={configStages.metal.name}
                    data={metalData}
                    radius={isMobile ? 0.35 : 0.45}
                />

                <Stars
                    radius={250}
                    depth={50}
                    count={1500}
                    factor={5}
                    saturation={0}
                    fade
                    speed={1}
                />

                <TryItonUI ringRef={ringRef} />

                <group rotation={[0, degToRad(45), 0]}>
                    {/* Gazeebo model: */}
                    <primitive
                        object={gazeeboModel.scene}
                        position={Object.values(gazeeboModel.scene.position)}
                        receiveShadow
                        castShadow
                        visble={useGazeeboModel}
                    />

                    {/* Tables: */}
                    <group>
                        <mesh
                            name="table_front_left"
                            position={[-1.28, 0.1, 1.28]}
                            rotation={[0, degToRad(-45), 0]}
                            scale={[1.7, 1.35, 1.9]}
                            geometry={
                                tableModel.nodes.ClassicConsole_01.geometry
                            }
                            material={tableModel.materials.ClassicConsole_01}
                            castShadow
                            receiveShadow
                        >
                            {/* <meshPhysicalMaterial
                            envMapIntensity={0.5}
                            metalness={0.5}
                            roughnes={0.5}
                            map={tableModel.materials.ClassicConsole_01.map}
                            metalnessMap={
                                tableModel.nodes.ClassicConsole_01.material
                                    .metalnessMap
                            }
                            normalMap={
                                tableModel.nodes.ClassicConsole_01.material
                                    .normalMap
                            }
                            roughnessMap={
                                tableModel.materials.ClassicConsole_01
                                    .roughnessMap
                            }
                        /> */}
                        </mesh>
                        <mesh
                            name="table_front_right"
                            position={[1.28, 0.1, 1.28]}
                            rotation={[0, degToRad(45), 0]}
                            scale={[1.7, 1.35, 1.9]}
                            geometry={
                                tableModel.nodes.ClassicConsole_01.geometry
                            }
                            material={tableModel.materials.ClassicConsole_01}
                            castShadow
                            receiveShadow
                        />
                        <mesh
                            name="table_back_right"
                            position={[1.28, 0.1, -1.28]}
                            rotation={[0, degToRad(135), 0]}
                            scale={[1.7, 1.35, 1.9]}
                            geometry={
                                tableModel.nodes.ClassicConsole_01.geometry
                            }
                            material={tableModel.materials.ClassicConsole_01}
                            castShadow
                            receiveShadow
                        />
                        <mesh
                            name="table_back_left"
                            position={[-1.28, 0.1, -1.28]}
                            rotation={[0, degToRad(-135), 0]}
                            scale={[1.7, 1.35, 1.9]}
                            geometry={
                                tableModel.nodes.ClassicConsole_01.geometry
                            }
                            material={tableModel.materials.ClassicConsole_01}
                            castShadow
                            receiveShadow
                        />
                    </group>

                    {/* Mock Gazeebo: */}
                    {/* <group visible={!useGazeeboModel}>
                        <mesh
                            name="gazebo_dome"
                            position={[0, 5.1, 0]}
                            geometry={hemisphereGeometry}
                            receiveShadow
                            castShadow
                        >
                            <meshStandardMaterial color={'grey'} />
                        </mesh>
                        <mesh
                            name="gazebo_roof"
                            position={[0, 5.1, 0]}
                            receiveShadow
                            castShadow
                        >
                            <cylinderGeometry args={[3.5, 3.5, 0.25, 50]} />
                            <meshStandardMaterial />
                        </mesh>
                        <mesh
                            name="gazebo_pillar_top"
                            position={[0, 2.5, -3]}
                            receiveShadow
                            castShadow
                        >
                            <cylinderGeometry args={[0.25, 0.25, 5, 10]} />
                            <meshStandardMaterial color={'grey'} />
                        </mesh>
                        <mesh
                            name="gazebo_pillar_bottom"
                            position={[0, 2.5, 3]}
                            receiveShadow
                            castShadow
                        >
                            <cylinderGeometry args={[0.25, 0.25, 5, 10]} />
                            <meshStandardMaterial color={'grey'} />
                        </mesh>
                        <mesh
                            name="gazebo_pillar_right"
                            position={[3, 2.5, 0]}
                            receiveShadow
                            castShadow
                        >
                            <cylinderGeometry args={[0.25, 0.25, 5, 10]} />
                            <meshStandardMaterial color={'grey'} />
                        </mesh>
                        <mesh
                            name="gazebo_pillar_left"
                            position={[-3, 2.5, 0]}
                            receiveShadow
                            castShadow
                        >
                            <cylinderGeometry args={[0.25, 0.25, 5, 10]} />
                            <meshStandardMaterial color={'grey'} />
                        </mesh>
                        <mesh name="gazebo_floor" receiveShadow castShadow>
                            <cylinderGeometry args={[3.5, 3.5, 0.25, 50]} />
                            <meshStandardMaterial color={'grey'} />
                        </mesh>
                    </group> */}
                </group>

                <mesh
                    ref={gazeboFloorRef}
                    name="floor"
                    position={[0, -1, 0]}
                    rotation={[degToRad(-90), 0, 0]}
                    receiveShadow
                    visible={false}
                >
                    <planeGeometry args={[1000, 1000]} />
                    {/* <meshStandardMaterial color={'black'} /> */}
                    {/* <meshStandardMaterial color={'hsl(54, 24%, 41%)'} /> */}
                    {/* <meshStandardMaterial color={'hsl(55, 30%, 23%)'} /> */}
                    <meshStandardMaterial
                        color={'hsl(50, 40%, 36%)'}
                        transparent
                        opacity={0}
                    />
                </mesh>

                <mesh
                    name="floor"
                    position={[0, -0.5, 0]}
                    rotation={[degToRad(-90), 0, 0]}
                    receiveShadow
                    visible={false}
                >
                    <planeGeometry args={[1000, 1000]} />
                    <meshStandardMaterial color={'hsl(50, 40%, 36%)'} />
                </mesh>
            </group>
        </>
    )
}
