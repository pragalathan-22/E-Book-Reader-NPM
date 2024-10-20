import axios from 'axios';

const translateText = async (text, targetLanguage) => {
  const apiKey = 'AIzaSyAr_EtvpTL8zbgwv1Rc1plNJscRTqtzB5Q'; // Replace with your actual API key
  const url = 'https://api.yourtranslationapi.com/translate'; // Replace with the actual API endpoint

  try {
    const response = await axios.post(url, {
      text,
      target_language: targetLanguage,
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`, // If using Bearer token
        'Content-Type': 'application/json',
      }
    });

    return response.data.translatedText; // Adjust based on the API response structure
  } catch (error) {
    console.error('Translation error:', error);
    throw error; // Re-throw error to be handled elsewhere
  }
};
