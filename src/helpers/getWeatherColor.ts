import { COLORS } from '../constants/colors';

export function getWeatherTextColor(weather: string) {
  switch (weather) {
    case 'rain': {
      return COLORS.RAIN;
    }
    case 'sunny': {
      return COLORS.SUNNY;
    }
    default: {
      return 'black';
    }
  }
}

export function getWeatherCelciusColor(weather: string) {
  switch (weather) {
    case 'rain': {
      return COLORS.RAIN_TEXT;
    }
    case 'sunny': {
      return COLORS.SUNNY_TEXT;
    }
    default: {
      return 'black';
    }
  }
}
