import createErrorStore from './createErrorStore';
import createLocationStore from './createLocationStore';
import createWeatherStore from './createWeatherStore';
import createDatabaseStore from './createDatabaseStore';
import createNetworkStatusStore from './createNetworkStatusStore';

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
