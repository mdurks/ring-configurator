import { ScrollControls } from '@react-three/drei'
import { useAppStore } from '../../store/store'
import { useEffect } from 'react'

export const ScrollControlsHOC = ({ children }) => {
    const isIntroActive = useAppStore((state) => state.isIntroActive)

    useEffect(() => {
        // some how scrolling down this page has made the Drei Html component scroll that far
        // down as well, making its content no longer visible
        // so after the intro/scrolling bit is done, just reset the scroll position of the Drei Html
        if (isIntroActive == false)
            document.querySelector('.r3fCanvas > div > div').scrollTop = 0
    }, [isIntroActive])

    return (
        <ScrollControls enabled={isIntroActive} pages={15} damping={0.3}>
            {children}
        </ScrollControls>
    )
}
