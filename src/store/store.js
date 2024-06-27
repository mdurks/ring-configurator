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
        configCarouselIndex: 0,

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

        setConfigCarouselIndex: (value) =>
            set(
                produce((state) => {
                    state.configCarouselIndex = value
                }),
                false,
                `setConfigCarouselIndex: ${value}`,
            ),
    })),
)
