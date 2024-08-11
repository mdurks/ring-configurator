import * as THREE from 'three'

export const RoundedPlane = ({
    roundedPlaneRef,
    width,
    height,
    radius,
    depth,
    position,
    rotation,
    material,
    visible,
}) => {
    // Create rounded rectangle shape
    const shape = new THREE.Shape()
    shape.moveTo(-width / 2 + radius, -height / 2)
    shape.lineTo(width / 2 - radius, -height / 2)
    shape.quadraticCurveTo(
        width / 2,
        -height / 2,
        width / 2,
        -height / 2 + radius,
    )
    shape.lineTo(width / 2, height / 2 - radius)
    shape.quadraticCurveTo(
        width / 2,
        height / 2,
        width / 2 - radius,
        height / 2,
    )
    shape.lineTo(-width / 2 + radius, height / 2)
    shape.quadraticCurveTo(
        -width / 2,
        height / 2,
        -width / 2,
        height / 2 - radius,
    )
    shape.lineTo(-width / 2, -height / 2 + radius)
    shape.quadraticCurveTo(
        -width / 2,
        -height / 2,
        -width / 2 + radius,
        -height / 2,
    )

    // Create geometry by extruding the rounded rectangle shape
    const extrudeSettings = {
        steps: 1,
        depth: depth,
        bevelEnabled: false,
    }
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)

    // Move the geometry vertices to center the pivot
    geometry.translate(0, 0, -0.1 / 2) // Move the geometry along the z-axis to center the pivot

    return (
        <mesh
            ref={roundedPlaneRef}
            geometry={geometry}
            position={position}
            rotation={rotation}
            visible={visible}
        >
            <shaderMaterial
                attach="material"
                args={[material]}
                side={THREE.DoubleSide}
            />
        </mesh>
    )
}
