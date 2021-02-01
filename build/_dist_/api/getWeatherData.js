/**
 * https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={key}
 *
 * @param {Array} coords - { lattitude: 23.3333, longitude: 33.11 }
 *
 * @description: Fetches an OpenWeatherMap API response based on
 * given coordinates and then formats the data, ready to be set
 * in the weatherData store.
 */
export default async function getWeatherData(coords, units) {
  // API endpoint (see netlify.toml for redirect)
  const API = '/api/weather';
  // lattitude
  const lat = coords.lattitude;
  // longitude
  const lon = coords.longitude;
  // API & query string
  const URL = `${API}?lat=${lat}&lon=${lon}&units=${units}`;

  // fetch data from OpenWeatherMap OneCall API
  const response = await fetch(URL);

  // parse JSON
  const data = await response.json();

  const formatTime = (date) => {
    let hours = date.getHours();
    const AmPm = hours >= 12 ? 'PM' : 'AM';

    hours %= 12;
    hours = hours || 12;

    return `${hours}${AmPm}`;
  };

  /**
   * @param {Object} weather - weather data returned from API
   *
   * @description: formats the weather data, ready for entry
   * into the weatherStore.
   */
  const formatData = (weather) => {
    // format hourly weather array
    const hourlyWthrArray = weather.hourly.map((hour) => ({
      unixTime: hour.dt,
      time: formatTime(new Date(hour.dt * 1000)),
      // weather description
      description: hour.weather[0].description,
      // pressure
      pressure: `${hour.pressure} m/b`,
      // visibility
      visibility: `${hour.visibility / 1000} km`,
      // temperature
      temp: `${Math.fround(hour.temp).toFixed(0)}°`,
      // feels-like temperature
      feelsLike: `${Number.parseFloat(hour.feels_like).toFixed(1)}°`,
      // UV index
      UVIndex: hour.uvi,
      // wind speed
      windSpeed: `${Number.parseFloat(hour.wind_speed).toFixed(1)} m/s`,
      // wind degress
      windDegree: `${hour.wind_deg}deg`,
      // humidity
      humidity: `${hour.humidity}%`,
      // probability of precipitation
      chanceOfRain: Number((Number(hour.pop) * 100).toFixed(0)),
      // if hour.rain || hour.snow !== undefined, then precipitation is 0
      precipitation: Number.parseFloat(((hour?.rain && hour.rain['1h']) || (hour?.snow && hour.snow['1h']))) || 0,
      // weather icon file name
      weatherIcon: hour.weather[0].icon,
    }));

    // format daily weather array
    const dailyWthrArr = weather.daily.map((day, i) => ({
      // get day from unixtime in weather.daily[i].day
      day: i ? new Date(day.dt * 1000).toLocaleString('en-US', { weekday: 'long' }) : 'Today',
      // weather description
      description: day.weather[0].description,
      // sunrise
      sunrise: new Date(day.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      // sunset
      sunset: new Date(day.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      // weather icon file name
      weatherIcon: day.weather[0].icon,
      // probability of precipitation
      rain: `${(day.pop * 100).toFixed(0)}%`,
      // max temp for the day
      maxTemp: `${Math.round(day.temp.max)}°`,
      // min temp for the day
      minTemp: `${Math.round(day.temp.min)}°`,
    }));

    const weatherData = {
      // current weather information
      current:
      {
        sunrise: new Date(weather.current.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sunset: new Date(weather.current.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      // today's hourly weather information
      hourly: hourlyWthrArray,
      // daily weather information
      daily: dailyWthrArr,
    };

    return weatherData;
  };

  // return formatted weather data
  return formatData(data);
}
