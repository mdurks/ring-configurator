import { useEffect } from 'react'
import * as THREE from 'three'
import { Html, Stars, useGLTF } from '@react-three/drei'
import gsap from 'gsap'

import { degToRad } from 'three/src/math/MathUtils.js'
import { isMobile } from '../../utilities/isMobile'

import { configStages, defaultRingData, useAppStore } from '../../store/store'

import { Carousel } from '../Carousel/Carousel'
import { TryItonUI } from '../TryItonUI/TryItonUI'

export const Gazebo = ({ groupGazeboRef, ringRef }) => {
    //
    //
    // Global state:
    const configStage = useAppStore((state) => state.configStage)

    //
    //
    // Local init:

    // const tableModel = useGLTF('/ClassicConsole_01_1k.glb')
    const tableModel = useGLTF('/ClassicConsole_01_2k.glb')
    // console.log('tableModel', tableModel)

    const hemisphereGeometry = new THREE.SphereGeometry(
        3, // radius
        16, // widthSegments
        16, // heightSegments
        0,
        Math.PI * 2,
        0,
        Math.PI / 2,
    )

    const gemData = [
        { value: '#419aff', label: 'Sky blue' },
        { value: '#bcedff', label: 'Light blue' },
        { value: 'white', label: 'white' },
        { value: '#474747', label: 'Black' },
        { value: 'teal', label: 'teal' },
        { value: 'green', label: 'green' },
        { value: 'lime', label: 'lime' },
        { value: '#fff27d', label: 'Light yellow' },
        { value: 'yellow', label: 'yellow' },
        { value: 'orange', label: 'orange' },
        { value: 'red', label: 'red' },
        { value: 'brown', label: 'brown' },
        { value: 'pink', label: 'pink' },
        { value: 'violet', label: 'violet' },
        { value: 'purple', label: 'purple' },
        { value: 'navy', label: 'navy' },
        { value: 'blue', label: 'blue' },
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
            label: 'Clasic Oval',
        },
        {
            value: '/RingKnot.glb',
            meshName: 'RingKnot',
            label: 'Knot',
        },
        {
            value: '/RingOvalCenterAndShoulders.glb',
            meshName: 'RingOvalCenterAndShoulders',
            label: 'Oval and shoulders',
        },
    ]
    const metalData = [
        { value: 'hsl(0, 0%, 100%)', label: 'white' },
        { value: 'hsl(0, 0%, 90%)', label: 'light gray' },
        { value: 'hsl(0, 0%, 75%)', label: 'gray' },
        { value: 'hsl(0, 0%, 50%)', label: 'black' },
        { value: 'hsl(39, 100%, 87%)', label: 'gold' },
        { value: 'hsl(11, 54%, 83%)', label: 'rose gold' },
    ]

    useEffect(() => {
        // table button clicked, so rotate the gazebo to the right table
        gsap.to(groupGazeboRef.current.rotation, {
            duration: 1.5,
            y: configStages[configStage].yRotationPos,
            ease: 'power1.inOut',
        })
    }, [configStage])

    return (
        <>
            <group ref={groupGazeboRef} name="Gazebo" visible={true}>
                <Carousel
                    carouselName={configStages.gemColor.name}
                    data={gemData}
                    radius={isMobile() ? 0.5 : 0.6}
                    meshScale={0.07}
                />
                <Carousel
                    carouselName={configStages.ring.name}
                    data={ringData}
                    radius={isMobile() ? 0.4 : 0.5}
                    meshScale={0.175}
                />
                <Carousel
                    carouselName={configStages.metal.name}
                    data={metalData}
                    radius={isMobile() ? 0.35 : 0.45}
                />

                <Stars
                    radius={100}
                    depth={50}
                    count={1000}
                    factor={5}
                    saturation={0}
                    fade
                    speed={1}
                />

                <TryItonUI ringRef={ringRef} />

                <group rotation={[0, degToRad(45), 0]}>
                    <mesh
                        name="table_front_left"
                        position={[-1.28, 0.1, 1.28]}
                        rotation={[0, degToRad(-45), 0]}
                        scale={[1.7, 1.35, 1.9]}
                        geometry={tableModel.nodes.ClassicConsole_01.geometry}
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
                        geometry={tableModel.nodes.ClassicConsole_01.geometry}
                        material={tableModel.materials.ClassicConsole_01}
                        castShadow
                        receiveShadow
                    />
                    <mesh
                        name="table_back_right"
                        position={[1.28, 0.1, -1.28]}
                        rotation={[0, degToRad(135), 0]}
                        scale={[1.7, 1.35, 1.9]}
                        geometry={tableModel.nodes.ClassicConsole_01.geometry}
                        material={tableModel.materials.ClassicConsole_01}
                        castShadow
                        receiveShadow
                    />
                    <mesh
                        name="table_back_left"
                        position={[-1.28, 0.1, -1.28]}
                        rotation={[0, degToRad(-135), 0]}
                        scale={[1.7, 1.35, 1.9]}
                        geometry={tableModel.nodes.ClassicConsole_01.geometry}
                        material={tableModel.materials.ClassicConsole_01}
                        castShadow
                        receiveShadow
                    />
                    {/* <mesh
                        name="table_front_left"
                        position={[-1.2, 0.75, 1.2]}
                        rotation={[0, degToRad(-45), 0]}
                        receiveShadow
                        castShadow
                    >
                        <boxGeometry args={[2.5, 1.25, 1]} />
                        <meshStandardMaterial
                            transparent
                            opacity={0.5}
                            wireframe
                            // color={'IndianRed'}
                            color={'black'}
                        />
                    </mesh>
                    <mesh
                        name="table_front_right"
                        position={[1.2, 0.75, 1.2]}
                        rotation={[0, degToRad(45), 0]}
                        receiveShadow
                        castShadow
                    >
                        <boxGeometry args={[2.5, 1.25, 1]} />
                        <meshStandardMaterial
                            transparent
                            opacity={0.5}
                            wireframe
                            // color={'DarkOliveGreen'}
                            color={'black'}
                        />
                    </mesh>
                    <mesh
                        name="table_back_right"
                        position={[1.2, 0.75, -1.2]}
                        rotation={[0, degToRad(-45), 0]}
                        receiveShadow
                        castShadow
                    >
                        <boxGeometry args={[2.5, 1.25, 1]} />
                        <meshStandardMaterial
                            transparent
                            opacity={0.5}
                            wireframe
                            // color={'CadetBlue'}
                            color={'black'}
                        />
                    </mesh>
                    <mesh
                        name="table_back_left"
                        position={[-1.2, 0.75, -1.2]}
                        rotation={[0, degToRad(45), 0]}
                        receiveShadow
                        castShadow
                    >
                        <boxGeometry args={[2.5, 1.25, 1]} />
                        <meshStandardMaterial
                            transparent
                            opacity={0.5}
                            wireframe
                            // color={'BurlyWood'}
                            color={'black'}
                        />
                    </mesh> */}
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
                </group>

                <mesh
                    name="floor"
                    position={[0, -0.125, 0]}
                    rotation={[degToRad(-90), 0, 0]}
                    receiveShadow
                >
                    <planeGeometry args={[1000, 1000]} />
                    {/* <meshStandardMaterial color={'black'} /> */}
                    {/* <meshStandardMaterial color={'hsl(54, 24%, 41%)'} /> */}
                    {/* <meshStandardMaterial color={'hsl(55, 30%, 23%)'} /> */}
                    <meshStandardMaterial color={'hsl(50, 40%, 36%)'} />
                </mesh>
            </group>
        </>
    )
}
