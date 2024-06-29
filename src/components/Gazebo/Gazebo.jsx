import { useEffect } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'

import { degToRad } from 'three/src/math/MathUtils.js'

import { configStages, useAppStore } from '../../store/store'
import { Stars } from '@react-three/drei'
import { Carousel } from '../Carousel/Carousel'

export const Gazebo = ({ groupGazeboRef }) => {
    //
    //
    // Global state:
    const configStage = useAppStore((state) => state.configStage)

    //
    //
    // Local init:
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
        { value: '#419aff', label: 'Sky blue' },
    ]
    const ringData = [
        { value: 'red', label: 'red' },
        { value: 'green', label: 'green' },
        { value: 'blue', label: 'blue' },
        { value: 'orange', label: 'orange' },
        { value: 'violet', label: 'violet' },
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
            <group ref={groupGazeboRef} name="Gazebo">
                <Carousel
                    carouselName={configStages.gemColor.name}
                    data={gemData}
                    radius={0.6}
                />
                <Carousel
                    carouselName={configStages.ring.name}
                    data={ringData}
                    radius={0.45}
                />
                <Carousel
                    carouselName={configStages.metal.name}
                    data={metalData}
                    radius={0.45}
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
                <group rotation={[0, degToRad(45), 0]}>
                    <mesh
                        name="table_front_left"
                        position={[-1.2, 0.75, 1.2]}
                        rotation={[0, degToRad(-45), 0]}
                        receiveShadow
                        castShadow
                    >
                        <boxGeometry args={[2.5, 1.25, 1]} />
                        <meshStandardMaterial color={'IndianRed'} />
                    </mesh>
                    <mesh
                        name="table_front_right"
                        position={[1.2, 0.75, 1.2]}
                        rotation={[0, degToRad(45), 0]}
                        receiveShadow
                        castShadow
                    >
                        <boxGeometry args={[2.5, 1.25, 1]} />
                        <meshStandardMaterial color={'DarkOliveGreen'} />
                    </mesh>
                    <mesh
                        name="table_back_right"
                        position={[1.2, 0.75, -1.2]}
                        rotation={[0, degToRad(-45), 0]}
                        receiveShadow
                        castShadow
                    >
                        <boxGeometry args={[2.5, 1.25, 1]} />
                        <meshStandardMaterial color={'CadetBlue'} />
                    </mesh>
                    <mesh
                        name="table_back_left"
                        position={[-1.2, 0.75, -1.2]}
                        rotation={[0, degToRad(45), 0]}
                        receiveShadow
                        castShadow
                    >
                        <boxGeometry args={[2.5, 1.25, 1]} />
                        <meshStandardMaterial color={'BurlyWood'} />
                    </mesh>
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
                    <meshStandardMaterial color={'#837e4f'} />
                </mesh>
            </group>
        </>
    )
}
