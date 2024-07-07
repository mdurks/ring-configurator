import { configStages, storeActions, useAppStore } from '../../../store/store'

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
    // Local functions:

    const handleCategoryClick = (e, key) => {
        e.stopPropagation()
        storeActions.setConfigStagePrevious(configStage)
        storeActions.setConfigStage(configStages[key].name)
    }

    const decrement = () => {
        storeActions.setCarouselPreviousIndex(carouselIndex, configStage)
        /*
        increment the carouselIndex and uses the modulo operator % to wrap around the array length
        ensures that after reaching the array length, it starts again at 0
        */
        storeActions.setCarouselIndex(
            (carouselIndex + 1) % carouselLength,
            configStage,
        )
        storeActions.setCarouselRotation(carouselRotation - 1, configStage)
    }

    const increment = () => {
        storeActions.setCarouselPreviousIndex(carouselIndex, configStage)
        /*
        decrement the carouselIndex and also uses the modulo operator to wrap around the array length
        ensures that after reaching 0, it wraps around to the maximum index of the array (array length - 1)
        */
        storeActions.setCarouselIndex(
            (carouselIndex - 1 + carouselLength) % carouselLength,
            configStage,
        )
        storeActions.setCarouselRotation(carouselRotation + 1, configStage)
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
                        onClick={(e) => handleCategoryClick(e, stage)}
                    >
                        {configStages[stage].label}
                    </button>
                )
            })}
        </nav>
    )
}
