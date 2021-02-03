function locationIQ() {
  // format data
  const formatData = (data) => {
    // array of keys in data.address (amount of keys varies, depending on country)
    const keys = Object.keys(data.address);
    // results are different depending on country
    const city = data.address.city || data.address.state_district;
    const neighbourhood = data.address?.neighbourhood;
    const hamlet = data.address.hamlet || data.address.village || data.address.town;
    const county = data.address.county || data.address.state_district;
    const state = data.address.state || data.address.county;
    const countryCode = data.address[keys[keys.length - 1]].toUpperCase();

    // location information
    const locationInfo = {
      // coordinates
      coords:
      {
        lattitude: `${data.lat}`,
        longitude: `${data.lon}`,
      },
      // shortened display label for CurrentWthr (first index = city, last index = country code)
      shortLabel: `${data.address[keys[0]]}, ${countryCode}`,
      // full display label for SearchBarResults (city, country, state)
      longLabel: `${city || hamlet || neighbourhood}, ${county || state}, ${countryCode}`,
    };

    return locationInfo;
  };

  // forward geocode based on user input
  const forwardGeocode = async (searchStr) => {
    // API endpoint (see netlify.toml for redirect)
    const API = '/api/geocode/forward';
    // city
    const city = searchStr;

    // api & query string
    const URL = `${API}?city=${city}&type=forward`;

    const response = await fetch(URL);
    const data = await response.json();

    const seen = {};

    // dedupe LocationIQ results array, beofre formating
    const uniqueData = data.filter((item) => {
      if (Object.keys(seen).includes(item.display_name)) return false;

      seen[item.display_name] = true;

      return true;
    });

    // search results to display to user
    const searchResults = uniqueData.map((result) => formatData(result));

    // return results array to display to user for selection
    return searchResults;
  };

  const reverseGeocode = async (coords) => {
    // API endpoint (see netlify.toml for redirect)
    const API = '/api/geocode/reverse';
    // lattitude
    const lat = `${coords.lattitude}`;
    // longitude
    const lon = `${coords.longitude}`;

    // API & query string
    const URL = `${API}?lat=${lat}&lon=${lon}&type=reverse`;

    const response = await fetch(URL);
    const data = await response.json();

    return formatData(data);
  };

  return { forwardGeocode, reverseGeocode };
}

export const geocode = locationIQ();

export async function geolocationNav() {
  return new Promise((resolve, reject) => {
    // options obj for getCurrentPosition
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    // if getCurrentPosition is successful
    const geoSuccess = async (position) => {
      // resolve promise with userCoords
      resolve({ lattitude: `${position.coords.latitude}`, longitude: `${position.coords.longitude}` });
    };

    // if getCurrentPosition fails
    const geoError = (error) => reject(error);

    // obtain user's current position via Geolocation API
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, options);
  });
}
