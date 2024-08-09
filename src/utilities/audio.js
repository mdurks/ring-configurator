export const startAudioLoop = (audio, playbackRate = 1, volume = 1) => {
    audio.volume = volume
    audio.playbackRate = playbackRate
    audio.play()
    audio.addEventListener('ended', () => restartAudio(audio, playbackRate))
}

export const restartAudio = (audio, playbackRate = 1) => {
    audio.currentTime = 0
    audio.playbackRate = playbackRate
    audio.play()
}

export const stopAudioLoop = (audio) => {
    const onStop = () => {
        audio.removeEventListener('ended', onStop)
        audio.pause()
        audio.currentTime = 0
    }

    audio.removeEventListener('ended', onStop)

    if (!audio.paused) onStop()
}

export const stopAllAudio = () => {
    Array.from(document.getElementsByTagName('audio')).forEach((audio) => {
        audio.pause()
        audio.currentTime = 0
    })
}

export const stopAudioById = (audioId) => {
    const audio = document.getElementById(audioId)
    audio.pause()
    audio.currentTime = 0
}
