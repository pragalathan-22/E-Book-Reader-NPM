// voiceOption.js

import * as Speech from 'expo-speech';

export const speak = (text, language, voice) => {
  const options = {
    language: language,
    voice: voice === 'Male' ? 'com.apple.ttsbundle.Moira-compact' : 'com.apple.ttsbundle.Samantha-compact', // Adjust voice IDs based on your platform
    pitch: 1,
    rate: 1,
  };

  Speech.speak(text, options);
};
