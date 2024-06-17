// src/services/weatherService1.ts
export const getWeatherService = async (location: string) => {
  try {
    const response = await fetch(
      `${process.env.SERVICE1_URL}/forecast.json?q=${location}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key': `${process.env.RAPID_API_KEY}`,
          'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
        },
      },
    );
    const data = await response.json();
    return data
  } catch (error: any) {
    return {message: error.message, code: `${error.code}`};
  }
};
