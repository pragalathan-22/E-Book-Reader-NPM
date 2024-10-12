import axios from 'axios';

// Example using LibreTranslate
export const translateText = async (text, targetLanguage = 'ta') => {
  try {
    const response = await axios.post(
      'https://libretranslate.com/translate',
      {
        q: text,
        source: 'en',
        target: targetLanguage, // 'ta' for Tamil
        format: 'text',
      }
    );
    return response.data.translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Return original text in case of error
  }
};

// You can add more functions for other language APIs if needed
