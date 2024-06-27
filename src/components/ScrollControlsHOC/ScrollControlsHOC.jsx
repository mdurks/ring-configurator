import { ScrollControls } from '@react-three/drei'
import { useAppStore } from '../../store/store'

export const ScrollControlsHOC = ({ children }) => {
    // const isIntroActive = useAppStore((state) => state.isIntroActive)
    const isIntroActive = true

    return (
        <ScrollControls enabled={isIntroActive} pages={10} damping={0.3}>
            {children}
        </ScrollControls>
    )
}
