import { useGLTF } from '@react-three/drei'

export const WavyRing = ({ ringRef }) => {
    const { nodes } = useGLTF('/WavyRing.glb')

    return (
        <>
            <mesh
                ref={ringRef}
                geometry={nodes.WavyRing.geometry}
                material={nodes.WavyRing.material}
                castShadow
            ></mesh>
        </>
    )
}
