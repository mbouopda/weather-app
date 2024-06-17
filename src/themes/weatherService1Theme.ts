import {Theme} from '@/utils/types';

// src/services/weatherService1Theme.ts
export const weatherServiceTheme: Theme = {
  textColor: 'white',
  backgroundColors: {
    freezing: [Number.NEGATIVE_INFINITY, 0, ['#1E90FF', '#4682B4']],
    cold: [0, 10, ['#4682B4', '#87CEEB']],
    cool: [10, 20, ['#87CEEB', '#32CD32']],
    warm: [20, 30, ['#32CD32', '#FFD700']],
    hot: [30, 40, ['#FFD700', '#FF8C00']],
    veryHot: [40, Number.POSITIVE_INFINITY, ['#FF8C00', '#DC143C']],
  },
};
