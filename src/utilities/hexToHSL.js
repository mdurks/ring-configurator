export const hexToHSL = (hex, returnValues = 'hsl') => {
    if (!hex) return 0

    // Remove the hash symbol if present
    hex = hex.replace(/^#/, '')

    // Parse the hex color
    let r = parseInt(hex.substring(0, 2), 16)
    let g = parseInt(hex.substring(2, 4), 16)
    let b = parseInt(hex.substring(4, 6), 16)

    // Normalize RGB values to 0-1
    r /= 255
    g /= 255
    b /= 255

    // Calculate the max and min RGB values
    let max = Math.max(r, g, b)
    let min = Math.min(r, g, b)
    let delta = max - min

    // Calculate Lightness
    let l = (max + min) / 2

    let h, s

    if (delta === 0) {
        // If the color is a shade of gray
        h = 0
        s = 0
    } else {
        // Calculate Saturation
        s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min)

        // Calculate Hue
        switch (max) {
            case r:
                h = (g - b) / delta + (g < b ? 6 : 0)
                break
            case g:
                h = (b - r) / delta + 2
                break
            case b:
                h = (r - g) / delta + 4
                break
        }
        h /= 6
    }

    // Convert the hue to degrees
    h = Math.round(h * 360)
    s = Math.round(s * 100)
    l = Math.round(l * 100)

    if (returnValues == 'hsl') return `hsl(${h}, ${s}%, ${l}%)`
    if (returnValues == 'h') return h
    if (returnValues == 's') return s
    if (returnValues == 'l') return l
}
