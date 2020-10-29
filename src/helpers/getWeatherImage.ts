import { CerahImage, RainImage } from '../../assets';
import { Weather } from '../types/bmkg';

export default function getWeatherImage(weatherCondition: Weather) {
  switch (weatherCondition) {
    case 'Cerah': {
      return CerahImage;
    }
    case 'Cerah Berawan': {
      return CerahImage;
    }
    case 'Berawan': {
      return CerahImage;
    }
    case 'Berawan Tebal': {
      return RainImage;
    }
    case 'Hujan Lokal': {
      return RainImage;
    }
    case 'Hujan Ringan': {
      return RainImage;
    }
    case 'Hujan Sedang': {
      return RainImage;
    }
    case 'Hujan Lebat': {
      return RainImage;
    }
    case 'Hujan Badai': {
      return RainImage;
    }
    default: {
      return RainImage;
    }
  }
}
