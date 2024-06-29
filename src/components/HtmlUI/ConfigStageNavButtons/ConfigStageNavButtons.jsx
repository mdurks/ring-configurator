import { configStages, useAppStore } from '../../../store/store'

export const ConfigStageNavButtons = () => {
    //
    //
    // Global state:

    const isIntroActive = useAppStore((state) => state.isIntroActive)

    const configStage = useAppStore((state) => state.configStage)
    const carouselIndex = useAppStore(
        (state) => state[configStage].carouselIndex,
    )
    const carouselLength = useAppStore(
        (state) => state[configStage].carouselLength,
    )
    const carouselRotation = useAppStore(
        (state) => state[configStage].carouselRotation,
    )

    //
    //
    // Global functions:

    const setConfigStage = useAppStore((state) => state.setConfigStage)
    const setCarouselIndex = useAppStore((state) => state.setCarouselIndex)
    const setCarouselRotation = useAppStore(
        (state) => state.setCarouselRotation,
    )
    const setCarouselPreviousIndex = useAppStore(
        (state) => state.setCarouselPreviousIndex,
    )

    //
    //
    // Local functions:

    const decrement = () => {
        setCarouselPreviousIndex(carouselIndex, configStage)
        /*
        increment the carouselIndex and uses the modulo operator % to wrap around the array length
        ensures that after reaching the array length, it starts again at 0
        */
        setCarouselIndex((carouselIndex + 1) % carouselLength, configStage)
        setCarouselRotation(carouselRotation - 1, configStage)
    }

    const increment = () => {
        setCarouselPreviousIndex(carouselIndex, configStage)
        /*
        decrement the carouselIndex and also uses the modulo operator to wrap around the array length
        ensures that after reaching 0, it wraps around to the maximum index of the array (array length - 1)
        */
        setCarouselIndex(
            (carouselIndex - 1 + carouselLength) % carouselLength,
            configStage,
        )
        setCarouselRotation(carouselRotation + 1, configStage)
    }

    return (
        <nav
            className={`configStageNavButtons ${
                isIntroActive && 'introActive'
            }`}
        >
            <button type="button" onClick={decrement}>
                &gt;
            </button>
            <button type="button" onClick={increment}>
                &lt;
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
