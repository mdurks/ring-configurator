import { create } from 'zustand'
import { produce } from 'immer'
import { devtools } from 'zustand/middleware'
import { degToRad } from 'three/src/math/MathUtils.js'

export const gazeboYRotationReadyValue = degToRad(45)

export const configStages = {
    gemColor: {
        name: 'gemColor',
        yRotationPos: gazeboYRotationReadyValue,
    },
    metal: {
        name: 'metal',
        yRotationPos: degToRad(-90) + gazeboYRotationReadyValue,
    },
    ring: {
        name: 'ring',
        yRotationPos: degToRad(-180) + gazeboYRotationReadyValue,
    },
    tryon: {
        name: 'tryon',
        yRotationPos: degToRad(-270) + gazeboYRotationReadyValue,
    },
}

export const useAppStore = create(
    devtools((set) => ({
        //
        //
        //
        // initial state:
        // -------------------------------------------

        isIntroActive: true,

        configStage: configStages.gemColor.name,

        carouselLength: 0,
        carouselIndex: 0,
        carouselRotation: 0,
        carouselPreviousIndex: null,

        chosenColor: null,

        //
        //
        //
        //
        //
        // App:
        // -------------------------------------------

        setIsIntroActive: (value) =>
            set(
                produce((state) => {
                    state.isIntroActive = value
                }),
                false,
                `setIsIntroActive: ${value}`,
            ),

        setConfigStage: (value) =>
            set(
                produce((state) => {
                    state.configStage = value
                }),
                false,
                `setConfigStage: ${value}`,
            ),

        //
        //
        //
        //
        //
        // Carousel:
        // -------------------------------------------

        setCarouselLength: (value) =>
            set(
                produce((state) => {
                    state.carouselLength = value
                }),
                false,
                `setCarouselLength: ${value}`,
            ),

        setCarouselIndex: (value) =>
            set(
                produce((state) => {
                    state.carouselIndex = value
                }),
                false,
                `setCarouselIndex: ${value}`,
            ),

        setCarouselRotation: (value) =>
            set(
                produce((state) => {
                    state.carouselRotation = value
                }),
                false,
                `setCarouselRotation: ${value}`,
            ),

        setCarouselPreviousIndex: (value) =>
            set(
                produce((state) => {
                    state.carouselPreviousIndex = value
                }),
                false,
                `setCarouselPreviousIndex: ${value}`,
            ),

        //
        //
        //
        //
        //
        // Chosen:
        // -------------------------------------------

        setChosenColor: (value) =>
            set(
                produce((state) => {
                    state.chosenColor = value
                }),
                false,
                `setChosenColor: ${value}`,
            ),
    })),
)
