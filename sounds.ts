
const createAudio = (src: string) => {
    const audio = new Audio(src);
    audio.preload = 'auto'; // Preload the audio file for faster playback
    return audio;
};

// Sound sources from Pixabay (free for use)
export const flipSound = createAudio('https://cdn.pixabay.com/download/audio/2022/03/10/audio_29b244654c.mp3');
export const winSound = createAudio('https://cdn.pixabay.com/download/audio/2021/08/04/audio_96cbf48743.mp3');
export const loseSound = createAudio('https://cdn.pixabay.com/download/audio/2022/03/10/audio_c9a6327633.mp3');
export const recordSound = createAudio('https://cdn.pixabay.com/download/audio/2022/01/18/audio_82c9e7b252.mp3');
export const diceSound = createAudio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_2491a6d4d3.mp3');


/**
 * Plays an HTMLAudioElement, resetting its time to the start.
 * Includes error handling for browser autoplay policies.
 * @param sound The HTMLAudioElement to play.
 */
export const playSound = (sound: HTMLAudioElement) => {
    sound.currentTime = 0;
    sound.play().catch(error => {
        // Modern browsers may block autoplay. We log the error but don't interrupt the user.
        console.error("Error playing sound:", error);
    });
};
