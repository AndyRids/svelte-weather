/* eslint-disable */
const fetch = require('node-fetch')

exports.handler = async function(event, context) {
  const OPEN_WEATHER_API = 'https://api.openweathermap.org/data/2.5/onecall?';
  const API_KEY = process.env.OPEN_WEATHER_KEY;

  const { lat, lon, units } = event.queryStringParameters;

  const OPEN_WEATHER_URL = `${OPEN_WEATHER_API}lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`;

  try {
    const response = await fetch(OPEN_WEATHER_URL, { headers: { Accept: 'application/json' } });

    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText };
    }

    const data = await response.json();

    return { statusCode: 200, body: JSON.stringify(data) };

  } catch (err) {
    // output to netlify function log
    console.log(err)
    // Could be a custom message or object i.e. JSON.stringify(err)
    return { statusCode: 500, body: JSON.stringify({ msg: err.message }) };
  }
}
