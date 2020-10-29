import { COLORS } from '../constants/colors';
import { Weather } from '../types/bmkg';

export default function getWeatherColor(weather: Weather) {
  switch (weather) {
    case 'Cerah': {
      return COLORS.SUNNY;
    }
    case 'Cerah Berawan': {
      return COLORS.SUNNY;
    }
    case 'Berawan': {
      return COLORS.SUNNY;
    }
    case 'Berawan Tebal': {
      return COLORS.SUNNY;
    }
    case 'Hujan Lokal': {
      return COLORS.RAIN;
    }
    case 'Hujan Ringan': {
      return COLORS.RAIN;
    }
    case 'Hujan Sedang': {
      return COLORS.RAIN;
    }
    case 'Hujan Lebat': {
      return COLORS.RAIN;
    }
    case 'Hujan Badai': {
      return COLORS.RAIN;
    }
    default: {
      return COLORS.PRIMARY;
    }
  }
}
