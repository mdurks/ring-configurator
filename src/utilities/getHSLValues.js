export const getHSLValues = (hslString) => {
    // Define the regex pattern for HSL color strings
    const hslRegex = /hsl\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)/

    // Match the input string with the regex
    const match = hslString.match(hslRegex)

    // If there's no match, return null or handle the error as needed
    if (!match) return null

    // Extract H, S, and L values and convert them to numbers
    const h = parseFloat(match[1])
    const s = parseFloat(match[2])
    const l = parseFloat(match[3])

    return { h, s, l }
}
