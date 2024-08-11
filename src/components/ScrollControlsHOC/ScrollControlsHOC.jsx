import { ScrollControls } from '@react-three/drei'
import { useAppStore } from '../../store/store'
import { useEffect } from 'react'
import { checkIsMobile } from '../../utilities/checkIsMobile'

export const ScrollControlsHOC = ({ children }) => {
    const isIntroActive = useAppStore((state) => state.isIntroActive)
    const isMobile = checkIsMobile()

    useEffect(() => {
        // some how scrolling down this page has made the Drei Html component scroll that far
        // down as well, making its content no longer visible
        // so after the intro/scrolling bit is done, just reset the scroll position of the Drei Html
        if (isIntroActive == false)
            document.querySelector('.r3fCanvas > div > div').scrollTop = 0
    }, [isIntroActive])

    return (
        <ScrollControls
            enabled={isIntroActive}
            pages={isMobile ? 7 : 14}
            damping={isMobile ? 0.15 : 0.3}
        >
            {children}
        </ScrollControls>
    )
}
