// import { useEffect } from 'react';

// note: safari uses the webkit prefix for audio context api
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

export default function useBeeper(type = 1, vol = 0.75) {
  return () => {
    let beepDuration = 0.6;
    let startVol = 0.01;
    if (vol <= 0) {
      beepDuration = 0;
      startVol = 0;
    }
    const fadeInDuration = beepDuration/4;

    const osc = audioContext.createOscillator();
    const output = audioContext.createGain();

    const freq = type === 2 ? 369.99 : 220;

    osc.connect(output);
    osc.type = window.AudioContext ? 'sine' : 1; // safari is weird
    osc.frequency.value = freq;

    output.connect(audioContext.destination);
    output.gain.setValueAtTime(startVol, audioContext.currentTime);

    osc.start(audioContext.currentTime);
    if (vol > 0) {
      output.gain.exponentialRampToValueAtTime(vol, audioContext.currentTime + fadeInDuration);
      output.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + beepDuration);
    }
    osc.stop(audioContext.currentTime + beepDuration + 0.1);
  }
};
