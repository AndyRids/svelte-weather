/* eslint-disable */
const fetch = require('node-fetch')

exports.handler = async function(event, context) {
  // LocationIQ forward geocode API endpoint
  const FORWARD_GEOCODE_API = 'https://us1.locationiq.com/v1/search.php';
  // LocationIQ reverse geocode API endpoint
  const REVERSE_GEOCODE_API = 'https://us1.locationiq.com/v1/reverse.php';

  // LocationIQ API key
  const API_KEY = process.env.LOCATION_IQ_KEY;

  /**
   * forward geocode: { city: name, type: 'forward' }
   * reverse geocode: { lat: lattitude, lon: longitude, type: 'reverse' }
   */
  const qryParams = { ...event.queryStringParameters };

  try {
    let response;

    // if type === 'forward' (forward geocode)
    if (qryParams.type === 'forward') {

      // back-end user input validation regex
      const cityPattern = /^[a-zA-Z]*$/;

      // if validation fails, return error
      if (!cityPattern.test(qryParams.city)) 
        return { statusCode: 500, body: JSON.stringify({ msg: 'Invalid query' }) };

      // LocationIQ forward geocode URL
      const FORWARD_GEOCODE_URL = `${FORWARD_GEOCODE_API}?key=${API_KEY}&city=${qryParams.city}&dedupe=1&addressdetails=1&normalizeaddress=1&normalizecity=1&format=json`;

      // forward geocode API request
      response = await fetch(FORWARD_GEOCODE_URL, { headers: { Accept: 'application/json' } });

      // if type === 'reverse' (reverse geocode)
    } else if (qryParams.type === 'reverse') {
      // back-end latitude validation regex
      const latitudePattern = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/;

      // back-end longitude validation regex
      const longitudePattern = /^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;

      if (!latitudePattern.test(qryParams.lat) || !longitudePattern.test(qryParams.lon))
        return { statusCode: 500, body: JSON.stringify({ msg: 'Invalid query' }) };

      // LocationIQ reverse geocode URL
      const REVERSE_GEOCODE_URL = `${REVERSE_GEOCODE_API}?key=${API_KEY}&lat=${qryParams.lat}&lon=${qryParams.lon}&zoom=10&format=json`;

      // reverse geocode API request
      response = await fetch(REVERSE_GEOCODE_URL, { headers: { Accept: 'application/json' } });
      
    }
    
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
