import { ARButton } from '@react-three/xr'
import { Leva } from 'leva'
import { HtmlUIContainer } from '../HtmlUI/HtmlUIContainer/HtmlUIContainer'
import { configStages, useAppStore } from '../../store/store'

export const OutOfCanvasElements = () => {
    const configStage = useAppStore((state) => state.configStage)

    return (
        <>
            <Leva collapsed={false} />

            {configStage == configStages.tryon.name && (
                <ARButton
                    className="ar_button"
                    sessionInit={{
                        optionalFeatures: [
                            // 'local-floor',
                            // 'bounded-floor',
                            // 'hand-tracking',
                            // 'layers',
                            // 'dom-overlay',
                        ],
                    }}
                >
                    {/* {(status) => console.log(`WebXR ${status}`)} */}
                </ARButton>
            )}

            <HtmlUIContainer />
        </>
    )
}
