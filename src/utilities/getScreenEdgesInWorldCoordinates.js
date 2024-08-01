import * as THREE from 'three'

// calculate the world coordinates of screen edges
export const getScreenEdgesInWorldCoordinates = (camera, zPosition) => {
    // Create a vector to hold the NDC (normalised device coordinates)
    const ndcVector = new THREE.Vector3()
    const worldVector = new THREE.Vector3()

    // Object to hold the edges in world space
    const screenEdges = {
        left: null,
        right: null,
        top: null,
        bottom: null,
    }

    // calculate the world position from NDC at the given zPosition
    const calculateWorldPosition = (x, y, zPos) => {
        ndcVector.set(x, y, -1) // Near plane (z = -1) for 3D coordinates
        ndcVector.unproject(camera)
        ndcVector.sub(camera.position).normalize()
        const distance = (zPos - camera.position.z) / ndcVector.z
        worldVector
            .copy(camera.position)
            .add(ndcVector.multiplyScalar(distance))
        return worldVector.clone()
    }

    // Calculate the world coordinates for each screen edge
    const topLeft = calculateWorldPosition(-1, 1, zPosition)
    const topRight = calculateWorldPosition(1, 1, zPosition)
    const bottomLeft = calculateWorldPosition(-1, -1, zPosition)
    const bottomRight = calculateWorldPosition(1, -1, zPosition)

    // Set the screen edges based on the calculated world coordinates
    screenEdges.left = bottomLeft.x
    screenEdges.right = bottomRight.x
    screenEdges.top = topLeft.y
    screenEdges.bottom = bottomLeft.y

    return screenEdges
}
