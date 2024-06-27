import { configStages, useAppStore } from '../../../store/store'

export const ConfigStageNavButtons = () => {
    const isIntroActive = useAppStore((state) => state.isIntroActive)
    const configCarouselIndex = useAppStore(
        (state) => state.configCarouselIndex,
    )

    const setConfigStage = useAppStore((state) => state.setConfigStage)
    const setConfigCarouselIndex = useAppStore(
        (state) => state.setConfigCarouselIndex,
    )

    return (
        <nav
            className={`configStageNavButtons ${
                isIntroActive && 'introActive'
            }`}
        >
            <button
                type="button"
                onClick={() => setConfigCarouselIndex(configCarouselIndex - 1)}
            >
                Carousel -
            </button>
            <button
                type="button"
                onClick={() => setConfigCarouselIndex(configCarouselIndex + 1)}
            >
                Carousel +
            </button>

            <br />

            <button
                type="button"
                onClick={() => setConfigStage(configStages.gemColor.name)}
            >
                Table 1
            </button>
            <button
                type="button"
                onClick={() => setConfigStage(configStages.metal.name)}
            >
                Table 2
            </button>
            <button
                type="button"
                onClick={() => setConfigStage(configStages.ring.name)}
            >
                Table 3
            </button>
            <button
                type="button"
                onClick={() => setConfigStage(configStages.tryon.name)}
            >
                Table 4
            </button>
        </nav>
    )
}
