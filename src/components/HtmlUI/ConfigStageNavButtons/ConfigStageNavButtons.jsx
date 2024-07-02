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
    const chosenItem = useAppStore((state) => state[configStage].chosenItem)

    //
    //
    // Global functions:

    const setConfigStage = useAppStore((state) => state.setConfigStage)
    const setConfigStagePrevious = useAppStore(
        (state) => state.setConfigStagePrevious,
    )
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

    const handleCategoryClick = (key) => {
        setConfigStagePrevious(configStage)
        setConfigStage(configStages[key].name)
    }

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
            {configStage != configStages.tryon.name && (
                <>
                    <h1>{chosenItem?.label}</h1>
                    <br />
                    <br />
                    <button type="button" onClick={decrement}>
                        Next
                    </button>
                    {carouselIndex + 1} / {carouselLength}
                    <button type="button" onClick={increment}>
                        Prev
                    </button>
                    <br />
                </>
            )}

            {Object.keys(configStages).map((stage) => {
                return (
                    <button
                        key={`stageNav${configStages[stage].name}`}
                        type="button"
                        className={`stageNavBtn_${configStages[stage].name}`}
                        onClick={() => handleCategoryClick(stage)}
                    >
                        {configStages[stage].label}
                    </button>
                )
            })}
        </nav>
    )
}
