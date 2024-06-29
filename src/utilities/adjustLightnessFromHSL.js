export const adjustLightnessFromHSL = (hslString, adjustment) => {
    /*
        hsl\(   : Matches the literal string hsl(.
        \s*     : Matches any whitespace characters (spaces or tabs), zero or more times.
        \d+     : Matches one or more digits (for the hue).
        ,\s*    : Matches a comma followed by any whitespace characters, zero or more times.
        \d+%    : Matches one or more digits followed by a percent sign (for the saturation).
        ,\s*    : Matches a comma followed by any whitespace characters, zero or more times.
        (\d+)%  : Matches one or more digits followed by a percent sign (for the lightness) and captures this part.
        \s*\)   : Matches any whitespace characters, zero or more times, followed by a closing parenthesis.
    */
    const regex = /hsl\(\s*(\d+),\s*(\d+)%,\s*(\d+)%\s*\)/

    const match = regex.exec(hslString)

    if (match) {
        const hue = match[1]
        const saturation = match[2]
        let lightness = parseInt(match[3], 10)
        lightness = Math.max(0, lightness + adjustment)
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`
    } else {
        return null
    }
}
