import { useEffect, useState } from 'react'
import { startAudioLoop, stopAllAudio } from '../../utilities/audio'

export const MuteAudioBtn = () => {
    const [isAudioEnabled, setAudioEnabled] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    const audioMusic = document.getElementById('audioMusic')
    const audioMusicVolume = 0.1

    const fill = isHovered ? 'rgba(0, 0, 0, 0.75)' : 'rgba(0, 0, 0, 0.5)'

    const handleClick = () => {
        // clicking will give this button focus, and if user playing basketball
        // the next time they  press spacebar, it will activate this button toggling the audio
        // so make sure to blur focus
        // document.activeElement.blur()
        // window.focus() // maybe not needed?

        if (isAudioEnabled) {
            stopAllAudio()
        } else {
            startAudioLoop(audioMusic, 1, audioMusicVolume)
        }
        setAudioEnabled(!isAudioEnabled)
    }

    const onHover = () => setIsHovered(true)
    const onHoverLeave = () => setIsHovered(false)

    useEffect(() => {
        // startAudioLoop(audioMusic, 1, audioMusicVolume)
    }, [])

    return (
        <button
            type="button"
            onClick={handleClick}
            onPointerEnter={onHover}
            onPointerLeave={onHoverLeave}
            className="muteAudioBtn"
        >
            {isAudioEnabled ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 117 86"
                >
                    <path
                        fill={fill}
                        fillRule="evenodd"
                        d="M31.1 64.14H4.73A4.73 4.73 0 0 1 0 59.4V26.6a4.73 4.73 0 0 1 4.73-4.74H31.1L57.62 0c2.12 0 3.83 2.12 3.83 4.74v76.52c0 2.62-1.71 4.74-3.83 4.74L31.1 64.14Zm46.87-46.35a3.81 3.81 0 0 1 5.37.58c6.6 8.23 10.3 16.24 10.3 24.63s-3.7 16.4-10.3 24.63a3.81 3.81 0 1 1-5.95-4.8C83.39 55.35 86 49 86 43c0-5.99-2.6-12.35-8.61-19.83a3.83 3.83 0 0 1 .58-5.38ZM95.64 4.28a3.81 3.81 0 0 1 5.36.64c10.23 13 15.73 25.36 15.73 38.08 0 12.72-5.5 25.09-15.73 38.08a3.81 3.81 0 1 1-6-4.74c9.65-12.24 14.1-22.97 14.1-33.34 0-10.37-4.45-21.1-14.1-33.34a3.83 3.83 0 0 1 .64-5.38Z"
                        clipRule="evenodd"
                    />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 117 86"
                >
                    <path
                        fill={fill}
                        fillRule="evenodd"
                        d="M31.1 64.14H4.73A4.73 4.73 0 0 1 0 59.4V26.6a4.73 4.73 0 0 1 4.73-4.74H31.1L57.62 0c2.12 0 3.83 2.12 3.83 4.74v76.52c0 2.62-1.71 4.74-3.83 4.74L31.1 64.14Zm47.44-39.68a5 5 0 0 0 0 7.08l11 11-11 10.99a5 5 0 1 0 7.07 7.07l11-11 10.92 10.93a5 5 0 0 0 7.07-7.07l-10.93-10.93 10.93-10.92a5 5 0 1 0-7.07-7.07L96.6 35.46l-11-11a5 5 0 0 0-7.06 0Z"
                        clipRule="evenodd"
                    />
                </svg>
            )}
        </button>
    )
}
