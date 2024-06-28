import { configStages, useAppStore } from '../../../store/store'

export const ConfigStageNavButtons = () => {
    const isIntroActive = useAppStore((state) => state.isIntroActive)
    const carouselIndex = useAppStore((state) => state.carouselIndex)
    const carouselLength = useAppStore((state) => state.carouselLength)
    const carouselRotation = useAppStore((state) => state.carouselRotation)

    const setConfigStage = useAppStore((state) => state.setConfigStage)
    const setCarouselIndex = useAppStore((state) => state.setCarouselIndex)
    const setCarouselRotation = useAppStore(
        (state) => state.setCarouselRotation,
    )
    const setCarouselPreviousIndex = useAppStore(
        (state) => state.setCarouselPreviousIndex,
    )

    const decrement = () => {
        setCarouselPreviousIndex(carouselIndex)
        /*
        increment the carouselIndex and uses the modulo operator % to wrap around the array length
        ensures that after reaching the array length, it starts again at 0
        */
        setCarouselIndex((carouselIndex + 1) % carouselLength)
        setCarouselRotation(carouselRotation - 1)
    }

    const increment = () => {
        setCarouselPreviousIndex(carouselIndex)
        /*
        decrement the carouselIndex and also uses the modulo operator to wrap around the array length
        ensures that after reaching 0, it wraps around to the maximum index of the array (array length - 1)
        */
        setCarouselIndex((carouselIndex - 1 + carouselLength) % carouselLength)
        setCarouselRotation(carouselRotation + 1)
    }

    return (
        <nav
            className={`configStageNavButtons ${
                isIntroActive && 'introActive'
            }`}
        >
            <button type="button" onClick={decrement}>
                Carousel -
            </button>
            <button type="button" onClick={increment}>
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
