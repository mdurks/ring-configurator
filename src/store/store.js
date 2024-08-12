import { create } from 'zustand'
import { produce } from 'immer'
import { devtools } from 'zustand/middleware'
import { degToRad } from 'three/src/math/MathUtils.js'
import { checkIsMobile } from '../utilities/checkIsMobile'

const isMobile = checkIsMobile()

export const fontPathDMSerifDisplay =
    '/DM_Serif_Display/DMSerifDisplay-Regular.woff'
export const fontPathAboreto = '/Aboreto/Aboreto-Regular.woff'

export const zoomSettings = {
    min: 4.75,
    max: 5,
    step: 0.06,
    speed: 0.3,
}

export const gazeboFinalPosition = { x: 0, y: -1.75, z: 2.5 }
export const tableTopYPos = 1.39
export const carouselPosition = {
    height: tableTopYPos,
    radiusFromGazeeboCenter: 1.3,
}
export const ringDefaultState = {
    position: {
        x: 0,
        y: isMobile ? -0.01 : -0.05,
        z: isMobile ? 4.1 : 4.25,
    },
    rotation: { x: 0.9615264128772747, y: 13.746184150432903, z: 0 },
    scale: { x: 0.5, y: 0.5, z: 0.5 },
}
export const defaultRingData = {
    value: '/WavyRing.glb',
    meshName: 'WavyRing',
    label: 'Cluster Ring',
}

export const configStages = {
    gemColor: {
        name: 'gemColor',
        label: 'Gem',
        carouselPosition: [
            0,
            carouselPosition.height + 0.025,
            isMobile
                ? carouselPosition.radiusFromGazeeboCenter
                : // move gem carousel back away from nav buttons on desktop:
                  carouselPosition.radiusFromGazeeboCenter - 0.05,
        ],
        carouselMeshScale: isMobile ? 0.05 : 0.07,
        carouselRadius: isMobile ? 0.35 : 0.6,
        carouselRotation: [0, 0, 0],
        itemTableYPosition: -0.01,
        itemCarouselYPosition: 0,
        yRotationPos: 0,
    },
    ring: {
        name: 'ring',
        label: 'Ring',
        carouselPosition: [
            carouselPosition.radiusFromGazeeboCenter + 0.15,
            carouselPosition.height + 0.08,
            0,
        ],
        carouselMeshScale: isMobile ? 0.125 : 0.175,
        carouselRadius: isMobile ? 0.3 : 0.5,
        carouselRotation: [0, degToRad(90), 0],
        itemTableYPosition: -0.06,
        itemCarouselYPosition: 0,
        yRotationPos: degToRad(-90),
    },
    metal: {
        name: 'metal',
        label: 'Metal',
        carouselPosition: [
            0,
            carouselPosition.height,
            -carouselPosition.radiusFromGazeeboCenter,
        ],
        carouselMeshScale: isMobile ? 0.35 : 0.45,
        carouselRadius: isMobile ? 0.35 : 0.45,
        carouselRotation: [0, degToRad(180), 0],
        itemTableYPosition: 0.055,
        itemCarouselYPosition: 0.055,
        yRotationPos: degToRad(-180),
    },
    tryon: {
        name: 'tryon',
        label: 'Try it on',
        carouselPosition: [
            -carouselPosition.radiusFromGazeeboCenter,
            carouselPosition.height,
            0,
        ],
        carouselMeshScale: isMobile ? 0 : 0,
        carouselRadius: isMobile ? 0 : 0,
        carouselRotation: [0, degToRad(270), 0],
        itemTableYPosition: 0,
        itemCarouselYPosition: 0,
        yRotationPos: degToRad(-270),
    },
}

