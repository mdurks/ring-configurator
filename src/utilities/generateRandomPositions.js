export const generateRandomPositions = (
    amount,
    widthRange,
    depthRange,
    itemOnTableYPosition,
) => {
    const positions = []
    const occupied = new Set()

    const getKey = (x, z) => `${x.toFixed(1)},${z.toFixed(1)}`

    const [widthMin, widthMax] = widthRange
    const [depthMin, depthMax] = depthRange

    for (let i = 0; i < amount; i++) {
        let x, z, key
        do {
            x = Math.random() * (widthMax - widthMin) + widthMin
            z = Math.random() * (depthMax - depthMin) + depthMin
            key = getKey(x, z)
        } while (occupied.has(key))
        occupied.add(key)
        positions.push([x, itemOnTableYPosition, z])
    }

    return positions
}
