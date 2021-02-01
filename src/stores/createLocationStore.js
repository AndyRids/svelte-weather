// Creates the coordinate store
import { writable } from 'svelte/store';

import { geolocationNav, geocode } from '../api/geolocation';

/**
 * takes a promise as an argument and resolves it whether or not
 * it was successful. If successful, returns [data, undefined]
 * (data, error), if not, then it resolves the promise with
 * [undefined, error] (data, error).
 *
 * @param {Promise} promise - function that returns a promise
 *
 */
function handler(promise) {
  return promise
    .then((data) => ([data, undefined]))
    .catch((error) => Promise.resolve([undefined, error]));
}

export default function createLocationStore() {
  // initial store state
  const initialState = {
    // coordinates
    coords:
    {
      lattitude: '51.5073219',
      longitude: '-0.1276474',
    },
    shortLabel: 'London, GB',
    longLabel: 'London, Greater London, England',
  };

  const { subscribe, set } = writable(initialState);

  /**
   * Uses the Navigator API to get the users current coordinates
   * if the user allows the browser to use their current location.
   * If successful, the users coordinates are the set into the
   * userCoordinate store.
   */
  const tryCurrentLocation = async (longLabel) => {
    // use Navigator API
    let [locationInfo, error] = await handler(geolocationNav());
    // if error getting current location
    if (error) return Promise.reject(error);

    // use reverse geocode API
    [locationInfo, error] = await handler(geocode.reverseGeocode(locationInfo));

    // if reverseGeocode error
    if (error) return Promise.reject(error);

    // if coords have not changed, don't fetch weather
    if (JSON.stringify(longLabel) === JSON.stringify(locationInfo.longLabel)) return false;

    // set new location information and resolve promise
    set(locationInfo);

    // async function expects a return value
    return true;
  };

  /**
   * Uses LocationIQ API to forward geocode, based on user's input
   * in SearchBar component. Returns an array of location results
   * to be displayed to the user, for their selction.
   */
  const tryForwardGeocode = async (inputStr) => {
    const [results, error] = await handler(geocode.forwardGeocode(inputStr));

    // reject promise with error
    if (error) return Promise.reject(error);

    // results = [{ coords: { lattitude, longitude }, shortLabel, longLabel }, ...]
    return results;
  };

  /**
   * Used to set new location information into the coordinates store,
   * provided it is different to the current location information.
   * This is done after a user searches for a city and selects an
   * option from the forward geocode API results.
   */
  const setLocationInfo = (newLocation, currentLongLabel) => {
    // don't set new location value if state and draft state match
    if (currentLongLabel === newLocation.longLabel) return;

    set(newLocation);
  };

  // return store contract
  return {
    subscribe,
    tryCurrentLocation,
    tryForwardGeocode,
    setLocationInfo,
  };
}
