import { useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import {
    Caustics,
    CubeCamera,
    MeshRefractionMaterial,
    useGLTF,
} from '@react-three/drei'
import { useControls } from 'leva'
import { RGBELoader } from 'three/examples/jsm/Addons.js'
import { isMobile } from '../../utilities/isMobile'
import { configStages, useAppStore } from '../../store/store'

export const Diamond = (props) => {
    const ref = useRef()
    const { nodes } = useGLTF('/diamond.glb')
    // Use a custom envmap/scene-backdrop for the diamond material
    // This way we can have a clear BG while cube-cam can still film other objects
    const texture = useLoader(
        RGBELoader,
        // 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr',
        // '/autumn_field_puresky_2k.hdr',
        // '/brown_photostudio_03_1k.hdr',
        '/blue_photo_studio_1k.hdr',
    )
    const materialSettings = {
        bounces: 3,
        aberrationStrength: 0.01,
        ior: 2.75,
        fresnel: 1,
        color: props.color,
    }
    // Optional config
    // const config = useControls({
    //     bounces: { value: materialSettings.bounces, min: 0, max: 8, step: 1 },
    //     aberrationStrength: {
    //         value: materialSettings.aberrationStrength,
    //         min: 0,
    //         max: 0.1,
    //         step: 0.01,
    //     },
    //     ior: { value: materialSettings.ior, min: 0, max: 10 },
    //     fresnel: { value: materialSettings.fresnel, min: 0, max: 1 },
    //     // color: 'white',
    //     color: materialSettings.color,
    //     // color: '#ffbfdf',
    // })

    const configStage = useAppStore((state) => state.configStage)

    const isThisACarouselItem = props.name
        ? props.name.includes('Carousel')
        : false

    useFrame(() => {
        if (
            isThisACarouselItem &&
            configStage == configStages.gemColor.name &&
            isMobile() == false
        )
            ref.current.rotation.y += 0.00075
    })

    return (
        // <CubeCamera resolution={256} frames={1} envMap={texture}>
        //     {(texture) => (
        //         <Caustics
        //             backfaces
        //             color={config.color}
        //             position={[0, 0.01, 0]}
        //             lightSource={[5, 5, -10]}
        //             worldRadius={0.1}
        //             ior={1.8}
        //             backfaceIor={1.1}
        //             intensity={0.1}
        //         >
        <mesh
            castShadow
            ref={ref}
            geometry={nodes.Diamond_1_0.geometry}
            {...props}
        >
            <MeshRefractionMaterial
                envMap={texture}
                {...materialSettings}
                toneMapped={false}
            />
        </mesh>
        //         </Caustics>
        //     )}
        // </CubeCamera>
    )
}
