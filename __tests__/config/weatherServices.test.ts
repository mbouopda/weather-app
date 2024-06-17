// __tests__/weatherServices.test.ts

import weatherServices from '@/config/weatherServices';

// Mock imports for dynamic modules
jest.mock('@/services/weatherService1', () => ({
  getWeatherService: jest.fn(() =>
    Promise.resolve({location: 'Paris', temperature: 25}),
  ),
}));


jest.mock('@/themes/weatherService1Theme', () => ({
  weatherServiceTheme: {
    backgroundColor: '#f0f8ff',
  },
}));

jest.mock(
  '@/utils/data-transformers/weatherService1DataToServiceTransform',
  () => ({
    weatherServiceDataToServiceTransform: jest.fn(data => ({
      ...data,
      transformed: true,
    })),
  }),
);

jest.mock('@/themes/weatherService2Theme', () => ({
    weatherServiceTheme: {
      backgroundColor: '#f0f8ff',
    },
  }));
  
  jest.mock('@/services/weatherService2', () => ({
    getWeatherService: jest.fn(() =>
      Promise.resolve({location: 'New York', temperature: 25}),
    ),
  }));
  jest.mock(
    '@/utils/data-transformers/weatherService2DataToServiceTransform',
    () => ({
      weatherServiceDataToServiceTransform: jest.fn(data => ({
        ...data,
        transformed: true,
      })),
    }),
  );

describe('weatherServices', () => {
  it('should fetch weather from service1 correctly', async () => {
    const serviceConfig = weatherServices.service1;
    const weatherServiceModule = await serviceConfig.module();
    const weather = await weatherServiceModule.getWeatherService('Paris');
    expect(weather).toEqual({location: 'Paris', temperature: 25});

    const theme = await serviceConfig.theme();
    expect(theme).toEqual({backgroundColor: '#f0f8ff'});

    const transformedData = await serviceConfig.transform({someData: 'value'});
    expect(transformedData).toEqual({someData: 'value', transformed: true});
  });

  it('should fetch weather from service2 correctly', async () => {
    const serviceConfig = weatherServices.service2;
    const weatherServiceModule = await serviceConfig.module();
    const weather = await weatherServiceModule.getWeatherService('New York');
    expect(weather.location).toEqual('New York'); // Adjust based on your mock implementation

    const theme = await serviceConfig.theme();
    expect(theme).toEqual({backgroundColor: '#f0f8ff'}); // Adjust based on your mock implementation

    const transformedData = await serviceConfig.transform({otherData: 'value'});
    expect(transformedData).toEqual({otherData: 'value', transformed: true}); // Adjust based on your mock implementation
  });
});
