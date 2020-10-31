export type Weather =
  | 'Cerah'
  | 'Cerah Berawan'
  | 'Berawan'
  | 'Berawan Tebal'
  | 'Asap'
  | 'Kabut'
  | 'Hujan Ringan'
  | 'Hujan Sedang'
  | 'Hujan Lebat'
  | 'Hujan Lokal'
  | 'Hujan Badai';

export type WeatherInfo = {
  valid_from: string;
  valid_to: string;
  time_desc: string;
  weather: Weather;
  weather_desc: string;
  warning_desc: string;
  station_remark: string;
  wave_cat: string;
  wave_desc: string;
  wind_from: string;
  wind_to: string;
  wind_speed_min: number;
  wind_speed_max: number;
};

export type BMKGResponse = {
  code: string;
  name: string;
  issued: string;
  data: Array<WeatherInfo>;
};
