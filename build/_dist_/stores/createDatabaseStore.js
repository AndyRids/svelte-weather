/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
import { writable, derived } from '../../web_modules/svelte/store.js';

import WorkerWrapper from '../helpers/WorkerWrapper.js';

export default function createDatabaseStore() {
  // indexeddb user settings object store
  const settingsObjectStore = {
    name: 'settings',
    options:
    {
      keyPath: 'setting',
    },
    index: null,
    // initial data for the IDBObjectStore
    items:
    [
      { setting: 'isGeolocation', value: false },
      { setting: 'units', value: 'metric' },
    ],
  };

  // indexedDB location object store
  const locationObjectStore = {
    name: 'location',
    options:
    {
      autoIncrement: true,
    },
    index:
    {
      name: 'label',
      keyPath: 'longLabel',
      options:
      {
        unique: true,
      },
    },
    // no initial data for this IDBObjectStore
    items: null,
  };

  // indexedDB weather object store
  const weatherObjectStore = {
    name: 'weather',
    options:
    {
      autoIncrement: true,
    },
    index: null,
    // no initial data for this IDBObjectStore
    item: null,
  };

  // database schema for creating / updating the indexedDB
  const initialSchema = {
    // initial database schema for a new database or version
    dbName: 'svelte-weather',
    dbVersion: 1,
    objectStores: [locationObjectStore, weatherObjectStore, settingsObjectStore],
  };

  // default user settings for writable settings store
  const initialSettings = [
    { setting: 'isGeolocation', value: false },
    { setting: 'units', value: 'metric' },
  ];

  // initial status of the indexedDB before it is opened / created
  const initialStatus = {
    isNew: null,
    isUpgrade: null,
    isConnected: null,
    isRetrieved: null,
  };

  // initial saved locations before retieved from indexedDB
  const initialBookmarks = [];

  let updateFlags = { statusUpdate: false, settingsUpdate: false, bookmarksUpdate: false };

  // writable database status store
  const status = writable(initialStatus);
  // writable user settings store
  const settings = writable(initialSettings);
  // writable user bookmarked locations store
  const bookmarks = writable(initialBookmarks);

  // create new database worker
  const worker = new WorkerWrapper('./workerDB.js');

  worker.workerAction({ action: 'init', data: initialSchema })
    .then((response) => {
      const { status: dbStatus, settings: dbSettings, bookmarks: dbBookmarks } = response;

      // set the status writable store
      status.set(dbStatus);

      // database new & upgrade flags
      const { isNew, isUpgrade } = dbStatus;

      // if isNew, dbSettings are as default and dbBookmarks is empty
      if (isNew || isUpgrade) return;

      // set the settings writable store to the retrieved settings
      settings.set(dbSettings);

      // set the bookmarks writable store to the retrieved settings
      bookmarks.set(dbBookmarks);
    });

  // create a derived store from status, settings and bookmarks stores
  const { subscribe } = derived([status, settings, bookmarks], ([$status, $settings, $bookmarks]) => {
    // console.log('Derived:', $status, $settings, $bookmarks);

    // map settings store from e.g. - { setting: 'isGeolocation', value: false } to [{ [setting]: value }] and reduce to one object
    const newSettings = $settings.map(({ setting, value }) => ({ [setting]: value })).reduce((acc, item) => ({ ...acc, ...item }));

    // return status, mapped & reduced settings & bookmarks stores in one object
    return ({ status: $status, settings: newSettings, bookmarks: $bookmarks });
    // default value is null
  }, null);

  /**
   * @abstract used to modify an individual setting, using the worker to 'put' the item
   * into the database. The indexedDB settings IDBObjectStore has the keypath 'settings' and
   * each modified settings object can be placed into the ObjectStore without a key. Once the
   * new setting object is writted to the database, all settings are retrieved as an array and
   * the settings svelte store value is set to this array.
   *
   * @param {Object} item - setting object to modify - { setting: 'units', value: 'metric' }
   */
  const modifySetting = (item) => {
    worker.workerAction({ action: 'put', data: { name: 'settings', item } })
      // get updated settings
      .then(() => {
        worker.workerAction({ action: 'get', data: { name: 'settings', key: null } })
        // set updated settings into the settings store
          .then((updatedSettings) => settings.set(updatedSettings));
      })
      .catch((error) => console.log(`Settings error: ${error}`));
  };

  /**
   * @abstract used to bookmark a location by adding it to the indexedDB location
   * IDBObjectStore. Once added, all bookmarks are retrieved from the database as
   * an array and the bookmarks writable store value is set to this array.
   *
   * @param {Object} item - item is the location store's value ($locationStore)
   */
  const addBookmark = (item) => {
    worker.workerAction({ action: 'add', data: { name: 'location', item } })
      .then(() => {
        worker.workerAction({ action: 'get', data: { name: 'location', key: null } })
          .then((updatedBookmarks) => bookmarks.set(updatedBookmarks));
      })
      .catch((error) => console.log(`Add error: ${error}`));
  };

  /**
   * @abstract used to remove a bookmarked location from the indexedDB location
   * IDBObjectStore. This ObjectStore is indexed by longLabel, which is passed
   * to the function as itemIndex. Once removed, all bookmarks are retrieved
   * from the database as an array and the bookmarks writable store value is
   * set to this array.
   *
   * @param {String} itemIndex - value of location store longLabel property
   */
  const removeBookmark = (itemIndex) => {
    // set update flag for bookmarks
    updateFlags = { ...updateFlags, bookmarksUpdate: true };

    worker.workerAction({ action: 'del', data: { name: 'location', key: null, indexName: 'label', itemIndex } })
      .then(() => {
        worker.workerAction({ action: 'get', data: { name: 'location', key: null } })
          .then((updatedBookmarks) => bookmarks.set(updatedBookmarks));
      })
      .catch((error) => console.log(`Delete error: ${error}`));
  };

  // worker, subscribe method for derived store, modifySetting, addBookmark & removeBookmark methods
  return { worker, subscribe, modifySetting, addBookmark, removeBookmark };
}
