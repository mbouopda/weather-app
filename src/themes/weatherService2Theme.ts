import {Theme} from '@/utils/types';

// src/services/weatherService2Theme.ts
export const weatherServiceTheme: Theme = {
  textColor: '#1877F2',
  backgroundColors: {
    freezing: [Number.NEGATIVE_INFINITY, 0, ['#00BFFF', '#1E90FF']],
    cold: [0, 10, ['#1E90FF', '#87CEFA']],
    cool: [10, 20, ['#87CEFA', '#00FF7F']],
    warm: [20, 30, ['#00FF7F', '#FFD700']],
    hot: [30, 40, ['#FFD700', '#FFA500']],
    veryHot: [40, Number.POSITIVE_INFINITY, ['#FFA500', '#FF4500']],
  },
};
