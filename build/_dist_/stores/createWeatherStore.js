import { writable } from '../../web_modules/svelte/store.js';

import getWeatherData from '../api/getWeatherData.js';

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

export default function createWeatherStore() {
  const initialState = {
    current: {},
    hourly: [],
    daily: {},
  };

  const { subscribe, set } = writable(initialState);

  const fetchWeatherData = async (coordinates, units) => {
    // use promise handler
    const [data, error] = await handler(getWeatherData(coordinates, units));

    // if getWeatherData resolved with an error
    if (error) throw error;

    // set weather data into the store
    set(data);

    return true;
  };

  const setWeatherData = (data) => {
    // set weather data into the store
    set(data);
  };

  return { subscribe, fetchWeatherData, setWeatherData };
}
