// src/services/weatherService2.ts
export const getWeatherService = async (location: string) => {
  try {
    const response = await fetch(
      `${process.env.SERVICE2_URL}/data/2.5/weather?q=${location}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key': `${process.env.RAPID_API_KEY}`,
          'x-rapidapi-host': 'rapidweather.p.rapidapi.com',
        },
      },
    );
    const data = await response.json();
    return data;
  } catch (error: any) {
    return {message: error.message, code: `${error.code}`};
  }
};
