import axios from 'axios';

const apiKey = '7f82c3caa1637bff77f6351d5df5fa76';

export const getFlights = async () => {
  try {
    const response = await axios.get('http://api.aviationstack.com/v1/flights', {
      params: {
        access_key: apiKey,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Errore nella richiesta API:', error);
    throw error;
  }
};