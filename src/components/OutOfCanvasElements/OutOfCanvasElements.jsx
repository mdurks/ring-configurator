import { ARButton } from '@react-three/xr'
import { Leva } from 'leva'
import { HtmlUIContainer } from '../HtmlUI/HtmlUIContainer/HtmlUIContainer'
import { configStages, useAppStore } from '../../store/store'
import { getHSLValues } from '../../utilities/getHSLValues'
import { checkIsMobile } from '../../utilities/checkIsMobile'

export const OutOfCanvasElements = () => {
    const configStage = useAppStore((state) => state.configStage)
    const configAnimationComplete = useAppStore(
        (state) => state.configAnimationComplete,
    )
    const gemColor = useAppStore((state) => state.gemColor.chosenItem)
    const isMobile = checkIsMobile()

    const gemHSL = gemColor?.value ? getHSLValues(gemColor.value) : null
    let contentColor = '#000'

    if (gemHSL) {
        contentColor = `hsl(${gemHSL.h}, ${gemHSL.s * 0.7}%, ${
            gemHSL.l * 0.65
        }%)`
    }

    return (
        <>
            <Leva collapsed={false} />

            {isMobile &&
                configStage == configStages.tryon.name &&
                configAnimationComplete == configStages.tryon.name && (
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
                        <div
                            className="ar_buttonContent"
                            style={{ background: contentColor }}
                        >
                            View now
                        </div>
                    </ARButton>
                )}

            <HtmlUIContainer />
        </>
    )
}
