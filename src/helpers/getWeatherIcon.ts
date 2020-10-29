import { BadaiIcon, BerawanIcon, CerahIcon, HujanIcon } from '../../assets';
import { Weather } from '../types/bmkg';

export default function getWeatherIcon(weatherCondition: Weather) {
  switch (weatherCondition) {
    case 'Cerah': {
      return CerahIcon;
    }
    case 'Cerah Berawan': {
      return BerawanIcon;
    }
    case 'Berawan': {
      return BerawanIcon;
    }
    case 'Berawan Tebal': {
      return BerawanIcon;
    }
    case 'Hujan Lokal': {
      return HujanIcon;
    }
    case 'Hujan Ringan': {
      return HujanIcon;
    }
    case 'Hujan Sedang': {
      return HujanIcon;
    }
    case 'Hujan Lebat': {
      return HujanIcon;
    }
    case 'Hujan Badai': {
      return BadaiIcon;
    }
    default: {
      return CerahIcon;
    }
  }
}
