export const checkIsMobile = () => {
    // const userAgent = navigator.userAgent
    // return /Mobi|Android/i.test(userAgent)

    return window.innerWidth < 1024
}
