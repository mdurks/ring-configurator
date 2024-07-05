export const isMobile = () => {
    const userAgent = navigator.userAgent
    return /Mobi|Android/i.test(userAgent)
}
