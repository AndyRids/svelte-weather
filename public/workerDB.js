/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable no-restricted-globals */

// IDBDatabase interface
let database;

function getObjectStore(name, mode = null) {
  const transaction = mode ? database.transaction(name, mode) : database.transaction(name);

  const objectStore = transaction.objectStore(name);

  return objectStore;
}

function getIndexKey(objectStore, indexName, itemIndex) {
  return new Promise((resolve, reject) => {
    const index = objectStore.index(indexName);

    const request = index.getKey(itemIndex);

    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (error) => reject(error);
  });
}

/**
 * Adds data to a designated objectStore and returns a Promise.
 * Is also used to set initial data into IDBObjectStores after
 * an onupgradeneeded event, if they require it.
 *
 * @param {Object} content - { store: 'storeName', data: {} }
 * @returns {Promise}
 */
function add(content) {
  const { name, item } = content;

  return new Promise((resolve, reject) => {
    const objectStore = getObjectStore(name, 'readwrite');

    const request = objectStore.add(item);

    request.onsuccess = () => resolve({ name, item });
    request.onerror = (error) => reject(error);
  });
}

function put(content) {
  const { name, key, item } = content;

  return new Promise((resolve, reject) => {
    const objectStore = getObjectStore(name, 'readwrite');

    // const transaction = database.transaction(name, 'readwrite');
    // const objectStore = transaction.objectStore(name);

    const request = key ? objectStore.put(item, key) : objectStore.put(item);

    request.onerror = (error) => reject(error);
    request.onsuccess = () => resolve({ item });
  });
}

function get(content) {
  const { name, key } = content;

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(name);
    const objectStore = transaction.objectStore(name);

    const request = key ? objectStore.get(key) : objectStore.getAll();

    request.onsuccess = ({ target: { result } }) => resolve(result);
    request.onerror = (error) => reject(error);
  });
}

function del(content) {
  // ObjectStore name, item key, name of index & item's index
  const { name, key, indexName, itemIndex } = content;

  return new Promise((resolve, reject) => {
    // open the ObjectStore in readwrite mode
    const objectStore = getObjectStore(name, 'readwrite');

    // if specific key is passed as an argument
    if (key) {
      // delete item using the key
      const request = objectStore.delete(key);

      request.onsuccess = () => resolve({ key, name });
      request.onerror = (error) => reject(error);

      // get the key based on item's index
    } else {
      // get item key based on it's index (IDBIndex.getKey())
      getIndexKey(objectStore, indexName, itemIndex)
        // delete item with returned key
        .then((indexKey) => {
          const request = objectStore.delete(indexKey);

          request.onsuccess = () => resolve({ indexKey, name, itemIndex });
          request.onerror = (error) => reject(error);
        });
    }
  });
}

function init(content) {
  return new Promise((resolve, reject) => {
    // database name and version and WorkerWrapper message id
    const { dbName, dbVersion, objectStores } = content;

    // create an open request
    const openRequest = indexedDB.open(dbName, dbVersion);

    // database status changed during onupgradeneeded event
    const status = { isNew: false, isUpgrade: false, isConnected: false, isRetrieved: false };

    // cache for objectStores that need initial data after creation
    let initiaDataCache = [];

    // onerror handler
    openRequest.onerror = (error) => reject(error);

    // onblocked handler
    openRequest.onblocked = () => {};

    // onupgradeneeded handler
    openRequest.onupgradeneeded = (upgradeEvent) => {
      /**
       * Creates an index on a given object store. Used to modify a database
       * during initial creation or when upgrading to a new version schema.
       *
       * @param {IDBObjectStore} objectStore - object store to create an index on
       * @param {String} indexName - name of the index to be created
       * @param {String} keyPath - path to the object value to be indexed
       * @param {Object} options - options object (unique, multiEntry, locale)
       */
      const storeCreateIndex = (objectStore, indexName, keyPath, options) => {
        if (!objectStore.indexNames.contains(indexName)) {
          objectStore.createIndex(indexName, keyPath, options);
        }
      };

      // existing database version
      const { oldVersion } = upgradeEvent;

      // version 0 means no prior database
      if (oldVersion === 0) {
        // is a new database
        status.isNew = true;

        // store the IDBDatabase interface
        database = openRequest.result;

        // create each IDBObjectStore defined in content
        objectStores.forEach((store) => {
          // eslint-disable-next-line object-curly-newline
          const { name, options, index, items } = store;

          const objectStore = database.createObjectStore(name, options);

          // if the objectStore requires an index
          if (index !== null) {
            // create index on the location IDBObjectStore
            storeCreateIndex(objectStore, index.name, index.keyPath, index.options);
          }

          // if there is initial data for the objectStore
          if (Array.isArray(items)) {
            initiaDataCache = items.map((item) => ({ name, item }));
          }
        });
      }
    };

    // onsuccess handler
    openRequest.onsuccess = (openEvent) => {
      const { target: { result: initialResult } } = openEvent;
      // isNew or isUpgrade are true after onupgradeneeded event
      const { isNew, isUpgrade } = status;

      const getPersistedData = async () => {
        // retrieve persisted settings
        const settings = await get({ name: 'settings', key: null });

        // retrieve persisted bookmarked locations
        const bookmarks = await get({ name: 'location', key: null });

        status.isRetrieved = true;

        return { settings, bookmarks };
      };

      // can't add data with IDBInterface from onupgradeneeded event
      if (isNew || isUpgrade) {
        // close IDBDatabase interface
        initialResult.close();

        const newOpenRequest = indexedDB.open(dbName, dbVersion);

        newOpenRequest.onsuccess = (newOpenEvent) => {
          // new database open request result
          const { target: { result: newResult } } = newOpenEvent;

          // set flag isConnected to true
          status.isConnected = true;

          // store the IDBDatabase interface from the new open request onsuccess event
          database = newResult;

          Promise.all(initiaDataCache.map((data) => add(data)))
            .then(() => {
              getPersistedData()
                .then((response) => resolve({ status, ...response }));
            })
            .catch((error) => reject(error));
        };
        // if database is not new / upgraded
      } else {
        status.isConnected = true;
        // store the IDBDatabase interface from initial onsuccess event
        database = initialResult;

        // onversionchange handler
        database.onversionchange = () => database.close();

        getPersistedData()
          .then((response) => resolve({ status, ...response }))
          .catch((error) => reject(error));
      }
    };
  });
}

/**
 * Object with methods that are used to get the web worker
 * to carry out specific actions.
 *
 * onmessage event.data.action = 'init' || 'add' || 'put' etc.
 *
 * 'init' tells the worker to initialise the database through
 * calling the init function.
 *
 * 'add' tells the worker to add an item to a database store
 * through calling the add function.
 *
 * 'put' tells the worker to update data in a database store
 * through calling the put function.
 *
 * 'get' tells the worker to retrieve data from a database store
 * though calling the get function
 */
const workerActions = {
  init: (data) => init(data),
  add: (data) => add(data),
  put: (data) => put(data),
  get: (data) => get(data),
  del: (data) => del(data),
};

/**
 * onmessage handler, which receives postMessage objects:
 *
 * @param {Object} event - event.data contains the object posted
 */
self.onmessage = (event) => {
  // store WorkerWrapper msgID, content worker action and data
  const { msgID, action, data } = event.data;

  // e.g. workerActions.init(data)
  workerActions[action](data)
    .then((content) => self.postMessage({ msgID, error: null, content }))
    .catch((error) => self.postMessage({ msgID, error: error.message, content: null }));
};