export const useAppStore = create(
    devtools((set) => ({
        //
        //
        //
        // initial state:
        // -------------------------------------------

        hasAppLoaded: false,

        hasClickedBegin: false,

        isAudioEnabled: false,

        isIntroActive: true,

        isPointerDown: false,

        configStage: 'intro',
        configStagePrevious: null,
        configAnimationComplete: null,

        intro: {
            carouselLength: 0,
            carouselIndex: 0,
            carouselRotation: 0,
            carouselPreviousIndex: null,
            chosenItem: null,
        },

        gemColor: {
            carouselLength: 0,
            carouselIndex: 0,
            carouselRotation: 0,
            carouselPreviousIndex: null,
            chosenItem: null,
        },

        metal: {
            carouselLength: 0,
            carouselIndex: 0,
            carouselRotation: 0,
            carouselPreviousIndex: null,
            chosenItem: null,
        },

        ring: {
            carouselLength: 0,
            carouselIndex: 0,
            carouselRotation: 0,
            carouselPreviousIndex: null,
            chosenItem: defaultRingData,
        },

        tryon: {
            // this stage has no carousel, and thes values are not used
            // but the logic needs some values to be here anyway
            carouselLength: 0,
            carouselIndex: 0,
            carouselRotation: 0,
            carouselPreviousIndex: null,
            chosenItem: null,
        },

        //
        //
        //
        //
        //
        // App:
        // -------------------------------------------

        setHasAppLoaded: (value) =>
            set(
                produce((state) => {
                    state.hasAppLoaded = value
                }),
                false,
                `setHasAppLoaded: ${value}`,
            ),

        setIsAudioEnabled: (value) =>
            set(
                produce((state) => {
                    state.isAudioEnabled = value
                }),
                false,
                `setIsAudioEnabled: ${value}`,
            ),

        setHasClickedBegin: (value) =>
            set(
                produce((state) => {
                    state.hasClickedBegin = value
                }),
                false,
                `setHasClickedBegin: ${value}`,
            ),

        setIsIntroActive: (value) =>
            set(
                produce((state) => {
                    state.isIntroActive = value
                }),
                false,
                `setIsIntroActive: ${value}`,
            ),

        setIsPointerDown: (value) =>
            set(
                produce((state) => {
                    state.isPointerDown = value
                }),
                false,
                `setIsPointerDown: ${value}`,
            ),

        setConfigStage: (value) =>
            set(
                produce((state) => {
                    state.configStage = value
                }),
                false,
                `setConfigStage: ${value}`,
            ),

        setConfigStagePrevious: (value) =>
            set(
                produce((state) => {
                    state.configStagePrevious = value
                }),
                false,
                `setConfigStagePrevious: ${value}`,
            ),

        setConfigAnimationComplete: (value) =>
            set(
                produce((state) => {
                    state.configAnimationComplete = value
                }),
                false,
                `setConfigAnimationComplete: ${value}`,
            ),

        //
        //
        //
        //
        //
        // Carousel:
        // -------------------------------------------

        setCarouselLength: (value, stage) =>
            set(
                produce((state) => {
                    state[stage].carouselLength = value
                }),
                false,
                `setCarouselLength: ${stage} ${value}`,
            ),

        setCarouselIndex: (value, stage) =>
            set(
                produce((state) => {
                    state[stage].carouselIndex = value
                }),
                false,
                `setCarouselIndex: ${stage} ${value}`,
            ),

        setCarouselRotation: (value, stage) =>
            set(
                produce((state) => {
                    state[stage].carouselRotation = value
                }),
                false,
                `setCarouselRotation: ${stage} ${value}`,
            ),

        setCarouselPreviousIndex: (value, stage) =>
            set(
                produce((state) => {
                    state[stage].carouselPreviousIndex = value
                }),
                false,
                `setCarouselPreviousIndex: ${stage} ${value}`,
            ),

        setChosenItem: (value, stage) =>
            set(
                produce((state) => {
                    state[stage].chosenItem = value
                }),
                false,
                `setChosenItem: ${value} ${stage}`,
            ),
    })),
)

export const storeActions = {
    setHasAppLoaded: useAppStore.getState().setHasAppLoaded,
    setIsAudioEnabled: useAppStore.getState().setIsAudioEnabled,
    setHasClickedBegin: useAppStore.getState().setHasClickedBegin,
    setIsIntroActive: useAppStore.getState().setIsIntroActive,
    setIsPointerDown: useAppStore.getState().setIsPointerDown,

    setConfigStage: useAppStore.getState().setConfigStage,
    setConfigStagePrevious: useAppStore.getState().setConfigStagePrevious,
    setConfigAnimationComplete:
        useAppStore.getState().setConfigAnimationComplete,

    setCarouselLength: useAppStore.getState().setCarouselLength,
    setCarouselIndex: useAppStore.getState().setCarouselIndex,
    setCarouselRotation: useAppStore.getState().setCarouselRotation,
    setCarouselPreviousIndex: useAppStore.getState().setCarouselPreviousIndex,
    setChosenItem: useAppStore.getState().setChosenItem,
}
