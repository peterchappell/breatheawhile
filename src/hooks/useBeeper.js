// import { useEffect } from 'react';

// note: safari uses the webkit prefix for audio context api
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

const beepDuration = 0.6;
const fadeInDuration = beepDuration/4;

export default function useBeeper(type = 1, vol = 0.75) {
  return () => {
    const osc = audioContext.createOscillator();
    const output = audioContext.createGain();

    const freq = type === 2 ? 369.99 : 220;

    osc.connect(output);
    osc.type = window.AudioContext ? 'sine' : 1; // safari is weird
    osc.frequency.value = freq;

    output.connect(audioContext.destination);
    output.gain.setValueAtTime(0.01, audioContext.currentTime);

    osc.start(audioContext.currentTime);
    output.gain.exponentialRampToValueAtTime(vol, audioContext.currentTime + fadeInDuration);
    output.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + beepDuration);
    osc.stop(audioContext.currentTime + beepDuration + 0.1);
  }
};
