import createErrorStore from './createErrorStore.js';
import createLocationStore from './createLocationStore.js';
import createWeatherStore from './createWeatherStore.js';
import createDatabaseStore from './createDatabaseStore.js';
import createNetworkStatusStore from './createNetworkStatusStore.js';

// create a store for user errors
export const errorStore = createErrorStore();

// create a database status store
export const databaseStore = createDatabaseStore();

// create a store for location information
export const locationStore = createLocationStore();

// create a store for weather data
export const weatherStore = createWeatherStore();

// create a web worker store
export const networkStatus = createNetworkStatusStore();
