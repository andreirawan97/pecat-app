import { COLORS } from '../constants/colors';

export function getWeatherTextColor(weather: string) {
  switch (weather) {
    case 'rain': {
      return COLORS.RAIN;
    }
    case 'sunny': {
      return COLORS.SUNNY;
    }
    case 'Berawan': {
      return COLORS.RAIN;
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
    case 'Berawan': {
      return COLORS.RAIN_TEXT;
    }
    default: {
      return 'black';
    }
  }
}
