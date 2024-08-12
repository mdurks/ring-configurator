import { useEffect } from 'react'
import { useProgress } from '@react-three/drei'
import gsap from 'gsap'

import { startAudioLoop } from '../../utilities/audio'

import { storeActions, useAppStore } from '../../store/store'

export const AppLoader = () => {
    const { progress } = useProgress()

    const hasClickedBegin = useAppStore((state) => state.hasClickedBegin)
    const hasAppLoaded = useAppStore((state) => state.hasAppLoaded)

    const handleBegin = () => {
        storeActions.setHasClickedBegin(true)
        startAudioLoop(document.getElementById('audioMusic'), 1, 0.1)
    }

    const proxyClick = () => {
        setTimeout(() => {
            document.querySelector('.beginButton').click()
            window.removeEventListener('touchstart', proxyClick)
        }, 300)
    }

    useEffect(() => {
        if (progress == 100 && hasAppLoaded == false) {
            storeActions.setHasAppLoaded(true)
            storeActions.setIsAudioEnabled(true)
            beginAnimation()
        }
    }, [progress, hasAppLoaded])

    useEffect(() => {
        if (hasAppLoaded) window.addEventListener('touchstart', proxyClick)
    }, [hasAppLoaded])

    const beginAnimation = () => {
        gsap.to('.beginButton', {
            duration: 1,
            top: 0,
            opacity: 1,
            ease: 'power1.inOut',
        })
    }

    return (
        <>
            {!hasClickedBegin && (
                <>
                    <div className="loadingScreen">
                        <div className="centerBox">
                            <div className="loadingTxt">Loading</div>
                            <div className="progressValue">
                                {Math.ceil(progress)}%
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={handleBegin}
                            className="beginButton"
                            disabled={!hasAppLoaded}
                        >
                            Start
                        </button>
                    </div>
                </>
            )}
        </>
    )
}
